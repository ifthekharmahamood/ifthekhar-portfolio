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
