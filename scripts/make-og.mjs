import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';

// Deterministic amber dot field (no Math.random for reproducible builds).
let seed = 7;
const rnd = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};
const dots = Array.from({ length: 90 }, () => {
  const x = rnd() * 1200;
  const y = rnd() * 630;
  const r = 1 + rnd() * 2.5;
  const o = 0.15 + rnd() * 0.55;
  return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#FFB454" fill-opacity="${o.toFixed(2)}"/>`;
}).join('');

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  .card {
    position: relative; width: 1200px; height: 630px; overflow: hidden;
    background:
      radial-gradient(60% 70% at 82% 20%, rgba(255,180,84,0.18), transparent 70%),
      #0B0A09;
    color: #F3EEE6; font-family: 'Space Grotesk', sans-serif;
    padding: 84px; display: flex; flex-direction: column; justify-content: center;
  }
  .dots { position: absolute; inset: 0; }
  .eyebrow {
    font-family: 'JetBrains Mono', monospace; color: #FFB454;
    letter-spacing: 0.22em; text-transform: uppercase; font-size: 22px; margin-bottom: 26px;
  }
  .name { font-weight: 700; font-size: 132px; line-height: 0.98; letter-spacing: -0.03em; }
  .tag { margin-top: 28px; font-size: 29px; color: #A8A199; max-width: 18ch; line-height: 1.35; }
  .url {
    position: absolute; left: 84px; bottom: 70px;
    font-family: 'JetBrains Mono', monospace; font-size: 22px; color: #A8A199;
  }
  .mark {
    position: absolute; right: 84px; bottom: 62px;
    width: 74px; height: 74px; border-radius: 18px; background: #FFB454; color: #1a1206;
    display: grid; place-items: center; font-weight: 700; font-size: 34px; letter-spacing: -2px;
  }
</style></head>
<body>
  <div class="card">
    <svg class="dots" viewBox="0 0 1200 630">${dots}</svg>
    <div class="eyebrow">Software Engineer · AI · Data Systems</div>
    <div class="name">Sami<br/>Masmoudi</div>
    <div class="tag">Building data platforms &amp; AI tooling.</div>
    <div class="url">samiimasmoudii.github.io</div>
    <div class="mark">SM</div>
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  await document.fonts.ready;
});
await page.screenshot({ path: fileURLToPath(new URL('../public/og.png', import.meta.url)) });
await browser.close();
console.log('og.png generated (1200x630)');
