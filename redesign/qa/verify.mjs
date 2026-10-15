import { chromium } from 'file:///C:/Users/munta1204/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
await fs.mkdir('redesign/qa/screenshots', { recursive:true });
const browser = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:true });
const failures = [];
const report = { errors:[], requests:[], checks:[], counters:[], dimensions:[] };
const check = async (name, run) => { try { await run(); report.checks.push({ name, passed:true }); } catch(error) { failures.push(name); report.checks.push({ name, passed:false, error:String(error) }); } };
try {
  const page = await browser.newPage({ viewport:{ width:1440, height:1000 } });
  page.on('pageerror', error => report.errors.push(String(error)));
  page.on('response', response => { if(response.status()>=400) report.requests.push({ url:response.url(),status:response.status() }); });
  await page.goto('http://127.0.0.1:5273/', { waitUntil:'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1300);
  await page.screenshot({ path:'redesign/qa/screenshots/desktop-hero.png' });
  await check('One visible identity heading', async () => assert.equal(await page.locator('h1').textContent(), 'Ifthekhar EnadMahamood'));
  const before = await page.locator('[data-counter]').allTextContents();
  await page.locator('#impact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(120);
  const intermediate = await page.locator('[data-counter]').allTextContents();
  await page.waitForTimeout(1800);
  const final = await page.locator('[data-counter]').allTextContents();
  report.counters.push({ before, intermediate, final });
  await check('Counters visibly advance and finish at the correct values', async () => { assert.deepEqual(final,['5','21','40']); assert.ok(intermediate.some((value,index) => value !== final[index]),'No intermediate counter value observed'); });
  await page.screenshot({ path:'redesign/qa/screenshots/desktop-impact.png' });
  await page.getByRole('button',{ name:'Explore the case study' }).first().click();
  await check('Case study opens', async () => assert.equal(await page.locator('.case-dialog').evaluate(node => node.open),true));
  await page.screenshot({ path:'redesign/qa/screenshots/desktop-case-study.png' });
  await page.keyboard.press('Escape');
  await check('Escape closes dialog and returns focus to its opener', async () => {
    assert.equal(await page.locator('.case-dialog').evaluate(node => node.open),false);
    assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim()),'Explore the case study');
  });
  await check('Email and LinkedIn use current resume details', async () => { assert.equal(await page.locator('.contact-actions a').first().getAttribute('href'),'mailto:enadmahamood123@gmail.com'); assert.equal(await page.getByRole('link',{name:'LinkedIn',exact:true}).getAttribute('href'),'https://www.linkedin.com/in/ifthekhar-pm'); });
  await page.getByRole('button',{name:'Resume',exact:true}).click();
  await check('Resume opens with the complete master resume',async()=>{
    assert.equal(await page.locator('.resume-dialog').evaluate(node=>node.open),true);
    assert.equal(await page.locator('.resume-sheet h4').count(),8);
    const text=await page.locator('.resume-sheet').innerText();
    for(const value of ['3.88','3.43','Exploring Planning Processes in SAP IBP','Janie and Mark Steinhagen','Claude Code','Customer Purchase Behavior Analysis'])assert.ok(text.includes(value),value);
  });
  await page.screenshot({path:'redesign/qa/screenshots/resume-popup.png'});
  await page.keyboard.press('Escape');
  await check('Resume closes and returns focus',async()=>{assert.equal(await page.locator('.resume-dialog').evaluate(node=>node.open),false);assert.equal(await page.locator('.resume-link').evaluate(node=>node===document.activeElement),true);});
  await check('New sections and navigation are complete',async()=>{
    for(const id of ['projects','experience','education','certifications','awards','hobbies','contact']){assert.equal(await page.locator(`#${id}`).count(),1);assert.equal(await page.locator(`.desktop-links a[href="#${id}"]`).count(),1);}
    assert.equal(await page.locator('.project-card').count(),6);assert.equal(await page.locator('.education-card').count(),2);assert.equal(await page.locator('.certification-list article').count(),2);assert.equal(await page.locator('.award-grid article').count(),3);assert.equal(await page.locator('.hobby-item').count(),6);
  });
  await page.getByRole('link',{name:'Jump to Education',exact:true}).click();await page.waitForTimeout(1100);
  await check('Chapter navigation traverses and highlights Education',async()=>{assert.equal(new URL(page.url()).hash,'#education');assert.equal(await page.locator('.chapter-rail a[href="#education"]').getAttribute('aria-current'),'location');});
  await check('Section backgrounds use only sage and cream',async()=>{
    const colors=await page.locator('#projects,#more-projects,#experience,#education,#certifications,#awards,#hobbies,#contact').evaluateAll(nodes=>nodes.map(node=>getComputedStyle(node).backgroundColor));
    for(const color of colors)assert.ok(['rgb(234, 240, 232)','rgb(247, 241, 230)'].includes(color),color);
  });
  await page.locator('.project-card').filter({has:page.getByRole('heading',{name:'Personal Finance Web App',exact:true})}).getByRole('button').click();
  await check('Independent project detail preserves in-progress status',async()=>{assert.equal(await page.locator('.case-dialog').evaluate(node=>node.open),true);assert.ok((await page.locator('.case-dialog').innerText()).includes('in progress'));});
  await page.keyboard.press('Escape');
  await check('Current resume download is available', async () => { const href='/Ifthekhar_Enad_Mahamood_Resume.docx'; const response=await page.request.get(`http://127.0.0.1:5273${href}`); assert.equal(response.status(),200); assert.ok((await response.body()).length>10000); });
  for(const width of [1440,1024,768,390,375]) {
    await page.setViewportSize({width,height:900}); await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'})); await page.waitForTimeout(350);
    const dimensions=await page.evaluate(() => ({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,images:[...document.images].map(img=>({src:img.getAttribute('src'),loaded:img.complete&&img.naturalWidth>0}))}));
    report.dimensions.push(dimensions);
    await check(`No horizontal overflow at ${width}px`,async()=>assert.ok(dimensions.scrollWidth<=width,`${dimensions.scrollWidth}px exceeds ${width}px`));
    if(width===390) {
      await page.screenshot({path:'redesign/qa/screenshots/mobile-hero.png'});
      await page.getByRole('button',{name:'Open navigation'}).click();
      await check('Mobile navigation opens and follows Projects',async()=>{assert.equal(await page.locator('#mobile-navigation').isVisible(),true);await page.locator('#mobile-navigation').getByRole('link',{name:'Projects',exact:true}).click();await page.waitForTimeout(900);assert.equal(await page.locator('#mobile-navigation').count(),0);assert.equal(new URL(page.url()).hash,'#projects');});
      await page.screenshot({path:'redesign/qa/screenshots/mobile-work.png'});
      await page.getByRole('button',{name:'Resume',exact:true}).click();await page.screenshot({path:'redesign/qa/screenshots/mobile-resume.png'});await page.keyboard.press('Escape');
    }
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:1440,height:1000});
  await page.reload({waitUntil:'networkidle'});
  await check('Reduced-motion counters render final values immediately',async()=>assert.deepEqual(await page.locator('[data-counter]').allTextContents(),['5','21','40']));
  await check('Reduced-motion content is visible without scrolling',async()=>{
    const hidden=await page.locator('[data-intro],[data-reveal]').evaluateAll(nodes=>nodes.filter(node=>getComputedStyle(node).opacity==='0').length);assert.equal(hidden,0);
  });
  for(const section of ['#impact','#projects','#more-projects','#experience','#education','#certifications','#awards','#hobbies','#contact']) {await page.locator(section).scrollIntoViewIfNeeded();await page.waitForTimeout(100);}
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  await page.screenshot({path:'redesign/qa/screenshots/desktop-full-reduced-motion.png',fullPage:true});
  for(const id of ['more-projects','education','certifications','awards','hobbies']){await page.locator(`#${id}`).scrollIntoViewIfNeeded();await page.screenshot({path:`redesign/qa/screenshots/${id}.png`});}
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  await page.setViewportSize({width:1440,height:1800});
  await page.screenshot({path:'redesign/qa/screenshots/desktop-comparison.png'});
  await check('No runtime errors',async()=>assert.deepEqual(report.errors,[]));
  await check('No failed site asset requests',async()=>assert.deepEqual(report.requests.filter(item=>item.url.startsWith('http://127.0.0.1:5273')),[]));
  await fs.writeFile('redesign/qa/results.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  if(failures.length) process.exitCode=1;
} finally { await browser.close(); }
