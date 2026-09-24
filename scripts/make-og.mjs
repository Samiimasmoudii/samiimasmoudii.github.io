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
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  .card {
    position: relative; width: 1200px; height: 630px; overflow: hidden;
    background: #0A0908;
    color: #ECE7DC; font-family: 'Space Mono', monospace;
    padding: 84px; display: flex; flex-direction: column; justify-content: center;
  }
  .scanlines {
    position: absolute; inset: 0;
    background: repeating-linear-gradient(to bottom, rgba(255,180,84,0.05) 0px, rgba(255,180,84,0.05) 1px, transparent 1px, transparent 3px);
    mix-blend-mode: overlay;
  }
  .dots { position: absolute; inset: 0; }
  .eyebrow {
    color: #FFB454;
    letter-spacing: 0.18em; text-transform: uppercase; font-size: 20px; margin-bottom: 26px;
  }
  .eyebrow::before { content: '>_ '; }
  .name {
    font-weight: 700; font-size: 110px; line-height: 1; letter-spacing: -0.01em; text-transform: uppercase;
    text-shadow: 0 0 26px rgba(255,180,84,0.5), 0 0 70px rgba(255,180,84,0.22);
  }
  .tag { margin-top: 28px; font-size: 24px; color: #8F887C; max-width: 22ch; line-height: 1.5; }
  .tag::before { content: '// '; }
  .url {
    position: absolute; left: 84px; bottom: 70px;
    font-size: 20px; color: #8F887C;
  }
  .mark {
    position: absolute; right: 84px; bottom: 62px;
    width: 74px; height: 74px; border-radius: 8px; background: #FFB454; color: #0A0908;
    display: grid; place-items: center; font-weight: 700; font-size: 30px; letter-spacing: -1px;
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
    <div class="scanlines"></div>
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
