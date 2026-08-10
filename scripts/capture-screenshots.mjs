import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'docs', 'screenshots');

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

console.log('Navigating...');
const baseUrl = process.env.SCREENSHOT_URL || 'http://localhost:5173';
await page.goto(baseUrl, {
  waitUntil: 'networkidle',
  timeout: 90000,
});

// Let WebGL / fonts / charts settle
await page.waitForTimeout(3000);

// Force reveals visible for consistent shots
await page.evaluate(() => {
  document.querySelectorAll('.reveal, .team-card, .signal-list li').forEach((n) => {
    n.classList.add('is-visible', 'in-view');
  });
  const content = document.getElementById('highlightContent');
  if (content) content.classList.remove('collapsed');
});
await page.waitForTimeout(800);

console.log('Capturing hero...');
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await page.screenshot({
  path: path.join(outDir, '01-hero.png'),
  fullPage: false,
});

const sectionShots = [
  { id: 'intel', file: '02-live-intel.png' },
  { id: 'teams', file: '03-teams.png' },
  { id: 'schedule', file: '04-fixtures.png' },
  { id: 'pipeline', file: '05-pipeline.png' },
];

// Hide sticky chrome for cleaner section crops in the README
await page.evaluate(() => {
  const header = document.querySelector('header');
  if (header) header.style.visibility = 'hidden';
});

for (const s of sectionShots) {
  console.log('Capturing', s.id, '...');
  const el = page.locator('#' + s.id);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.evaluate(() => {
    document.querySelectorAll('.reveal, .team-card, .signal-list li').forEach((n) => {
      n.classList.add('is-visible', 'in-view');
    });
  });
  await page.waitForTimeout(350);
  await el.screenshot({ path: path.join(outDir, s.file) });
}

await page.evaluate(() => {
  const header = document.querySelector('header');
  if (header) header.style.visibility = '';
});

console.log('Capturing full page...');
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
await page.screenshot({
  path: path.join(outDir, '00-overview.png'),
  fullPage: true,
});

await browser.close();

const files = fs.readdirSync(outDir);
console.log('Done. Files:');
for (const f of files) {
  const st = fs.statSync(path.join(outDir, f));
  console.log(`  ${f} (${Math.round(st.size / 1024)} KB)`);
}
