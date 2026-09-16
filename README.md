# Sami Masmoudi — Portfolio

A single-page personal portfolio with an interactive 3D point-cloud hero.
Dark, warm-amber, bold. Built with **Astro** + **three.js** + **GSAP**, deployed
to **GitHub Pages**.

**Live:** https://samiimasmoudii.github.io

## Develop

```bash
npm install
npm run dev        # local dev server (http://localhost:4321)
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run check      # TypeScript / Astro diagnostics
npm run verify     # assert required content is present in the build
npx playwright test   # smoke + accessibility tests
```

Requires Node ≥ 20.

## Editing content

All copy lives in typed data files — no need to touch markup:

| File | Contents |
| --- | --- |
| `src/data/site.ts` | Name, title, tagline, bio, email, links, languages |
| `src/data/experience.ts` | Roles (company, dates, bullets, stack) |
| `src/data/projects.ts` | Projects (summary, tech, optional link) |
| `src/data/skills.ts` | Skill groups |
| `src/data/recognition.ts` | Awards & leadership |

Other assets:

- **CV:** replace `public/Sami-Masmoudi-CV.pdf`
- **Photo:** replace `public/portrait.jpg` (shown duotoned in About)
- **Social card:** regenerate with `node scripts/make-og.mjs`
- **Colours / type:** `src/styles/tokens.css`

## Architecture

- **Astro** static site; near-zero JS by default.
- The point-cloud hero (`src/scripts/pointcloud.ts`, three.js) is **lazy-loaded
  on idle**, so it never blocks first paint. Falls back to a CSS gradient when
  WebGL is unavailable and to a single static frame under `prefers-reduced-motion`.
- Scroll reveals & the magnetic CTA use GSAP (`src/scripts/reveal.ts`) via
  `IntersectionObserver`; everything degrades gracefully with motion off.
- Components in `src/components/` render from the data files above.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with
the official Astro action and publishes to GitHub Pages. In the repo:
**Settings → Pages → Source: GitHub Actions** (one-time).

### Custom domain (optional)

Add a `public/CNAME` file containing your domain (e.g. `samimasmoudi.dev`),
point the domain's DNS at GitHub Pages, then set the custom domain under
Settings → Pages.
