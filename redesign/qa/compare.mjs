import { chromium } from 'file:///C:/Users/munta1204/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const source=(await fs.readFile('design-exploration/concepts/05-spacious-pastel-portfolio.png')).toString('base64');
const actual=(await fs.readFile('redesign/qa/screenshots/desktop-comparison.png')).toString('base64');
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try {
 const page=await browser.newPage({viewport:{width:2880,height:1850}});
 await page.setContent(`<html><head><style>body{margin:0;background:#ddd;font:20px Arial}.board{display:flex}.column{width:1440px}.label{height:40px;padding:8px 20px;box-sizing:border-box}img{display:block;width:1440px;height:auto}</style></head><body><div class="board"><div class="column"><div class="label">VISUAL TARGET</div><img id="source" src="data:image/png;base64,${source}"></div><div class="column"><div class="label">IMPLEMENTATION</div><img src="data:image/png;base64,${actual}"></div></div></body></html>`);
 await page.locator('img').evaluateAll(nodes=>Promise.all(nodes.map(node=>node.decode())));
 console.log('Source pixels',await page.locator('#source').evaluate(node=>({width:node.naturalWidth,height:node.naturalHeight})));
 await page.screenshot({path:'redesign/qa/screenshots/comparison-board.png'});
 await page.setViewportSize({width:2880,height:1000});
 await page.screenshot({path:'redesign/qa/screenshots/hero-comparison.png'});
} finally {await browser.close();}
