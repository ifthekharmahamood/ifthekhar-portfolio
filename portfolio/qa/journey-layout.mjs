import { chromium } from 'file:///C:/Users/munta1204/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage();await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://127.0.0.1:5273/',{waitUntil:'networkidle'});
for(const width of [1920,1440,1280,1100,1024,834,800,768,390,375]){
 await page.setViewportSize({width,height:1000});
 console.log(await page.evaluate(()=>{const rect=n=>{const b=n.getBoundingClientRect();return {left:b.left,right:b.right,top:b.top,bottom:b.bottom}};const j=rect(document.querySelector('.product-journey'));return {width:innerWidth,journey:j,copies:[...document.querySelectorAll('.hero-content>h1,.hero-lead,.hero-description,.hero-actions,.hero .location')].map(n=>({name:n.className||n.tagName,...rect(n)}))}}));
 if(width===834)await page.screenshot({path:'portfolio/qa/screenshots/journey-small-tablet.png'});
}
await browser.close();
