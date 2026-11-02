const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = '/Users/shivamsharma/.gemini/antigravity/brain/c2679bc6-74b8-4736-830d-f3c4ac91f911/screenshots';
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    console.log('--- 1. Testing Smooth Opening Animation (Mobile: 390x844) ---');
    const pageMobile = await browser.newPage();
    await pageMobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await pageMobile.goto('http://localhost:3000/?intro=1', { waitUntil: 'networkidle2' });

    // 0.8s: Divine Shiva-Parvati
    await new Promise(r => setTimeout(r, 800));
    await pageMobile.screenshot({ path: path.join(ARTIFACT_DIR, 'impeccable_01_mobile_divine.png') });
    console.log('Captured impeccable_01_mobile_divine.png');

    // 2.3s: Celestial Metamorphosis light bloom
    await new Promise(r => setTimeout(r, 1500));
    await pageMobile.screenshot({ path: path.join(ARTIFACT_DIR, 'impeccable_02_mobile_metamorphosis.png') });
    console.log('Captured impeccable_02_mobile_metamorphosis.png');

    // 4.0s: Authentic rings photograph with diamond glint
    await new Promise(r => setTimeout(r, 1700));
    await pageMobile.screenshot({ path: path.join(ARTIFACT_DIR, 'impeccable_03_mobile_authentic_rings.png') });
    console.log('Captured impeccable_03_mobile_authentic_rings.png');

    // 5.2s: Editorial reveal
    await new Promise(r => setTimeout(r, 1200));
    await pageMobile.screenshot({ path: path.join(ARTIFACT_DIR, 'impeccable_04_mobile_reveal.png') });
    console.log('Captured impeccable_04_mobile_reveal.png');

    // 6.8s: Transition into Homepage Hero (Cleaned of AI slop)
    await new Promise(r => setTimeout(r, 1600));
    await pageMobile.screenshot({ path: path.join(ARTIFACT_DIR, 'impeccable_05_mobile_hero_clean.png') });
    console.log('Captured impeccable_05_mobile_hero_clean.png');

    await pageMobile.close();

    console.log('--- 2. Testing Desktop Viewport (1440x900) ---');
    const pageDesktop = await browser.newPage();
    await pageDesktop.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await pageDesktop.goto('http://localhost:3000/?intro=1', { waitUntil: 'networkidle2' });

    // Desktop authentic rings at 4.0s
    await new Promise(r => setTimeout(r, 4000));
    await pageDesktop.screenshot({ path: path.join(ARTIFACT_DIR, 'impeccable_06_desktop_authentic_rings.png') });
    console.log('Captured impeccable_06_desktop_authentic_rings.png');

    // Desktop homepage hero at 6.8s
    await new Promise(r => setTimeout(r, 2800));
    await pageDesktop.screenshot({ path: path.join(ARTIFACT_DIR, 'impeccable_07_desktop_hero_clean.png') });
    console.log('Captured impeccable_07_desktop_hero_clean.png');

    await pageDesktop.close();
    console.log('Verification finished successfully!');
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await browser.close();
  }
}

run();
