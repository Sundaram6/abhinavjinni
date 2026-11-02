const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = '/Users/shivamsharma/.gemini/antigravity/brain/c2679bc6-74b8-4736-830d-f3c4ac91f911/screenshots';
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  try {
    console.log('--- 1. Testing Mobile Viewport (390 x 844) ---');
    const pageMobile = await browser.newPage();
    await pageMobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    
    // Clear session storage & visit with intro=1
    await pageMobile.goto('http://localhost:3000/?intro=1', { waitUntil: 'networkidle2' });
    console.log('Loaded on mobile');

    // Screenshot 1: Mobile at 0.5s (The Divine Beginning)
    await new Promise(r => setTimeout(r, 600));
    await pageMobile.screenshot({ path: path.join(ARTIFACT_DIR, 'cinematic_01_mobile_divine_start.png') });
    console.log('Captured cinematic_01_mobile_divine_start.png');

    // Screenshot 2: Mobile at 2.5s (The Sacred Transformation)
    await new Promise(r => setTimeout(r, 2000));
    await pageMobile.screenshot({ path: path.join(ARTIFACT_DIR, 'cinematic_02_mobile_transformation.png') });
    console.log('Captured cinematic_02_mobile_transformation.png');

    // Screenshot 3: Mobile at 4.6s (The Human Union - Both Authentic Rings Visible)
    await new Promise(r => setTimeout(r, 2100));
    await pageMobile.screenshot({ path: path.join(ARTIFACT_DIR, 'cinematic_03_mobile_authentic_rings.png') });
    console.log('Captured cinematic_03_mobile_authentic_rings.png');

    // Wait for transition to website hero
    await new Promise(r => setTimeout(r, 2000));
    await pageMobile.screenshot({ path: path.join(ARTIFACT_DIR, 'cinematic_04_mobile_hero_entered.png') });
    console.log('Captured cinematic_04_mobile_hero_entered.png');

    await pageMobile.close();

    console.log('--- 2. Testing Desktop Viewport (1440 x 900) ---');
    const pageDesktop = await browser.newPage();
    await pageDesktop.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await pageDesktop.goto('http://localhost:3000/?intro=1', { waitUntil: 'networkidle2' });

    // Desktop: Divine Beginning
    await new Promise(r => setTimeout(r, 600));
    await pageDesktop.screenshot({ path: path.join(ARTIFACT_DIR, 'cinematic_05_desktop_divine_start.png') });
    console.log('Captured cinematic_05_desktop_divine_start.png');

    // Desktop: Authentic Rings
    await new Promise(r => setTimeout(r, 4200));
    await pageDesktop.screenshot({ path: path.join(ARTIFACT_DIR, 'cinematic_06_desktop_authentic_rings.png') });
    console.log('Captured cinematic_06_desktop_authentic_rings.png');

    // Desktop: Homepage Entered
    await new Promise(r => setTimeout(r, 2200));
    await pageDesktop.screenshot({ path: path.join(ARTIFACT_DIR, 'cinematic_07_desktop_homepage.png') });
    console.log('Captured cinematic_07_desktop_homepage.png');

    // Test Replay button in Navbar
    console.log('Testing Replay Intro button in Navbar...');
    const replayBtn = await pageDesktop.$('button[title*="Replay"]');
    if (replayBtn) {
      await replayBtn.click();
      await new Promise(r => setTimeout(r, 600));
      await pageDesktop.screenshot({ path: path.join(ARTIFACT_DIR, 'cinematic_08_desktop_replayed.png') });
      console.log('Captured cinematic_08_desktop_replayed.png');
    }

    await pageDesktop.close();

    console.log('All verification screenshots captured successfully!');
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await browser.close();
  }
}

run();
