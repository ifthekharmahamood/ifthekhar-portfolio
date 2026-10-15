import { chromium } from 'file:///C:/Users/munta1204/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const report={checks:[],errors:[],stages:[],layouts:[]};
const passed=name=>report.checks.push(name);
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 page.on('pageerror',error=>report.errors.push(String(error)));
 await page.goto('http://127.0.0.1:5273/',{waitUntil:'networkidle'});
 const journey=page.locator('.product-journey'),timer=page.locator('.journey-timer span');
 const names=['Ideation','Planning','Design','Development','Launch','Follow-up'];
 assert.equal(await journey.getAttribute('data-stage'),'0');
 for(let index=0;index<6;index++) {
   await page.waitForFunction(index=>document.querySelector('.product-journey').dataset.stage===String(index),index,{timeout:9000});
   assert.equal(await page.getByRole('button',{name:`Explore ${names[index]}`,exact:true}).getAttribute('aria-pressed'),'true');
   report.stages.push({stage:names[index],heading:await page.locator('.journey-scene h2').textContent()});
   await page.waitForTimeout(2300);
   assert.equal(await page.locator('.journey-artifact li').count(),3);
   if(index===3 || index===5) await page.screenshot({path:`redesign/qa/screenshots/journey-stage-${index+1}.png`});
 }
 await page.waitForFunction(()=>document.querySelector('.product-journey').dataset.stage==='0',null,{timeout:9000});
 passed('Autoplay visits all six stages, changes their artifacts, then loops from follow-up to ideation');
 await page.getByRole('button',{name:'Pause product journey',exact:true}).click();
 await page.waitForTimeout(100);
 const stopped=await timer.evaluate(node=>getComputedStyle(node).transform);
 await page.waitForTimeout(600);
 assert.equal(await timer.evaluate(node=>getComputedStyle(node).transform),stopped);passed('Pause freezes the active stage progress');
 await page.getByRole('button',{name:'Play product journey',exact:true}).click();await page.waitForTimeout(300);
 assert.notEqual(await timer.evaluate(node=>getComputedStyle(node).transform),stopped);passed('Play resumes the progress');
 for(const name of names) {
   await page.getByRole('button',{name:`Explore ${name}`,exact:true}).click();
   assert.equal(await journey.getAttribute('data-stage'),String(names.indexOf(name)));
   assert.equal(await journey.getAttribute('data-running'),'false');
   assert.equal(await page.locator('.journey-artifact li').last().evaluate(node=>getComputedStyle(node).opacity),'1');
 }
 passed('Each stage can be explored directly and stays paused with all content visible');
 await page.getByRole('button',{name:'Play product journey',exact:true}).click();
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});
 await page.waitForTimeout(100);assert.equal(await journey.getAttribute('data-running'),'false');
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>false});document.dispatchEvent(new Event('visibilitychange'));});
 await page.waitForTimeout(100);assert.equal(await journey.getAttribute('data-running'),'true');passed('Autoplay stops when the document is hidden and resumes when visible');
 for(const width of [1920,1440,1280,1100,1024,834,800,768,390,375]) {
   await page.setViewportSize({width,height:1000});await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(100);
   const layout=await page.evaluate(()=>{
     const journey=document.querySelector('.product-journey').getBoundingClientRect();
     const copies=[...document.querySelectorAll('.hero-content>h1,.hero-lead,.hero-description,.hero-actions,.hero .location')].map(node=>node.getBoundingClientRect());
     return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overlap:copies.some(copy=>copy.left<journey.right&&copy.right>journey.left&&copy.top<journey.bottom&&copy.bottom>journey.top),bottom:journey.bottom,heroBottom:document.querySelector('.hero').getBoundingClientRect().bottom};
   });
   report.layouts.push(layout);assert.ok(layout.scrollWidth<=width,`Overflow at ${width}`);assert.equal(layout.overlap,false,`Hero overlap at ${width}`);assert.ok(layout.heroBottom>layout.bottom+40,`Journey escapes hero at ${width}`);
   if(width===1024)await page.screenshot({path:'redesign/qa/screenshots/journey-tablet.png'});
 }
 passed('Hero copy and animation remain separate without overflow across 10 viewport widths');
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.product-journey').scrollIntoViewIfNeeded();
 assert.equal(await page.getByRole('button',{name:'Pause product journey',exact:true}).count(),0);
 assert.equal(await timer.evaluate(node=>getComputedStyle(node.parentElement).display),'none');
 const reducedStage=await journey.getAttribute('data-stage');await page.waitForTimeout(300);assert.equal(await journey.getAttribute('data-stage'),reducedStage);
 await page.getByRole('button',{name:'Explore Planning',exact:true}).focus();await page.keyboard.press('Enter');
 assert.equal(await journey.getAttribute('data-stage'),'1');passed('Reduced motion shows static readable content and keyboard stage exploration works');
 assert.deepEqual(report.errors,[]);passed('No browser runtime errors');
 report.passed=true;
 await fs.writeFile('redesign/qa/journey-results.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
} finally {await browser.close();}
