# Portfolio of Ifthekhar Enad Mahamood

Product Manager. Available December 2026 for PM and APM roles.
Beaumont, Texas — open to relocation.

This repository holds the source for my personal portfolio: the products I have
shipped, how I work as a PM, and the experience behind both.

**[LinkedIn](https://www.linkedin.com/in/ifthekhar-pm)** ·
**[Email](mailto:enadmahamood123@gmail.com)**

---

## Selected work

| Product | What it is | Outcome |
| --- | --- | --- |
| **Time Warp Scan** | Consumer camera effects app | 5M+ downloads, 4.0 rating, 23,600+ reviews as of December 2024 |
| **Beauty Editor: Photo Retouch** | Photo retouching app | 100K+ downloads, 4.4 average rating |
| **Shuttle Partner App** | Operations app for transport partners | Shipped alongside Partner ERP and Driverkoi |

Further work — Partner ERP, Jatrikoi & Driverkoi, Supplier Products, Smart
Shelf, a personal finance web app and a customer purchase analysis — is covered
on the site.

## Experience

Product Manager at Kite Games Studio and Fashol; at Shuttle, promoted from
Management Trainee to Product Specialist. Earlier, a Network Development
internship at ACI Motors Ltd. Currently completing an MS in Management
Information Systems at Lamar University, after a BBA in Management Studies from
Bangladesh University of Professionals.

## How I work

The site walks through the six stages I take a product through: Ideation,
Planning, Design, Development, Launch and Follow-up.

---

## Running the site locally

React + Vite + GSAP.

```powershell
npm.cmd install                           # once, at the repo root
npm.cmd run dev --prefix portfolio        # http://localhost:5273
npm.cmd run build --prefix portfolio      # optimises images, then builds
```

The site lives in **`portfolio/`**. That folder deliberately has no
`node_modules` of its own — Node resolves dependencies by walking up to the
root install, so always run `npm install` at the **repo root**, never inside
`portfolio/`.

### Adding images

Drop files into `portfolio/public/images/`. The hero headshot must be named
`headshot.jpg` or `headshot.png`; it replaces the placeholder automatically.

Optimisation runs as part of the build, or on demand:

```powershell
npm.cmd run optimize:images --prefix portfolio          # new or changed only
npm.cmd run optimize:images:force --prefix portfolio    # re-encode everything
```

Every image gets a visually-lossless WebP sibling at the **same pixel
dimensions** — nothing is downscaled — and the original is kept as a
`<picture>` fallback.

### Repository conventions

Read **`guardrails.md`** before making changes. **`context.md`** carries the
running summary of what changed and why.

### Layout

```
portfolio/
├── index.html
├── vite.config.js
├── public/            images, favicon, resume downloads
├── scripts/           image optimisation (runs on build)
└── src/
    ├── Portfolio.jsx          hero, impact, selected work, contact
    ├── PortfolioSections.jsx  experience, more projects, education, …
    ├── ProductJourney.jsx     the six-stage "How I Work" panel
    ├── JourneyVisuals.jsx     one inline SVG diagram per stage
    ├── ResumePreview.jsx      resume dialog
    ├── data/                  all copy and figures
    └── *.css                  styles
```

Every fact on the page comes from `src/data/portfolio.js`.
