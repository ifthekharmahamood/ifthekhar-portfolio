# Project context

Running summary of website updates. Newest session first.
See `guardrails.md` for the standing rules governing this repository.

## What this project is

A personal portfolio for Ifthekhar Enad Mahamood, Product Manager.

**The live site is `portfolio/`** — green/cream palette, served on port 5273:

```
npm.cmd run dev --prefix portfolio
```

The abandoned root site (`src/`, `index.html`, `public/`) was **deleted** —
it carried retracted claims (20M+ downloads, "40% faster onboarding", GPA 4.00).
Port 5173 no longer serves anything. The root `package.json`/`node_modules`
must survive any cleanup.

`portfolio/` deliberately has **no `node_modules` of its own** — Node resolves
`react`, `gsap`, `vite` by walking up to the parent install. Do not run
`npm install` inside it.

Live files in `portfolio/src`: `Portfolio.jsx`, `ProductJourney.jsx`,
`PortfolioSections.jsx`, `ResumePreview.jsx`, `portfolio.css`,
`product-journey.css`, `data/portfolio.js`, `data/resume.json`.

---

## Session — 15 October 2026 (seventeenth pass)

**Added the Bohubrihi "Digital Product Management" certification** (March 2024)
with its seven skills, linking to the Cloudinary PDF. URL checked: HTTP 200,
`application/pdf`, 119 KB.

Skills render as chips under the certification, mirroring the Projects
treatment in Experience — `.cert-skills` copies `.timeline-projects` rule for
rule (same left rule, same uppercase label, same cream chip on sage), so the
two sections read as one system rather than two inventions.

Skill order was changed from the LinkedIn screenshot's: the four "Product ..."
entries are grouped first, then methodology, testing and post-launch. All seven
are present; only the sequence differs.

**Grid fix.** Three cards in a two-column grid left the tall new card stranded
beside an empty cell — the same dead-space problem flagged in Experience the
pass before. `.certification-list article:has(.cert-skills)` spans both
columns, so the chips fit on one row instead of three and the card is 291px
rather than 333px. `:has()` is Chrome 105+/Safari 15.4+/Firefox 121+; where it
is unsupported the card simply stays single-column, which still reads fine.

Position is correct without intervention: March 2024 sits last under the
newest-first convention already used by Experience and Education.

Verified at desktop, tablet and phone: all three certifications render, 7 chips
present, zero overflow, zero console errors, the new link carries
`rel="noreferrer"`, build passes.

---

## Session — 15 October 2026 (sixteenth pass)

**Experience timeline now uses the full container width.** `.timeline-text` was
capped at `max-width:660px` and `.timeline-points` at `720px`, while the
surrounding `.container` runs to 1240px — leaving **456px of unused space** on
the right at 1512px. Both caps removed; `.timeline-body` already extended to
the container edge, so nothing else needed changing.

Measured after: the bullets' right edge matches the nav's right edge exactly
(`gap = 0`) at 1920, 1512, 1280, 1100, 900, 768 and 390px. Most bullets now
set in two lines rather than three, so the section is shorter as well as wider.

**Not** `text-align:justify`. The request said "justified", but CSS justify
stretches word spacing to force both edges flush, which opens uneven rivers of
whitespace in ragged technical copy and reads worse. The red line in the
supplied screenshot marked where the text should *reach*, which is a width
problem, not an alignment one. Flagged to the owner with the reasoning.

Known trade-off: lines now run ~127 characters at 1512px, above the 75-85
typographic comfort range. Acceptable here because these are scannable
resume bullets, not continuous prose, and the owner asked for the full width
explicitly. Easy to revisit by reinstating a cap around 900-1000px.

---

## Session — 15 October 2026 (fifteenth pass)

**Hobby icons replaced with supplied SVGs.** Six files in
`portfolio/public/images/hobbies/` (books, photography, travelling, soccer,
camping, cycling), each 64x64 with the site palette already baked in —
`#243E32` stroke, `#CBDCC4` fill. Total 4.3 KB.

Mapped **by hobby name, not array index** (`hobbyIcons` is now an object), so
reordering `hobbies` can no longer silently pair a hobby with the wrong icon —
which is exactly what had happened before: Soccer was showing a volleyball.

Dropped the six now-unused lucide imports; JS bundle fell 1.4 KB.

**One real bug found and fixed during verification.** The icons were initially
given `loading="lazy"`. They rendered blank — the labels appeared, 44x44 of
space was reserved, and nothing drew. Network tracing showed **no requests were
ever made**. For six files totalling 4.3 KB in a section users reach by
scrolling, lazy loading saves nothing and costs correctness, so the attribute
was removed. After that all six request, return 200 and paint.

Worth recording: the first probe reported `loaded:false` and I initially
dismissed it as the same lazy-load timing artifact seen with the Shuttle image
in an earlier pass. The screenshot proved otherwise — the icons really were
blank. The isolated `new Image()` test passing (64x64) is what separated "file
is broken" from "page never asks for the file".

SVGs are left unoptimised on purpose: they are vector text, already smaller
than any raster equivalent, and the WebP pipeline has nothing to do with them.

Verified: all six load at 64x64 natural / 44x44 painted on desktop, tablet and
phone; zero overflow; zero console errors; all six copied into `dist/`.

---

## Session — 15 October 2026 (fourteenth pass) — full pre-publish audit

**Untracked, kept on disk:** `PORTFOLIO_REVIEW.md` (internal design critique
that analyses the resume) and `design-exploration/` (7 early concept files).

**Deleted — stale or AI-tooling artifacts.** 55 tracked files down to 32:

- `portfolio/README.md` described a site that no longer exists — Space Grotesk
  fonts, a blue accent, dark mode, Tailwind, `src/index.css`, `data/content.js`,
  a `components/` folder, `BrandIcons.jsx`. Every one of those was verified gone
  before deleting. It also named the AI skill that generated it.
- `portfolio/design-system/.../MASTER.md` — "Generated: 2026-08-30",
  "Design Dials: Variance 6/10", "Category: Marketing Agency".
- `portfolio/design-qa.md` — referenced `D:/Professional/...`, another machine.
- `portfolio/IMPLEMENTATION.md` — stale (claimed seven-second stages, now 3s;
  described the removed chapter rail) and written as an AI status report.
- `portfolio/qa/` (5 scripts + 3 result dumps) — all referenced deleted files;
  `verify.mjs` still tested `chapter-rail`. None were wired into npm scripts.
- Both `.claude/launch.json` files — agent config, root one had a dead 5173 entry.

**Dead CSS removed:** 977 bytes of `.chapter-rail`/`.rail-label` rules (the
side navigation removed several passes ago) plus 17 orphaned classes
(`.hero-art`, `.about*`, `.now*`, `.career-stories`, `.scroll-cue` and others),
each confirmed absent from markup and JS first. CSS 37.13 kB -> 33.50 kB.

**Responsive work, measured at 13 viewports from 360px to 1920px:**

- **12px minimum font size.** 22 CSS declarations and all 12 SVG diagram labels
  were between 9px and 11.5px. SVG text re-checked against its viewBox after.
- **44px touch targets** via `@media(pointer:coarse)`, so desktop proportions
  are untouched. Verified with real coarse-pointer emulation: 8 undersized
  controls down to 0.
- **Nav no longer wraps.** At 1024px the links broke across three lines
  mid-label. Added `white-space:nowrap`, then measured the real requirement:
  **1114px**, so the breakpoint is 1290px. An earlier 638px measurement was
  wrong — it was taken after the links had already wrapped, which under-reported
  the need. The hamburger is correct on iPads; verified it opens, lists all 9
  links and closes on selection.
- **`h1` is now monotonic.** It previously *shrank* as the screen grew: 67.6px
  at 768px but 56px at 801px, pinned flat to 1024px. Cause was four stale
  `.hero h1` overrides in `product-journey.css` left from when the journey panel
  sat in the hero, plus a separate curve above 1101px that ran below the main
  one. Removed the overrides and aligned the curves. Also dropped the dead
  `.hero{min-height:830px}` from the same era.

**Verified clean:** zero horizontal overflow at all 13 viewports, zero console
errors, zero network failures, all images have alt text, one `h1`, skip link
present, every in-page anchor resolves, all external links carry `rel`, case
dialog opens and returns focus to its trigger on Escape, resume preview still
hides the phone number while the download keeps it.

**One contrast "failure" is a false positive.** `.timeline-promotion` reports
1.00:1 because its background is `rgba(46,95,69,.08)` and the probe cannot
composite alpha. Computed by hand: 5.62:1 on sage, 6.07:1 on cream — passes AA.

---

## Session — 15 October 2026 (thirteenth pass) — prepared for publishing

**`redesign/` renamed to `portfolio/`.** Done with `git mv` so all 40 files keep
their history. The dev server held a lock on the folder and had to be stopped
first. Every path reference was updated across 15 files (`package.json`, the
`qa/*.mjs` scripts, `.claude/launch.json`, `.gitignore`, both READMEs,
`IMPLEMENTATION.md`, `PORTFOLIO_REVIEW.md`, this file). Remaining occurrences of
the word "redesign" are prose describing the design history, not paths.

Verified after the rename: production build passes, dev server runs on 5273,
all nine nav links and eleven sections present, headshot and all three Selected
Work images decode (Shuttle confirmed by scrolling it into view — it is
`loading="lazy"`, so an early probe reporting `0x0` was the lazy loader working
as intended, not a broken asset), zero console errors.

**`Master_Resume.docx` untracked** (`git rm --cached`) and added to
`.gitignore`. It stays on disk as the private working copy. It was never
pushed, so it exists in no remote history. The public resume downloads in
`portfolio/public/` remain tracked on purpose — they are the download button.

**Root `README.md` rewritten** as the repository front page: who he is,
availability, selected work with outcomes, experience, and contact links, with
the build instructions kept lower down. The previous README opened with build
commands, which is the wrong first impression for a public portfolio repo.
Facts were checked against `data/portfolio.js` rather than written from memory —
this caught two errors in my first draft (ACI Motors Ltd is the full name, and
the career path is PM at Kite Games and Fashol with a separate Management
Trainee to Product Specialist promotion at Shuttle, not one continuous ladder).

**Fixed a pre-existing duplicate React key.** Both Beauty Editor metrics in
Impact share the label `'Beauty Editor: Photo Retouch'`, so `key={metric.label}`
collided and React warned in the console. Now keyed on label + metric. This
dated from the metric swap in an earlier pass; the rename only surfaced it.

**Still outstanding before going public:** `PORTFOLIO_REVIEW.md` (92 lines) is
an internal design critique that analyses the resume and critiques earlier
versions. It is still tracked and would be public. Flagged to the owner,
not removed.

---

## Session — 15 October 2026 (twelfth pass)

**Nav label `Work` renamed to `Products`.** Sitting beside `How I Work`, the two
shared a word and read as one idea split in two, even though they answer
different questions: `#projects` holds three shipped products with real users
and metrics (Time Warp Scan, Beauty Editor, Shuttle Partner App), while
`#how-i-work` holds the six-stage PM method and contains no products at all.
`Products` is the concrete word for shipped artifacts and carries no
expectation about write-up length.

Nav only — the section heading stays **Selected Work**, which has room to be
warmer than the bar. The two are separate strings (`Portfolio.jsx:12` vs the
`work-title` h2), so they can differ deliberately.

Verified at 1512/1366/1280/1200/1101px: single row, consistent 19px gaps
between links, 30px before the Resume button, no overlap and no overflow.

---

## Session — 15 October 2026 (eleventh pass)

**Top nav order corrected.** The nav array still listed
`Projects, How I Work, Experience, Education, ...` from before Experience and
More Projects were swapped, so the bar skipped More Projects entirely and its
order no longer matched the page. Two changes in `Portfolio.jsx:12`:

- Added `['More Projects', '#more-projects']` between Experience and Education,
  its true position in the document.
- Renamed `Projects` to `Work` so the label matches its heading
  (`Selected Work`) and no longer reads as a near-duplicate of More Projects.

The nav array is also what drives the scroll-spy (`Portfolio.jsx:103` maps it to
section nodes), so the missing entry meant no nav item lit up while More
Projects was on screen. Both are fixed by the same edit.

Verified at 1512/1366/1200/1100px: all nine links resolve, their targets ascend
in document order, the bar does not overflow, and the scroll-spy highlights
exactly one correct item in every section.

Also corrected a stale line above — this file still described the root `src/`
as a live abandoned version on port 5173; it was deleted in an earlier pass.

---

## Session — 15 October 2026 (tenth pass)

- **Selected Work CTA** is now "See how I did it" on all three cards, replacing
  "Explore the case study". One shared string, so the three cannot drift.
- **Case panel kicker** added: "Project snapshot - 1 min read", confirming
  what the button promised. Checked the claim rather than assuming it: the
  three case studies run 95, 100 and 111 words, so all are genuinely under a
  minute. `.case-top` switched to `align-items:flex-start` since its left
  side is now two lines.
- **Time Warp outcome rewritten** to "When I left in December 2024, the app
  had 5M+ downloads, a 4.0 rating and 23,600+ reviews." The previous wording
  hedged about resume figures versus live store statistics.
- **Experience and More Projects swapped.** Career history now precedes the
  smaller projects, which is the order a PM recruiter screens in. Experience
  keeps its full length at the owner's direction.

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
- Initialised git (no remote). Added `portfolio/dist`, `portfolio/node_modules`
  and vite caches to `.gitignore` so build output is never tracked.
- Added `guardrails.md` and this `context.md`.
- **Removed the abandoned root site** (`src/`, `index.html`, `public/`,
  `dist/`, and the root vite/tailwind/postcss/eslint configs). The root
  `package.json` and `node_modules` stay — they are the dependency source
  `portfolio/` resolves against. Port 5173 no longer serves anything.
- Removed 13 unimported files from `portfolio/src` (the old `components/`
  directory, `data/content.js`, `index.css`, `lib/useReveal.js`) plus
  `portfolio`'s unused tailwind/postcss configs.
- Deleted six orphaned PNGs (~10.6MB) that nothing referenced.

### Layout and content
- **Lifecycle panel** moved out of the hero into its own **Process** section
  between Impact and Selected Work; added to the nav.
- **Hero right column** now holds a headshot frame. It shows a labelled
  placeholder until a photo exists at `portfolio/public/images/headshot.jpg`,
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
- Added `portfolio/scripts/optimize-images.mjs`. It encodes a visually-lossless
  WebP beside every PNG/JPEG in `public/images` **at the original pixel
  dimensions**, and discards the result if it fails to beat the original.
  Encoding runs in headless Chrome, so there is no npm dependency.
- It runs automatically on `npm run build`, and on demand:

  ```
  npm.cmd run optimize:images --prefix portfolio          # new/changed only
  npm.cmd run optimize:images:force --prefix portfolio    # re-encode all
  ```

- A `Picture` component in `Portfolio.jsx` serves the WebP with the original
  as a `<picture>` fallback, so nothing breaks where WebP is unsupported.
- Result: the three artwork files went 5,500KB → 409KB (-93%) with identical
  1448x1086 dimensions. `dist/` fell from 17MB to 6.3MB, and a browser now
  downloads ~409KB of imagery instead of ~5.4MB.

### Uploading media
Drop files into `portfolio/public/images/`. The headshot must be named
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
