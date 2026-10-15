import { chromium } from 'file:///C:/Users/munta1204/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto('http://127.0.0.1:5273/',{waitUntil:'networkidle'});await page.waitForTimeout(2500);
 await page.screenshot({path:'redesign/qa/screenshots/journey-desktop.png'});
 await page.getByRole('button',{name:'Explore Launch',exact:true}).click();
 await page.screenshot({path:'redesign/qa/screenshots/journey-launch.png'});
 await page.setViewportSize({width:390,height:900});await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
 await page.screenshot({path:'redesign/qa/screenshots/journey-mobile-top.png'});
 await page.locator('.product-journey').scrollIntoViewIfNeeded();await page.screenshot({path:'redesign/qa/screenshots/journey-mobile.png'});
 console.log(await page.locator('.product-journey').boundingBox());
} finally {await browser.close();}
