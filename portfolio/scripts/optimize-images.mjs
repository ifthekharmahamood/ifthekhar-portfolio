/**
 * Visually-lossless image optimiser for public/images.
 *
 * Generates a WebP sibling for every raster image, at the SAME pixel
 * dimensions as the original. Nothing is downscaled and the original file is
 * always kept as the <picture> fallback — see guardrails.md.
 *
 * No npm dependency: encoding runs in headless Chrome over CDP, which ships
 * its own WebP encoder. Chrome is launched here and closed on exit.
 *
 *   node scripts/optimize-images.mjs            # encode what has changed
 *   node scripts/optimize-images.mjs --force    # re-encode everything
 *
 * Quality is 0.92 (visually lossless for photographs and flat artwork). A
 * generated file is discarded if it does not beat the original on size.
 */
import { spawn } from 'node:child_process';
import { readdir, readFile, writeFile, stat, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const IMAGES = join(HERE, '..', 'public', 'images');
const QUALITY = 0.92;
const SOURCES = new Set(['.png', '.jpg', '.jpeg']);
const FORCE = process.argv.includes('--force');
const PORT = 9333;

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find(p => p && existsSync(p));

const kb = n => `${(n / 1024).toFixed(0)} KB`;

// PNG chunks worth keeping: image data and colour/rendering information.
// Everything else (C2PA content credentials, EXIF, text comments, editor
// history) is metadata the page never uses, so it is stripped — guardrails.md
// requires optimisation to remove metadata, and C2PA blocks can run to tens of
// kilobytes. Pixels are untouched; only whole non-essential chunks are dropped.
const PNG_KEEP = new Set(['IHDR', 'PLTE', 'IDAT', 'IEND', 'tRNS', 'gAMA',
  'cHRM', 'sRGB', 'iCCP', 'bKGD', 'pHYs', 'sBIT']);

function stripPngMetadata(buffer) {
  if (buffer.length < 8 || buffer.readUInt32BE(0) !== 0x89504e47) return null;
  const kept = [buffer.subarray(0, 8)];
  const dropped = [];
  let offset = 8;
  while (offset + 8 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const end = offset + 12 + length;
    if (end > buffer.length) return null;           // truncated; leave the file alone
    if (PNG_KEEP.has(type)) kept.push(buffer.subarray(offset, end));
    else dropped.push(`${type} ${kb(length)}`);
    offset = end;
    if (type === 'IEND') break;
  }
  if (!dropped.length) return null;
  return { buffer: Buffer.concat(kept), dropped };
}

async function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  const pending = new Map();
  let id = 0;
  ws.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
  };
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = () => reject(new Error('Could not open a CDP connection.'));
  });
  return {
    send: (method, params = {}) =>
      new Promise(resolve => {
        const next = ++id;
        pending.set(next, resolve);
        ws.send(JSON.stringify({ id: next, method, params }));
      }),
    close: () => ws.close(),
  };
}

async function main() {
  // CI build servers have no Chrome. Optimised WebP siblings are committed to
  // the repository, so there is nothing to encode there — skip rather than
  // fail the build. Encoding happens locally, where Chrome exists.
  if (!CHROME) {
    console.log('Chrome not available — skipping image optimisation.');
    // Warn loudly if a source image has no committed WebP sibling: it would
    // ship at full weight, and nothing here can encode it.
    if (existsSync(IMAGES)) {
      const names = await readdir(IMAGES);
      const missing = names
        .filter(n => SOURCES.has(extname(n).toLowerCase()))
        .filter(n => !existsSync(join(IMAGES, `${basename(n, extname(n))}.webp`)));
      if (missing.length) {
        console.warn(`WARNING: no WebP for ${missing.join(', ')} — run "npm run optimize:images" locally and commit the result.`);
      }
    }
    return;
  }
  if (!existsSync(IMAGES)) {
    console.log('No public/images directory yet — nothing to optimise.');
    return;
  }

  const files = (await readdir(IMAGES)).filter(name => SOURCES.has(extname(name).toLowerCase()));
  if (!files.length) {
    console.log('No images to optimise.');
    return;
  }

  // Strip metadata from every source first. This runs regardless of whether a
  // WebP needs re-encoding, so an already-optimised image cannot keep carrying
  // a C2PA block or EXIF payload.
  for (const name of files) {
    if (extname(name).toLowerCase() !== '.png') continue;
    const file = join(IMAGES, name);
    const stripped = stripPngMetadata(await readFile(file));
    if (stripped) {
      await writeFile(file, stripped.buffer);
      console.log(`${name}: stripped ${stripped.dropped.join(', ')}`);
    }
  }

  // Only encode what is missing or stale, unless --force.
  const queue = [];
  for (const name of files) {
    const source = join(IMAGES, name);
    const target = join(IMAGES, `${basename(name, extname(name))}.webp`);
    if (!FORCE && existsSync(target)) {
      const [a, b] = await Promise.all([stat(source), stat(target)]);
      if (b.mtimeMs >= a.mtimeMs) continue;
    }
    queue.push({ name, source, target });
  }
  if (!queue.length) {
    console.log(`All ${files.length} image(s) already optimised.`);
    return;
  }

  const profile = await mkdtemp(join(tmpdir(), 'img-opt-'));
  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', 'about:blank',
  ], { stdio: 'ignore' });

  let cdp;
  try {
    let version;
    for (let attempt = 0; attempt < 40; attempt++) {
      try {
        version = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json();
        break;
      } catch { await new Promise(r => setTimeout(r, 250)); }
    }
    if (!version) throw new Error('Headless Chrome did not start.');

    const target = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })).json();
    cdp = await connect(target.webSocketDebuggerUrl);
    await cdp.send('Runtime.enable');

    let saved = 0, kept = 0;
    for (const item of queue) {
      const bytes = await readFile(item.source);
      const result = await cdp.send('Runtime.evaluate', {
        returnByValue: true,
        awaitPromise: true,
        expression: `(async () => {
          const bin = Uint8Array.from(atob("${bytes.toString('base64')}"), c => c.charCodeAt(0));
          const bitmap = await createImageBitmap(new Blob([bin]));
          const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
          canvas.getContext('2d').drawImage(bitmap, 0, 0);
          const out = await canvas.convertToBlob({ type: 'image/webp', quality: ${QUALITY} });
          const buf = new Uint8Array(await out.arrayBuffer());
          let s = ''; for (const b of buf) s += String.fromCharCode(b);
          return { data: btoa(s), w: bitmap.width, h: bitmap.height };
        })()`,
      });

      const value = result.result?.result?.value;
      if (!value?.data) {
        console.log(`  ! ${item.name} — could not be encoded, left as is`);
        continue;
      }
      const webp = Buffer.from(value.data, 'base64');
      if (webp.length >= bytes.length) {
        console.log(`  = ${item.name} — original already smaller, skipped`);
        kept++;
        continue;
      }
      await writeFile(item.target, webp);
      saved += bytes.length - webp.length;
      const pct = (100 - (webp.length / bytes.length) * 100).toFixed(0);
      console.log(`  + ${item.name} ${value.w}x${value.h}  ${kb(bytes.length)} -> ${kb(webp.length)}  (-${pct}%)`);
    }
    console.log(`\nDone. ${queue.length - kept} encoded, ${kb(saved)} saved. Dimensions unchanged.`);
  } finally {
    cdp?.close();
    chrome.kill();
    await rm(profile, { recursive: true, force: true }).catch(() => {});
  }
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
