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
    console.log('--- 1. Testing Smooth Metamorphosis Mobile (390 x 844) ---');
    const pageMobile = await browser.newPage();
    await pageMobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    
    // Clear storage & visit intro
    await pageMobile.goto('http://localhost:3000/?intro=1', { waitUntil: 'networkidle2' });

    // Step 1: 0.8s (Divine Start)
    await new Promise(r => setTimeout(r, 800));
    await pageMobile.screenshot({ path: path.join(ARTIFACT_DIR, 'smooth_01_mobile_divine.png') });
    console.log('Captured smooth_01_mobile_divine.png');

    // Step 2: 2.5s (Liquid Golden Bloom & Skin Tone Warming)
    await new Promise(r => setTimeout(r, 1700));
    await pageMobile.screenshot({ path: path.join(ARTIFACT_DIR, 'smooth_02_mobile_bloom.png') });
    console.log('Captured smooth_02_mobile_bloom.png');

    // Step 3: 4.2s (100% Authentic Photo - Both Rings Gleaming)
    await new Promise(r => setTimeout(r, 1700));
    await pageMobile.screenshot({ path: path.join(ARTIFACT_DIR, 'smooth_03_mobile_authentic_rings.png') });
    console.log('Captured smooth_03_mobile_authentic_rings.png');

    await pageMobile.close();

    console.log('--- 2. Testing Smooth Metamorphosis Desktop (1440 x 900) ---');
    const pageDesktop = await browser.newPage();
    await pageDesktop.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await pageDesktop.goto('http://localhost:3000/?intro=1', { waitUntil: 'networkidle2' });

    // Desktop Step 1: 1.0s
    await new Promise(r => setTimeout(r, 1000));
    await pageDesktop.screenshot({ path: path.join(ARTIFACT_DIR, 'smooth_04_desktop_divine.png') });
    console.log('Captured smooth_04_desktop_divine.png');

    // Desktop Step 2: 2.6s
    await new Promise(r => setTimeout(r, 1600));
    await pageDesktop.screenshot({ path: path.join(ARTIFACT_DIR, 'smooth_05_desktop_bloom.png') });
    console.log('Captured smooth_05_desktop_bloom.png');

    // Desktop Step 3: 4.2s
    await new Promise(r => setTimeout(r, 1600));
    await pageDesktop.screenshot({ path: path.join(ARTIFACT_DIR, 'smooth_06_desktop_authentic_rings.png') });
    console.log('Captured smooth_06_desktop_authentic_rings.png');

    await pageDesktop.close();
    console.log('All smooth screenshots captured successfully!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
}

run();
