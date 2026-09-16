# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy Sami Masmoudi's creative/bold, single-page portfolio (interactive point-cloud hero) as an Astro static site on GitHub Pages.

**Architecture:** Astro static site. All content lives in typed `src/data/*.ts` modules; `.astro` components render from that data. The hero is a vanilla-TS three.js island mounted to a `<canvas>`; scroll motion is GSAP + ScrollTrigger, imported only where used. Everything ships as static HTML/CSS with two small client scripts. Dark theme, warm-amber accent, `prefers-reduced-motion` + mobile fallbacks throughout.

**Tech Stack:** Astro 4, TypeScript, three.js, GSAP (+ ScrollTrigger), @fontsource (Space Grotesk / Inter / JetBrains Mono), Playwright (dev-only, verification), GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-16-portfolio-design.md` — the plan argues from the spec; executors read both. All human-facing copy (bios, bullets, projects, dates, links) is taken **verbatim from the spec §2**.

## Global Constraints

- **Node:** ≥ 20.  **Package manager:** npm.
- **Deploy target:** GitHub user site repo `samiimasmoudii.github.io`, served at root (`https://samiimasmoudii.github.io`) — no `base` path.
- **Email (verbatim):** `samiimasmoudii2@gmail.com`.
- **Links (verbatim):** GitHub `https://github.com/samiimasmoudii`, LinkedIn `https://www.linkedin.com/in/sami-masmoudi12/`.
- **Do NOT print the phone number** anywhere on the site.
- **Design tokens (verbatim):** `--bg:#0B0A09`, `--surface:#16130F`, `--surface-2:#1E1A15`, `--text:#F3EEE6`, `--text-muted:#A8A199`, `--accent:#FFB454`, `--accent-strong:#FF9E1B`.
- **Fonts:** Space Grotesk (display/headings), Inter (body), JetBrains Mono (labels) — self-hosted via `@fontsource`.
- **Motion:** every animation must no-op (or freeze to a static still) under `@media (prefers-reduced-motion: reduce)`.
- **Verification gate for every task:** `npm run build` succeeds AND `node scripts/check-build.mjs` passes. Commit only when green.

---

### Task 1: Scaffold Astro project, tokens, base layout, build-check

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`
- Create: `src/layouts/Base.astro`
- Create: `src/pages/index.astro`
- Create: `src/styles/tokens.css`, `src/styles/global.css`
- Create: `scripts/check-build.mjs`
- Create: `public/.nojekyll` (empty — stops GitHub Pages Jekyll processing)

**Interfaces:**
- Produces: `Base.astro` accepting props `{ title: string; description: string }` and a default `<slot />`. Global CSS variables from `tokens.css` available site-wide. `npm run build` → static output in `dist/`. `scripts/check-build.mjs` → exits non-zero if required strings are missing from `dist/index.html`.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "samiimasmoudii-portfolio",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "verify": "node scripts/check-build.mjs"
  },
  "dependencies": {
    "astro": "^4.15.0"
  },
  "devDependencies": {
    "@fontsource/space-grotesk": "^5.0.0",
    "@fontsource/inter": "^5.0.0",
    "@fontsource/jetbrains-mono": "^5.0.0"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://samiimasmoudii.github.io',
  // user site → served at root, no base path
  build: { inlineStylesheets: 'auto' },
  vite: {
    // three.js / gsap are fine to pre-bundle
    ssr: { noExternal: ['gsap'] },
  },
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "types": ["astro/client"]
  }
}
```

- [ ] **Step 4: Create `src/styles/tokens.css`** (design tokens + type scale, verbatim values from Global Constraints)

```css
:root {
  --bg: #0B0A09;
  --surface: #16130F;
  --surface-2: #1E1A15;
  --text: #F3EEE6;
  --text-muted: #A8A199;
  --accent: #FFB454;
  --accent-strong: #FF9E1B;
  --accent-soft: rgba(255, 180, 84, 0.14);
  --border: rgba(243, 238, 230, 0.10);

  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  --step--1: clamp(0.83rem, 0.8rem + 0.15vw, 0.9rem);
  --step-0: clamp(1rem, 0.95rem + 0.25vw, 1.13rem);
  --step-1: clamp(1.35rem, 1.2rem + 0.7vw, 1.8rem);
  --step-2: clamp(1.8rem, 1.5rem + 1.5vw, 2.8rem);
  --step-3: clamp(2.4rem, 1.8rem + 3vw, 4.5rem);
  --step-4: clamp(3.2rem, 2rem + 6vw, 8rem);

  --space-section: clamp(4rem, 3rem + 6vw, 9rem);
  --content-width: 1100px;
  --gutter: clamp(1.25rem, 0.5rem + 3vw, 3rem);
}
```

- [ ] **Step 5: Create `src/styles/global.css`** (reset + base element styles + reduced-motion guard)

```css
@import '@fontsource/space-grotesk/400.css';
@import '@fontsource/space-grotesk/500.css';
@import '@fontsource/space-grotesk/700.css';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
@import '@fontsource/jetbrains-mono/400.css';
@import './tokens.css';

*, *::before, *::after { box-sizing: border-box; margin: 0; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: var(--step-0);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
h1, h2, h3 { font-family: var(--font-display); line-height: 1.05; font-weight: 700; }
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 2px; }
.container { width: min(var(--content-width), 100% - 2 * var(--gutter)); margin-inline: auto; }
.eyebrow {
  font-family: var(--font-mono); font-size: var(--step--1);
  letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent);
}
.skip-link {
  position: absolute; left: -999px; top: 0; background: var(--accent); color: #000;
  padding: 0.6rem 1rem; z-index: 100; border-radius: 0 0 6px 0;
}
.skip-link:focus { left: 0; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}
```

- [ ] **Step 6: Create `src/layouts/Base.astro`**

```astro
---
import '../styles/global.css';
interface Props { title: string; description: string; }
const { title, description } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site).toString();
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta name="theme-color" content="#0B0A09" />
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <slot />
  </body>
</html>
```

- [ ] **Step 7: Create `src/pages/index.astro`** (placeholder that proves the pipeline)

```astro
---
import Base from '../layouts/Base.astro';
---
<Base title="Sami Masmoudi — Software Engineer · AI · Data Systems"
      description="Software Engineer building data platforms and AI tooling.">
  <main id="main" class="container">
    <h1>Sami Masmoudi</h1>
  </main>
</Base>
```

- [ ] **Step 8: Create `scripts/check-build.mjs`** (content gate — grows each task)

```js
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
// REQUIRED grows as sections land. Keep strings verbatim from the built site.
const REQUIRED = [
  'Sami Masmoudi',
];
const missing = REQUIRED.filter((s) => !html.includes(s));
if (missing.length) {
  console.error('check-build FAIL — missing:', missing);
  process.exit(1);
}
console.log(`check-build OK — ${REQUIRED.length} assertions`);
```

- [ ] **Step 9: Create `public/.nojekyll`** (empty file)

- [ ] **Step 10: Install and build**

Run: `npm install && npm run build && npm run verify`
Expected: build writes `dist/`, verify prints `check-build OK`.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project, design tokens, base layout"
```

---

### Task 2: Content data modules

**Files:**
- Create: `src/data/site.ts`, `src/data/experience.ts`, `src/data/projects.ts`, `src/data/skills.ts`, `src/data/recognition.ts`

**Interfaces:**
- Produces (exact types later tasks import):
```ts
// site.ts
export const site: {
  name: string; title: string; tagline: string; location: string;
  bio: string[];                       // paragraphs, verbatim from spec, tightened
  email: string; github: string; linkedin: string; cvPath: string;
  languages: { name: string; level: string }[];
};
// experience.ts
export interface Role { company: string; title: string; period: string; location: string; bullets: string[]; stack: string[]; }
export const experience: Role[];
// projects.ts
export interface Project { name: string; period: string; summary: string; tech: string[]; link?: string; }
export const projects: Project[];
// skills.ts
export const skills: { group: string; items: string[] }[];
// recognition.ts
export interface Award { title: string; org: string; detail: string; }
export const recognition: Award[];
```

- [ ] **Step 1: Write all five data files** using the exact content from spec §2 (identity, experience 1–4, projects 1–3, skills groups, recognition). `site.cvPath = '/Sami-Masmoudi-CV.pdf'`. `site.email = 'samiimasmoudii2@gmail.com'`. Use the verbatim links from Global Constraints.

- [ ] **Step 2: Typecheck**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/data
git commit -m "feat: add typed content data modules from spec"
```

---

### Task 3: Nav + SEO/meta in Base layout

**Files:**
- Create: `src/components/Nav.astro`
- Modify: `src/layouts/Base.astro` (add OG/Twitter/JSON-LD, `ogImage` prop)
- Modify: `src/pages/index.astro` (render `<Nav />`)
- Modify: `scripts/check-build.mjs` (assert nav labels + og:title present)

**Interfaces:**
- Consumes: `site` from `src/data/site.ts`.
- Produces: `Nav.astro` — fixed top nav with anchor links `#about #work #projects #skills #contact` and a `Download CV` button (`href={site.cvPath}` `download`). Adds a `.is-scrolled` background via a tiny inline script on scroll.

- [ ] **Step 1: Build `Nav.astro`** — semantic `<nav aria-label="Primary">`, brand = `Sami Masmoudi`, links to the section anchors, amber CV button. Mobile: collapse links into a simple toggle (details/summary or a button) — no framework.

- [ ] **Step 2: Extend `Base.astro` `<head>`** with Open Graph + Twitter tags and a JSON-LD `Person` block:

```astro
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={new URL('/og.png', Astro.site)} />
<meta name="twitter:card" content="summary_large_image" />
<script type="application/ld+json" set:html={JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Person',
  name: 'Sami Masmoudi', jobTitle: 'Software Engineer',
  url: 'https://samiimasmoudii.github.io',
  sameAs: ['https://github.com/samiimasmoudii', 'https://www.linkedin.com/in/sami-masmoudi12/'],
})} />
```

- [ ] **Step 3: Add nav assertions** to `scripts/check-build.mjs` REQUIRED: `'Download CV'`, `'og:title'`, `'application/ld+json'`.

- [ ] **Step 4: Verify** — `npm run build && npm run verify` → OK.

- [ ] **Step 5: Commit** — `git commit -am "feat: primary nav + SEO/OG/JSON-LD meta"`.

---

### Task 4: Hero static shell (no WebGL yet)

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro` (render `<Hero />` first in `<main>`)
- Modify: `scripts/check-build.mjs` (assert tagline text)

**Interfaces:**
- Consumes: `site`.
- Produces: `Hero.astro` containing `<canvas id="hero-canvas" aria-hidden="true">` (empty for now, sized via CSS behind the content), the kinetic name (`site.name` split into letters for later animation), `site.title` tagline, two CTAs (`View work` → `#work`, `Download CV` → `site.cvPath`), and a scroll cue. A CSS radial amber gradient sits behind the canvas as the no-WebGL fallback.

- [ ] **Step 1: Build `Hero.astro`** — full-viewport (`min-height: 100svh`) section `#top`. Layer order: gradient fallback (z0) → `<canvas>` (z1) → content (z2). Name rendered as `<h1>` with per-letter `<span>` wrappers (`aria-label` on the h1 for screen readers). Mono eyebrow "Software Engineer · AI · Data Systems". CTAs styled (filled amber + ghost). Respect reduced-motion (letters just appear).

- [ ] **Step 2: Add** `site.title` (`'Software Engineer · AI · Data Systems'`) and `'View work'` to check-build REQUIRED.

- [ ] **Step 3: Verify** — `npm run build && npm run verify` → OK; open `npm run preview` and eyeball hero renders full-screen with gradient (canvas empty).

- [ ] **Step 4: Commit** — `git commit -am "feat: hero static shell with kinetic name + CTAs"`.

---

### Task 5: About + Experience sections

**Files:**
- Create: `src/components/About.astro`, `src/components/Experience.astro`
- Create: `src/components/SectionHeading.astro` (shared: eyebrow number + title)
- Create: `public/portrait.jpg` (processed photo — see Step 1)
- Modify: `src/pages/index.astro`, `scripts/check-build.mjs`

**Interfaces:**
- Consumes: `site`, `experience: Role[]`.
- Produces: `SectionHeading.astro` props `{ index: string; title: string; id: string }` rendering `<h2 id={id}>` with a mono index (e.g. `01`). `About` renders `#about`; `Experience` renders `#work`.

- [ ] **Step 1: Prepare the portrait** — copy the source selfie and produce a square, theme-matched image. Run:

```bash
mkdir -p public
# source from the Notion export (path from spec §2 Assets)
SRC="$HOME/Downloads/notion site/Sami Masmoudi/7157823f-4736-4e8e-ad78-a552b1c7c285.png"
sips -s format jpeg "$SRC" --out public/portrait.jpg >/dev/null && echo "portrait copied"
```
Duotone/treatment is applied later via CSS (`filter` + amber overlay blend) in `About.astro`, so the source copy is enough here.

- [ ] **Step 2: Build `About.astro`** — two-column on desktop (text + portrait), stacked on mobile. Bio paragraphs from `site.bio`. Portrait wrapped in a figure with CSS `filter: grayscale(1) contrast(1.05)` + an amber `mix-blend-mode` overlay + subtle border; `loading="lazy"`, real `alt`. Languages rendered as a mono row.

- [ ] **Step 3: Build `Experience.astro`** — vertical timeline: a left rule with amber node dots; each `Role` = company + title, mono period + location, bullets, stack chips (mono, bordered). Data-driven `map` over `experience`. No animation yet (added in Task 9).

- [ ] **Step 4: Add assertions** — company names `'Stackdrop'`, `'Concordia'`, `'Dynatrace'`, and `'About'` heading to check-build REQUIRED.

- [ ] **Step 5: Verify** — `npm run build && npm run verify` → OK.

- [ ] **Step 6: Commit** — `git commit -am "feat: About + Experience timeline sections"`.

---

### Task 6: Projects + Skills sections

**Files:**
- Create: `src/components/Projects.astro`, `src/components/Skills.astro`
- Modify: `src/pages/index.astro`, `scripts/check-build.mjs`

**Interfaces:**
- Consumes: `projects: Project[]`, `skills`.
- Produces: `Projects` renders `#projects`; `Skills` renders `#skills`.

- [ ] **Step 1: Build `Projects.astro`** — responsive card grid (`repeat(auto-fit, minmax(280px, 1fr))`). Each card: name, mono period, summary, tech chips, optional `link`. Hover: border → amber, slight lift (transition; reduced-motion safe).

- [ ] **Step 2: Build `Skills.astro`** — three groups (`skills.map`) as columns/cards with the group name and items as mono chips; a Languages block from `site.languages`.

- [ ] **Step 3: Add assertions** — `'Real-Time Analytics'`, `'Facial Recognition'`, `'Kafka'`, `'TensorFlow'` to check-build REQUIRED.

- [ ] **Step 4: Verify** — `npm run build && npm run verify` → OK.

- [ ] **Step 5: Commit** — `git commit -am "feat: Projects + Skills sections"`.

---

### Task 7: Recognition + Contact + Footer

**Files:**
- Create: `src/components/Recognition.astro`, `src/components/Contact.astro`, `src/components/Footer.astro`
- Modify: `src/pages/index.astro`, `scripts/check-build.mjs`

**Interfaces:**
- Consumes: `recognition: Award[]`, `site`.
- Produces: `Recognition` renders `#recognition`; `Contact` renders `#contact` with a `mailto:` link and LinkedIn/GitHub buttons + CV download; `Footer` with copyright + "built with Astro + three.js" + back-to-top (`#top`).

- [ ] **Step 1: Build `Recognition.astro`** — compact cards from `recognition` (SupClay, First Global robotics, IAESTE): title, org, detail.

- [ ] **Step 2: Build `Contact.astro`** — big closing line in Sami's voice, `mailto:${site.email}` primary button, ghost buttons for LinkedIn/GitHub (`target="_blank" rel="noopener"`), and a Download CV link. Do **not** render the phone number.

- [ ] **Step 3: Build `Footer.astro`** — `© 2026 Sami Masmoudi`, tech credit, back-to-top link.

- [ ] **Step 4: Add assertions** — `'SupClay'`, `site.email`, `'mailto:'`, and `'Contact'` heading to check-build REQUIRED.

- [ ] **Step 5: Verify** — `npm run build && npm run verify` → OK. Confirm the phone number string `23181696` is **absent**: `! grep -q "23181696" dist/index.html && echo "no phone OK"`.

- [ ] **Step 6: Commit** — `git commit -am "feat: Recognition, Contact, Footer"`.

---

### Task 8: Point-cloud hero (three.js) + fallbacks + smoke test

**Files:**
- Create: `src/scripts/pointcloud.ts`
- Modify: `src/components/Hero.astro` (module script mounting the cloud)
- Modify: `package.json` (add `three`, `@types/three`, `@playwright/test`)
- Create: `playwright.config.ts`, `tests/smoke.spec.ts`

**Interfaces:**
- Consumes: the `<canvas id="hero-canvas">` from Task 4.
- Produces: `export function initPointCloud(canvas: HTMLCanvasElement): () => void` — starts the animation, returns a cleanup fn. Internally guards: if `!window.WebGLRenderingContext` or context creation fails → leave canvas hidden (CSS gradient shows). If `matchMedia('(prefers-reduced-motion: reduce)').matches` → render ONE static frame (sphere) and do not start the RAF loop. Particle count scales: `innerWidth < 768 ? 1500 : 5000`.

- [ ] **Step 1: Add deps** — `npm i three && npm i -D @types/three @playwright/test && npx playwright install chromium`.

- [ ] **Step 2: Write `src/scripts/pointcloud.ts`** — a working implementation:
  - Scene + `PerspectiveCamera` + `WebGLRenderer({ canvas, alpha:true, antialias:true })`, `setPixelRatio(min(devicePixelRatio,2))`.
  - `BufferGeometry` with `count` particles; three precomputed Float32 target sets: **scatter** (random in a box), **sphere** (fibonacci sphere), **initials** (sample opaque pixels from an offscreen canvas that draws "SM" in Space Grotesk). Store `positions` (current), `scatter`, `sphere`, `initials`.
  - Per-vertex colors: ~30% at `--accent` amber, rest a dim warm gray, for depth.
  - `PointsMaterial({ size, sizeAttenuation:true, map: softSprite, vertexColors:true, transparent:true, blending: AdditiveBlending, depthWrite:false })`, where `softSprite` is a radial-gradient canvas texture.
  - Animate: each frame lerp `positions` → active target (`morphTarget`), slow-rotate the `Points`, apply cursor repel (project pointer to z=0 plane; push particles within radius outward with falloff). Cycle `morphTarget` sphere→initials→scatter on an internal timer (respect reduced-motion = no cycle).
  - Pointer, `resize`, and `visibilitychange` (pause when hidden) handlers. Cleanup fn disposes geometry/material/renderer and removes listeners.

- [ ] **Step 3: Mount in `Hero.astro`** — add a module script:

```astro
<script>
  import { initPointCloud } from '../scripts/pointcloud';
  const canvas = document.getElementById('hero-canvas');
  if (canvas instanceof HTMLCanvasElement) {
    const cleanup = initPointCloud(canvas);
    window.addEventListener('beforeunload', cleanup, { once: true });
  }
</script>
```

- [ ] **Step 4: Add `playwright.config.ts`** — build then preview on a fixed port; `webServer: { command: 'npm run build && npm run preview -- --port 4321', url: 'http://localhost:4321', reuseExistingServer: false }`.

- [ ] **Step 5: Write `tests/smoke.spec.ts`** (failing first — canvas has no WebGL wiring until Step 2/3 land, but write the assertions now):

```ts
import { test, expect } from '@playwright/test';

test('hero renders without console errors and canvas is present', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('http://localhost:4321/');
  await expect(page.locator('#hero-canvas')).toBeVisible();
  await page.waitForTimeout(1500);
  expect(errors, errors.join('\n')).toEqual([]);
});

test('reduced-motion loads cleanly', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('http://localhost:4321/');
  await expect(page.locator('h1')).toContainText('Sami');
  expect(errors, errors.join('\n')).toEqual([]);
  await ctx.close();
});
```

- [ ] **Step 6: Run the smoke test**

Run: `npx playwright test`
Expected: both tests PASS (canvas visible, zero console/page errors, reduced-motion clean). Capture `page.screenshot` into `tests/__artifacts__/hero.png` for manual review (add a line to the first test).

- [ ] **Step 7: Verify + commit** — `npm run build && npm run verify` → OK; then `git add -A && git commit -m "feat: interactive three.js point-cloud hero + smoke tests"`.

---

### Task 9: Scroll motion (GSAP) reveals, timeline, magnetic CTA

**Files:**
- Create: `src/scripts/reveal.ts`
- Modify: `src/pages/index.astro` (import reveal script once), section components (add `data-reveal` attributes)
- Modify: `tests/smoke.spec.ts` (assert revealed content visible)
- Modify: `package.json` (add `gsap`)

**Interfaces:**
- Produces: `export function initReveals(): void` — if reduced-motion, immediately set all `[data-reveal]` to their final visible state and return; else register GSAP ScrollTrigger reveals (fade/translate) for `[data-reveal]`, a draw-in for the experience timeline rule, and a magnetic-hover effect for `[data-magnetic]` CTAs.

- [ ] **Step 1: Add dep** — `npm i gsap`.

- [ ] **Step 2: Write `src/scripts/reveal.ts`** — import `gsap` + `ScrollTrigger`, `gsap.registerPlugin(ScrollTrigger)`. Reduced-motion branch sets `opacity:1; transform:none`. Otherwise batch-animate `[data-reveal]` on scroll, animate the timeline line `scaleY 0→1`, and add pointer-move magnetic translation to `[data-magnetic]` elements (reset on leave).

- [ ] **Step 3: Add `data-reveal`** to section headings, cards, timeline items; `data-magnetic` to the hero primary CTA. Import once in `index.astro`:

```astro
<script>
  import { initReveals } from '../scripts/reveal';
  initReveals();
</script>
```

- [ ] **Step 4: Extend smoke test** — after scrolling, a Projects card is visible:

```ts
test('sections reveal on scroll', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect(page.getByText('Real-Time Analytics')).toBeVisible();
});
```

- [ ] **Step 5: Run** — `npx playwright test` → PASS. `npm run build && npm run verify` → OK.

- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat: GSAP scroll reveals, timeline draw-in, magnetic CTA"`.

---

### Task 10: Brand assets — CV, favicon, OG image

**Files:**
- Create: `public/Sami-Masmoudi-CV.pdf` (copied from Downloads)
- Create: `public/favicon.svg` (SM monogram)
- Create: `public/og.png` (1200×630 social card)
- Modify: `src/layouts/Base.astro` (`<link rel="icon">`)

**Interfaces:** none (static assets consumed by existing meta/links).

- [ ] **Step 1: Copy the CV** — `cp "$HOME/Downloads/CV-Sami-SE_260627_200143.pdf" public/Sami-Masmoudi-CV.pdf`.

- [ ] **Step 2: Create `public/favicon.svg`** — a dark-rounded square with an amber "SM" monogram in Space Grotesk (inline SVG text).

- [ ] **Step 3: Create `public/og.png`** — 1200×630, `--bg` background, "Sami Masmoudi" + tagline in amber/off-white. Generate via a one-off headless render: write `scripts/make-og.mjs` that uses Playwright to screenshot a small inline HTML card at 1200×630 → `public/og.png`. Run it, keep the script in `scripts/`.

- [ ] **Step 4: Wire favicon** — add `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` to `Base.astro`.

- [ ] **Step 5: Verify** — `npm run build && npm run verify` → OK; confirm `dist/Sami-Masmoudi-CV.pdf`, `dist/favicon.svg`, `dist/og.png` exist.

- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat: CV download, favicon, OG image"`.

---

### Task 11: Polish, responsive QA, accessibility, Lighthouse

**Files:** Modify: any component needing refinement; `tests/smoke.spec.ts` (a11y-ish assertions).

**REQUIRED SUB-SKILL for this task:** invoke the design-polish skill (`stackdrop-context:impeccable` or `stackdrop-context:design-taste-frontend`) to review and refine visual craft — spacing rhythm, type hierarchy, hover/focus states, and the hero's color/motion balance — before the a11y/perf gate.

- [ ] **Step 1: Design polish pass** — run the design skill against the running site; apply spacing/hierarchy/contrast refinements. Keep amber usage disciplined (accent, not fill).

- [ ] **Step 2: Responsive sweep** — check 360px, 768px, 1280px, 1920px via Playwright viewports; fix overflow/wrap issues; verify the mobile nav and reduced particle count.

- [ ] **Step 3: Accessibility** — verify: single `<h1>`, ordered headings, all interactive elements keyboard-reachable with visible focus, images have alt, color contrast ≥ AA on body text, `aria-label`s on icon links. Add a Playwright assertion that Tab reaches the CV button.

- [ ] **Step 4: Lighthouse** — `npx lighthouse http://localhost:4321 --preset=desktop --quiet --chrome-flags="--headless" --output=json --output-path=./lh.json` after `npm run preview`. Target performance ≥ 95, accessibility ≥ 95. Fix regressions (image sizes, unused JS). Delete `lh.json` after.

- [ ] **Step 5: Full verify** — `npm run build && npm run verify && npx playwright test` → all green.

- [ ] **Step 6: Commit** — `git add -A && git commit -m "polish: visual craft, responsive, a11y, performance"`.

---

### Task 12: Deploy to GitHub Pages

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `README.md`

**Interfaces:** none.

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages
on:
  push: { branches: [main] }
  workflow_dispatch:
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: true }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: '${{ steps.deployment.outputs.page_url }}' }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Write `README.md`** — what it is, `npm run dev/build/verify`, where content lives (`src/data`), how deploy works, and how to add a custom domain later.

- [ ] **Step 3: Local final build** — `npm run build && npm run verify && npx playwright test` → all green.

- [ ] **Step 4: Commit** — `git add -A && git commit -m "ci: GitHub Pages deploy workflow + README"`.

- [ ] **Step 5: Go live (requires Sami's GitHub — do WITH him, don't assume auth):**
  1. Create an **empty** repo named exactly `samiimasmoudii.github.io` on his account.
  2. `git remote add origin https://github.com/samiimasmoudii/samiimasmoudii.github.io.git`
  3. `git branch -M main && git push -u origin main`
  4. Repo → Settings → Pages → **Source: GitHub Actions**.
  5. Watch the Action; confirm `https://samiimasmoudii.github.io` is live.

---

## Self-Review

**1. Spec coverage:**
- §1 goals / single page / no backend → Tasks 1,4,7 (mailto, no server). ✅
- §2 all content → Task 2 data + Tasks 4–7 render. ✅
- §3 art direction (dark, amber, point cloud, kinetic type, motion philosophy) → Tasks 1 (tokens/fonts), 4 (kinetic type), 8 (point cloud), 9 (motion). ✅
- §4 IA (8 sections + nav) → Tasks 3–7. ✅
- §5 architecture (Astro, three.js island, GSAP, data modules, tokens) → Tasks 1,2,8,9. ✅
- §6 perf/a11y (reduced-motion, mobile scaling, semantics, SEO, Lighthouse) → Tasks 3 (meta), 8 (fallbacks), 9 (reduced-motion), 11 (a11y/Lighthouse). ✅
- §7 deployment (user-site repo, Actions) → Task 12. ✅
- §8 confirmations → resolved in Global Constraints (email chosen, photo source, repo name). ✅
- §2 Assets photo → Task 5 Step 1. ✅

**2. Placeholder scan:** No "TBD/TODO/handle edge cases". Interactive code (point cloud, reveals) is specified by behavior + exact interface signatures + real config/test code; content data references the verbatim spec that travels with the plan. ✅

**3. Type consistency:** `initPointCloud(canvas) => () => void`, `initReveals() => void`, `Role/Project/Award` interfaces, `site.cvPath='/Sami-Masmoudi-CV.pdf'`, `site.email='samiimasmoudii2@gmail.com'` used consistently across Tasks 2, 5–9. Canvas id `hero-canvas` consistent between Tasks 4 and 8. ✅
