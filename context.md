# Project context

Running summary of website updates. Newest session first.
See `guardrails.md` for the standing rules governing this repository.

## What this project is

A personal portfolio for Ifthekhar Enad Mahamood, Product Manager.

**The live site is `redesign/`** — green/cream palette, served on port 5273:

```
npm.cmd run dev --prefix redesign
```

The root `src/` (port 5173) is an **abandoned earlier version** in a dark
charcoal/yellow palette. It still contains retracted claims (20M+ downloads,
"40% faster onboarding", GPA 4.00) and must never be published.

`redesign/` deliberately has **no `node_modules` of its own** — Node resolves
`react`, `gsap`, `vite` by walking up to the parent install. Do not run
`npm install` inside it.

Live files in `redesign/src`: `Portfolio.jsx`, `ProductJourney.jsx`,
`PortfolioSections.jsx`, `ResumePreview.jsx`, `portfolio.css`,
`product-journey.css`, `data/portfolio.js`, `data/resume.json`.

---

## Session — 15 October 2026 (ninth pass)

Hero simplified on the owner's direction — it had accumulated three competing
elements under the buttons.

- **Lifecycle teaser removed from the hero.** It was the busiest item and
  duplicated the "How I Work" section that explains each step properly. The
  section keeps its nav entry and its place after Selected Work.
- **Availability moved above the name**, replacing the "Product Manager"
  eyebrow: a small green dot plus "Available Dec 2026 - PM and APM roles".
  Recruiters read it first.
- **Status and location merged into one quiet line** under the buttons:
  "Beaumont, TX - Open to relocation", 15px muted. The pill styling is gone.
- **Scroll cue removed** and the hero tightened: the old `min-height:830px`
  and 115px bottom padding were sized for the taller stack and left 197-275px
  of dead space. Now 44-84px on desktop.
- On screens under 620px the eyebrow's wide letter-spacing made the
  availability label wrap mid-phrase and strand its separator, so tracking
  tightens there. Single line at 360, 390 and 430px.
- Removed the now-orphaned CSS for the teaser, status row, pill and cue.

---

## Session — 15 October 2026 (eighth pass)

- **Availability stated explicitly** in the hero: a pill reading "Seeking
  Product Manager & APM roles - From Dec 2026", with the location beside it on
  the same row. Previously availability was only inferable from a small
  "Expected Dec 2026" date. The pill and location share a row so the lifecycle
  teaser stays above the fold; verified at six desktop sizes.
- **Real artwork for the remaining two stories.** Time Warp Scan and Shuttle
  Partner App arrived at 1448x1086, already 4:3, and optimised to 86KB and
  78KB. Both carry descriptive `imageAlt`. All three Selected Work images are
  now genuine product shots.
- Removed a stray unreferenced `time-warp-scan-case-study.webp`.
- Total imagery on first load is now ~334KB.

---

## Session — 15 October 2026 (seventh pass)

**How I Work was buried.** Measured at 82% down a 13.3-screen page — a
recruiter had to scroll 10.9 screens to reach it. Two changes:

- **Hero teaser.** A compact pill listing the six stage names, linking to the
  full section. The stage names are imported from `ProductJourney.jsx` rather
  than retyped, so the teaser cannot drift out of sync. Verified above the
  fold at 1920x1080, 1440x900, 1440x780, 1366x768, 1280x720, 900x800 and
  390x844, with the CTAs still visible.
- **Section moved** from after Awards to directly after Selected Work:
  82% -> 25% down the page (10.9 -> 3.3 screens). Nav order follows.
- Short-viewport rules compress the hero below 820px and 740px tall, since
  1366x768 and 1280x720 laptops otherwise pushed the teaser below the fold.
- Dropped the `border-top` on the section: it separated two cream bands when
  it followed Awards, and Selected Work above it is sage.

---

## Session — 15 October 2026 (sixth pass)

- **"Concept illustration" caption removed** from Selected Work, along with
  its now-orphaned CSS.
- **Real Beauty Editor artwork supplied** by the owner (1448x1086, already
  4:3). Optimised 891KB -> 77KB at full resolution. Given a descriptive
  `imageAlt` for screen readers, since there is no caption now.
- Time Warp Scan and Shuttle Partner App still use the conceptual artwork;
  the owner is supplying those next. Each needs an `imageAlt` when it lands.

---

## Session — 15 October 2026 (fifth pass)

- **Stage duration cut from 7s to 3s** in How I Work. The inner content
  animations had to come with it: the checklist stagger finished at ~1.6s and
  the outcome line waited until 1.8s, which left almost no reading time in a
  3s stage. The stagger now completes by ~1.0s. Measured in the browser at a
  3,033ms average advance.
- **Selected Work images renamed** to predictable filenames the owner can
  drop in directly: `time-warp-scan.png`, `beauty-editor.png`,
  `shuttle-partner-app.png` (was `*-green-cream.png`).
- The "Concept illustration" caption and the image `alt` are now data-driven:
  set `concept: false` and `imageAlt` on a story in `data/portfolio.js` when a
  real product screenshot replaces the conceptual artwork.

---

## Session — 15 October 2026 (fourth pass)

- **Stage diagrams were invisible below 1000px.** The diagrams rendered
  correctly, but the `min-width:1000px` gate was set too conservatively: at
  999px the card is already ~809px wide with clear room beside it, so any
  laptop or un-maximised window lost them entirely. The gate is now 860px,
  with a smaller diagram share between 860 and 1100px.
- **Fixed hero text running under the portrait between 801 and 1100px.**
  A stale rule in `product-journey.css` (`.hero{display:block}` plus
  full-width copy) dated from when the journey panel lived inside the hero.
  The panel has since moved to "How I Work", so the hero holds a portrait on
  the right and the copy now stops 415px short of the viewport edge.
  Verified clear at 801, 820, 860, 900, 960, 1024, 1100, 1200, 1250, 1440.

---

## Session — 15 October 2026 (third pass)

- **Impact metric labels aligned.** Each label is now two lines: the product
  name, then the metric word on its own line (`metric` field in
  `outcomes`, rendered as a block-level span). Previously the longer Beauty
  Editor labels wrapped while "Time Warp Scan downloads" did not, so the
  three sat at different heights. Metric words are capitalised: Downloads,
  Reviews, Downloads. Verified identical line tops and heights at 1440,
  1100, 900 and 760px; below 800px the grid is single-column by design.
  The `spoken` aria-labels still read as natural sentences.

---

## Session — 15 October 2026 (second pass)

- **Impact heading fixed.** It had been rendering at 12px because the original
  "A few outcomes" label kept `className="eyebrow"` when its text changed to
  "Impact". It is now a normal section heading at 62px, matching every other
  section title. No deliberate reason for the old size — a leftover.
- **Metrics 2 and 3 swapped**: reviews (4.4*) now precedes downloads (100K+).
- **Selected Work reordered** to Time Warp Scan, Beauty Editor, Shuttle
  Partner App. Fixing this exposed a numbering bug: the reorder left empty
  array slots, so the eyebrows read 02/03/05 and collided with More Projects.
  The sequence now runs 01-09 across both sections.
- **"Process" renamed "How I Work"** and moved to sit after Awards &
  Scholarships, before Hobbies. Its padding was retuned, since it previously
  flowed directly out of Impact and now follows another cream section.
- **Per-stage diagrams added** to fill the empty right half of that section:
  `src/JourneyVisuals.jsx`, one inline SVG per lifecycle stage (converging
  signals, prioritised backlog, prototype flow, delivery board, staged
  rollout, outcome vs. goal). Inline SVG rather than image files so the set
  costs no extra request, stays sharp at any resolution, and matches the
  palette. They appear at >=1000px and are hidden on narrower screens.
- **Removed the "Experience ->" chapter link** under More Projects. It was
  redundant: the Experience heading follows immediately on scroll.
- **External links added**, all opening in a new tab with `rel="noreferrer"`:
  employers in the timeline (Lamar, Kite Games, Fashol, Shuttle, ACI Motors),
  both schools, both SAP certifications (verification URLs), and the GitHub
  repository on the Customer Purchase Analysis case study.
- **ACI Motors added** to the timeline: Network Development Intern,
  Jan 2021 - Apr 2021, placed last as the earliest role.
- **Shuttle project tags corrected**: Product Specialist now shows Shuttle
  Partner App, Partner ERP, Driverkoi; Management Trainee shows Jatrikoi,
  Shuttle Website, Internal Reporting Panel.

---

## Session — 15 October 2026

- **Headshot placed.** Owner supplied `headshot.png` (1254x1254). Quality was
  already good, so no upscaling was needed. Pointed the markup at `.png`
  (it had expected `.jpg`) and set `object-position: 50% 18%` so the square
  source crops to the 9:11 frame on the face rather than the chest.
  Optimised to WebP: 1952KB -> 171KB at full resolution.
- **"Say hello" fixed.** The markup and `mailto:` href were correct; the
  failure is environmental — a `mailto:` does nothing when the visitor has no
  desktop mail client registered, which is common on Windows with webmail. A
  new `MailLink` component tries the mail client first and falls back to
  Gmail's compose window in a new tab.
- **Phone number removed from the resume popup only.** It is stripped from
  `resume.json`'s contact line; the downloadable .docx still contains it, so
  anyone who downloads the resume gets the full original.
- **Impact metrics replaced**: "+21% Beauty Editor core retention" and
  "40% Lower Shuttle onboarding cost" are now "100K+ Beauty Editor: Photo
  Retouch downloads" and "4.4* Beauty Editor: Photo Retouch reviews".
- **Journey loop text trimmed**: removed "Ship. Learn. Build better." and
  "A continuous loop, never just a straight line." The remaining line keeps
  its position and grew from 12px to 16px.

---

## Session — 14 October 2026

### Repository setup
- Initialised git (no remote). Added `redesign/dist`, `redesign/node_modules`
  and vite caches to `.gitignore` so build output is never tracked.
- Added `guardrails.md` and this `context.md`.
- **Removed the abandoned root site** (`src/`, `index.html`, `public/`,
  `dist/`, and the root vite/tailwind/postcss/eslint configs). The root
  `package.json` and `node_modules` stay — they are the dependency source
  `redesign/` resolves against. Port 5173 no longer serves anything.
- Removed 13 unimported files from `redesign/src` (the old `components/`
  directory, `data/content.js`, `index.css`, `lib/useReveal.js`) plus
  `redesign`'s unused tailwind/postcss configs.
- Deleted six orphaned PNGs (~10.6MB) that nothing referenced.

### Layout and content
- **Lifecycle panel** moved out of the hero into its own **Process** section
  between Impact and Selected Work; added to the nav.
- **Hero right column** now holds a headshot frame. It shows a labelled
  placeholder until a photo exists at `redesign/public/images/headshot.jpg`,
  then swaps in automatically with no code change.
- **Chapter rail removed**, replaced by a floating back-to-top button that
  appears after roughly one viewport of scroll.
- **Section titles reduced to plain names** — Impact, Process, Selected Work,
  More Projects, Experience, Education, Certifications, Awards & Scholarships,
  Hobbies, Contact. The decorative sub-headlines were removed.
- **Experience rebuilt as a scroll-tracked vertical timeline**: a hairline
  spine, numbered markers that fill as each role reaches reading height, and a
  progress line that follows the scroll.
- **"Learning in practice" merged** into that timeline by date; the separate
  block is gone.
- **Shuttle split** into Management Trainee (Jun 2021 – Jun 2022) and Product
  Specialist (Jun 2022 – Sep 2023), with a promotion badge on the later role.
- Each role gained a context blurb, detailed bullets from the master resume,
  and a **Projects box** tagging the work shown elsewhere on the page.
- **Impact → Process spacing** tightened from 157px of stacked padding to 52px;
  both sections are cream, so the gap read as dead space.
- **Back-to-top**: removed the duplicate arrow link in the footer. The single
  floating button now shows its icon only while scrolling, and expands to read
  "Back to top" only once the reader reaches the very bottom of the page.

### Performance
- Added `redesign/scripts/optimize-images.mjs`. It encodes a visually-lossless
  WebP beside every PNG/JPEG in `public/images` **at the original pixel
  dimensions**, and discards the result if it fails to beat the original.
  Encoding runs in headless Chrome, so there is no npm dependency.
- It runs automatically on `npm run build`, and on demand:

  ```
  npm.cmd run optimize:images --prefix redesign          # new/changed only
  npm.cmd run optimize:images:force --prefix redesign    # re-encode all
  ```

- A `Picture` component in `Portfolio.jsx` serves the WebP with the original
  as a `<picture>` fallback, so nothing breaks where WebP is unsupported.
- Result: the three artwork files went 5,500KB → 409KB (-93%) with identical
  1448x1086 dimensions. `dist/` fell from 17MB to 6.3MB, and a browser now
  downloads ~409KB of imagery instead of ~5.4MB.

### Uploading media
Drop files into `redesign/public/images/`. The headshot must be named
`headshot.jpg` (or `.png`) — the hero swaps the placeholder for it
automatically. Then run the optimiser, or just build.

### Verified
Production build passes. Zero console errors, no horizontal overflow at ten
widths from 360 to 1920, and zero contrast failures on all new elements.

### Known outstanding
- Headshot and authentic project artwork still to be supplied by the owner.
  The current artwork is conceptual and labelled as such.
- No `og:image`, canonical URL, or JSON-LD, so link previews render bare.
- Fonts load via an `@import` inside `portfolio.css`, which cannot start until
  the stylesheet parses. Moving it to a `<link>` in `index.html` would recover
  some first-paint time.
- The nav collapses to a hamburger at 1100px, so iPad landscape (1024px) gets
  a hamburger with roughly 500px of empty header.
- `h1` is not monotonic across breakpoints: 56px at 1024px but 68px at 768px.
