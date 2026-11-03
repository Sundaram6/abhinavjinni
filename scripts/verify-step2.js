const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // 1. Screenshot Cinematic Opening
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/?replay=1', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: '/Users/shivamsharma/.gemini/antigravity/brain/c2679bc6-74b8-4736-830d-f3c4ac91f911/screenshots/cinematic_opening_stage1.png' });
  
  // Wait 2.6s for Stage 2 (Couple rings)
  await new Promise(r => setTimeout(r, 2600));
  await page.screenshot({ path: '/Users/shivamsharma/.gemini/antigravity/brain/c2679bc6-74b8-4736-830d-f3c4ac91f911/screenshots/cinematic_opening_stage2.png' });
  
  // Wait 2.6s for Stage 3 (Invitation reveal)
  await new Promise(r => setTimeout(r, 2600));
  await page.screenshot({ path: '/Users/shivamsharma/.gemini/antigravity/brain/c2679bc6-74b8-4736-830d-f3c4ac91f911/screenshots/cinematic_opening_stage3.png' });

  // 2. Open Homepage directly with skip=1
  await page.goto('http://localhost:3000/?skip=1', { waitUntil: 'networkidle0' });
  
  // Chapter One (Hero)
  await page.screenshot({ path: '/Users/shivamsharma/.gemini/antigravity/brain/c2679bc6-74b8-4736-830d-f3c4ac91f911/screenshots/chapter1_hero_desktop.png' });
  
  // Scroll to Chapter Two (Two Souls)
  await page.evaluate(() => {
    const el = document.getElementById('two-souls');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: '/Users/shivamsharma/.gemini/antigravity/brain/c2679bc6-74b8-4736-830d-f3c4ac91f911/screenshots/chapter2_twosouls_desktop.png' });

  // Scroll to Chapter Three (The Promise)
  await page.evaluate(() => {
    const el = document.getElementById('the-promise');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: '/Users/shivamsharma/.gemini/antigravity/brain/c2679bc6-74b8-4736-830d-f3c4ac91f911/screenshots/chapter3_thepromise_desktop.png' });

  // Mobile Viewports
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/?skip=1', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: '/Users/shivamsharma/.gemini/antigravity/brain/c2679bc6-74b8-4736-830d-f3c4ac91f911/screenshots/chapter1_hero_mobile.png' });

  await page.evaluate(() => {
    const el = document.getElementById('two-souls');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: '/Users/shivamsharma/.gemini/antigravity/brain/c2679bc6-74b8-4736-830d-f3c4ac91f911/screenshots/chapter2_twosouls_mobile.png' });

  await page.evaluate(() => {
    const el = document.getElementById('the-promise');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: '/Users/shivamsharma/.gemini/antigravity/brain/c2679bc6-74b8-4736-830d-f3c4ac91f911/screenshots/chapter3_thepromise_mobile.png' });

  await browser.close();
  console.log('All screenshots captured successfully.');
})();
