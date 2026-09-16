# Sami Masmoudi — Portfolio Website · Design Spec

**Date:** 2026-09-16
**Status:** Draft for review
**Author:** Sami Masmoudi (with Claude)

## 1. Purpose & goals

A personal portfolio website for Sami Masmoudi — Software Engineer · AI · Data
Systems — hosted on GitHub Pages. It serves as a **general professional
showcase**, flexible enough for full-time recruiters, freelance clients, and
networking.

Success criteria:

- A single, memorable page that communicates who Sami is and what he builds in
  under 10 seconds, then rewards scrolling with depth.
- Distinctive **creative/bold** art direction that still reads as serious and
  professional (not gimmicky).
- Fast, accessible, and effortless to maintain (content lives in data files).
- Deploys automatically to GitHub Pages on push.

Non-goals (YAGNI):

- No CMS, blog, or database. (A blog can be a later addition.)
- No backend / server. Contact is via `mailto:` + social links.
- No multi-page routing. One page with anchored sections.
- No analytics or tracking in v1.

## 2. Content source of truth

Content is synthesized from two sources, reconciled here:

- **CV** (`~/Downloads/CV-Sami-SE_260627_200143.pdf`, June 2026 — most recent)
- **Notion export** (`~/Downloads/notion site/`, older — provides voice & extra
  narrative)

### Identity
- **Name:** Sami Masmoudi
- **Title:** Software Engineer · AI · Data Systems
- **Location:** Tunisia (remote). Currently at Stackdrop (Athens-based).
- **Voice:** warm, curious, ambitious, direct. (Notion: "Hey there! I'm Sami…")

### Contact / links
- **Email:** `samiimasmoudii2@gmail.com` *(from CV; Notion shows the older
  `samiimasmoudii@gmail.com` — CONFIRM which is current before launch)*
- **GitHub:** https://github.com/samiimasmoudii
- **LinkedIn:** https://www.linkedin.com/in/sami-masmoudi12/
- **Phone:** `+216 23181696` — **omitted** from the public site for privacy
  (can be added on request).
- **CV download:** current CV PDF, copied into the repo.

### Experience (most recent first)
1. **Stackdrop** — Software Engineer · Nov 2025 – Present · Athens (Remote)
   - Workforce tooling for Wayve (UK autonomous-vehicle company): HR sync
     workflow, fleet optimization, shift organization, internal UI/backend apps.
   - Built & shipped a risk-analysis platform for US e-learning clients: data
     ingestion, ETL pipelines, schema design, UI; unified third-party
     risk-assessment APIs into a Redshift-backed analytics workflow (real-time +
     batch).
   - Internal tools for meeting summarization & progress reporting using RAG +
     MCP.
   - Stack: JavaScript, Retool, Amazon Redshift, PostgreSQL, React, MCP, System
     Design, ETL Architecture, RAG.
2. **Concordia University – DAS Lab** — AI Research Intern · Mar 2025 – Jul 2025
   · Montreal, Canada
   - Researched automated repair of flaky tests across 400 Maven projects
     (end-of-studies project, graded Excellent).
   - Built evaluation pipelines to benchmark LLM performance on code inspection
     and flaky-test classification.
   - Stack: Python, Docker, Maven, LLM APIs, Software Testing.
3. **Dynatrace** — Software Engineering Intern · Jul 2024 – Aug 2024 · Vienna,
   Austria
   - Capacity-planning app for team vacation & shift scheduling, deployed
     internally.
   - Integrated the Dynatrace API to surface live performance metrics in a React
     dashboard.
   - Stack: React, JavaScript, Dynatrace API.
4. **Target Energy Solutions** — Software Engineering Intern · Jul 2023 – Aug
   2023 · Tunis, Tunisia
   - NLP database-query tool using transformer LLMs, reducing ad-hoc retrieval
     time for non-technical staff. Research on LLMs, transformers, image
     generation, object detection (TensorFlow/Keras).
   - Stack: Python, TensorFlow, SQL, LLM APIs.

### Education
- **M2 Master's, Information Processing & AI** — ENIT · Sep 2024 – Nov 2025.
  Research focus: knowledge & image fusion, semantic web, ontology, GIS,
  wireless sensor networks.
- **Computer Science Engineering Degree** — ENIT · Sep 2022 – Sep 2025.
- **Pre-engineering (Mathematics & Physics)** — IPEIS · Sep 2020 – Jun 2022 ·
  Top 20% nationally.

### Projects
1. **Big-Data Real-Time Analytics Pipeline** (Feb–Apr 2025) — Lambda
   architecture unifying real-time + batch for cryptocurrency analytics;
   Kafka + Spark Structured Streaming; low-latency reads via Cassandra.
   Tech: Java, Spark, Kafka, Cassandra.
2. **Secure Cloud Storage with Facial Recognition** (Dec 2023 – Apr 2024) —
   Encrypted file storage with AES per-file encryption + facial-recognition
   access layer, >95% accuracy on 5,000 images. Tech: Python, TensorFlow,
   OpenCV.
3. **Flaky-Test Auto-Repair (research)** — distilled from the Concordia work as
   a third card (LLM-based classification/repair across 400 Maven projects).

### Skills
- **Programming:** JavaScript, React, Python, Java, PHP, SQL, Bash
- **AI & Data:** LLMs, Prompt Engineering, TensorFlow, Agentic Workflows, Spark,
  Kafka, Redshift, ETL Pipelines
- **Infrastructure & Tools:** Software Architecture, Retool, Docker, MCP
  Servers, Kubernetes, AWS, Git, Linux, Databricks
- **Languages:** English (Fluent), French (Fluent), Arabic (Native), German
  (Basic)

### Recognition & leadership
- **SupClay** (co-founder, eco-friendly construction materials) — Best Company
  of the Year + PMIEF Project Excellence Award, Injaz Al-Arab YEC 2023, Doha.
- **First Global Challenge** (robotics) — Silver medal, Team Tunisia, Washington
  D.C.; mentored 6 national teams over 6 years.
- **IAESTE** — Developer & Team Lead; led a 10-person team building a student
  subscription platform.

### Assets
- **Photo:** `~/Downloads/notion site/Sami Masmoudi/7157823f-…-c285.png`
  (dev-desk selfie). Used **only in About**, cropped + duotoned to the theme.
  Hero stays photo-less.

## 3. Art direction

- **Mood:** dark, cinematic, confident. Near-black canvas, warm off-white type,
  a single **warm amber** accent.
- **Signature element:** an interactive **3D point-cloud** hero (particles that
  drift, can morph between scatter → sphere → the initials "SM", and are
  repelled by the cursor). A genuine nod to data systems / AI / point clouds.
- **Type:** big, kinetic display typography for the name; clean body; monospace
  for labels/tags (stack chips, section numbers).
- **Motion philosophy:** motion serves hierarchy — reveals, a magnetic CTA, an
  animated timeline. Never decorative noise. Fully disabled under
  `prefers-reduced-motion`.

### Design tokens (initial — tunable in implementation)
- `--bg`: `#0B0A09` (warm near-black); `--surface`: `#16130F`;
  `--surface-2`: `#1E1A15`.
- `--text`: `#F3EEE6` (warm off-white); `--text-muted`: `#A8A199`.
- `--accent`: `#FFB454` (warm amber); `--accent-strong`: `#FF9E1B`;
  `--accent-glow`: amber at low alpha for halos.
- Type: **Space Grotesk** (display/headings) · **Inter** (body) · **JetBrains
  Mono** (labels). All free, self-hosted via `@fontsource`. *Optional upgrade:*
  Clash Display for the hero name.
- Spacing scale 4/8-based; generous section padding; max content width ~1100px
  with full-bleed hero.

## 4. Information architecture (single page)

Sticky/anchored nav: **About · Work · Projects · Skills · Contact** + a
persistent **Download CV** button.

1. **Hero** — point-cloud canvas + kinetic name + tagline + CTAs (View work ·
   Download CV) + scroll cue.
2. **About** — tightened bio in Sami's voice; focus areas; languages; treated
   photo.
3. **Experience** — vertical animated timeline; each role: company, title,
   dates, location, impact bullets, stack chips.
4. **Projects** — feature cards (3): pipeline, secure storage, flaky-test
   research. Each: title, summary, tech chips, optional link.
5. **Skills** — three grouped columns (Programming / AI & Data / Infrastructure)
   + languages row.
6. **Recognition** — SupClay, First Global robotics, IAESTE (compact cards).
7. **Contact** — email link + LinkedIn/GitHub buttons + CV download; short
   friendly closing line.
8. **Footer** — copyright, "built with Astro + three.js", back-to-top.

## 5. Technical architecture

- **Framework:** Astro (static output). Zero JS shipped except the hero island.
- **Hero:** vanilla TypeScript module + **three.js**, mounted to a `<canvas>`
  via an Astro `<script>` (no React dependency needed). Additive-blended
  `Points`, soft sprite, cursor repel, shape morph via GSAP timeline.
- **Scroll motion:** **GSAP + ScrollTrigger**, imported only in the components
  that use it. Intersection-based reveals; scrub-linked particle morph optional.
- **Content:** typed data modules in `src/data/*.ts`. Components render from
  data — editing a job/project means editing one object.
- **Styling:** CSS custom properties (tokens) + component-scoped styles. No
  heavy UI framework. (Tailwind optional; default is plain CSS for control.)

### Project structure
```
samiimasmoudii.github.io/            # local folder name may differ; remote repo matters
├─ .github/workflows/deploy.yml      # Astro → GitHub Pages
├─ public/
│  ├─ Sami-Masmoudi-CV.pdf
│  ├─ favicon.svg                    # SM monogram
│  └─ og.png                         # social preview
├─ src/
│  ├─ layouts/Base.astro             # <head>, meta/OG, fonts, global styles
│  ├─ pages/index.astro              # composes sections
│  ├─ components/
│  │  ├─ Nav.astro  Hero.astro  About.astro  Experience.astro
│  │  ├─ Projects.astro  Skills.astro  Recognition.astro  Contact.astro
│  │  └─ Footer.astro
│  ├─ scripts/pointcloud.ts          # three.js hero
│  ├─ scripts/reveal.ts              # GSAP scroll reveals
│  ├─ data/ site.ts experience.ts projects.ts skills.ts recognition.ts
│  └─ styles/ tokens.css  global.css
├─ astro.config.mjs                  # site: https://samiimasmoudii.github.io
├─ package.json  tsconfig.json  README.md
```

## 6. Performance & accessibility

- **Reduced motion:** `prefers-reduced-motion` freezes particles into a static,
  artful still and makes reveals instant.
- **Mobile:** fewer particles (perf-scaled by device/width); if WebGL
  unsupported, fall back to a static gradient/point still. Layouts fully
  responsive.
- **A11y:** semantic landmarks, skip link, visible focus states, aria labels,
  AA contrast on text, keyboard-navigable nav.
- **SEO/meta:** title, description, Open Graph + Twitter card, JSON-LD `Person`,
  self-hosted fonts (no layout shift), optimized images.
- **Target:** Lighthouse ≥ 95 performance & accessibility on desktop.

## 7. Deployment

- **Repo:** GitHub user site named **`samiimasmoudii.github.io`** → served at
  `https://samiimasmoudii.github.io` (root, no base path).
- **CI:** `.github/workflows/deploy.yml` using `withastro/action` +
  `actions/deploy-pages`; Pages source = GitHub Actions; build & deploy on push
  to `main`.
- **Custom domain:** not now; add a `CNAME` + DNS later if desired.

## 8. Open decisions / confirmations before launch

1. **Email:** confirm `samiimasmoudii2@gmail.com` (CV) vs
   `samiimasmoudii@gmail.com` (Notion).
2. **Photo treatment:** confirm the dev-desk selfie is OK to use (duotoned) in
   About, or a better headshot will be supplied.
3. **GitHub repo:** confirm the `samiimasmoudii.github.io` repo will be created
   (empty) so CI can push to it.

## 9. Build phases (high level — detailed in the implementation plan)

1. Scaffold Astro project + tokens + base layout + fonts.
2. Content data modules from this spec.
3. Static sections (Nav, About, Experience, Projects, Skills, Recognition,
   Contact, Footer) — responsive, accessible, no motion yet.
4. Point-cloud hero (three.js) with repel + morph + reduced-motion/mobile
   fallbacks.
5. Scroll motion (GSAP) + polish pass (design skills).
6. Meta/OG/favicon/CV asset + Lighthouse/a11y pass.
7. GitHub Actions deploy + go live.
