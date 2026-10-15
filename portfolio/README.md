# Portfolio site — "Dossier"

The portfolio site, living entirely inside this folder. **Nothing in the
original site was modified.** The only file changed outside `portfolio/` is
`.claude/launch.json`, which gained a second dev-server entry.

## Running it

From the repository root:

```bash
npm run dev --prefix portfolio
```

Dev server: <http://localhost:5273> (the original site keeps port 5173, so both can run at once).

```bash
npm run build --prefix portfolio
```

**Nothing is installed here on purpose** — Node resolves `react`, `gsap`, `vite`,
`tailwindcss` and the rest by walking up to the parent project's install. No second
dependency tree, no duplicated disk. (Vite does write a `node_modules/.vite/` pre-bundling
cache in this folder at dev time; it is disposable — delete it freely.)

## The design system

Generated with the `ui-ux-pro-max` skill and persisted to
`design-system/ifthekhar-portfolio-portfolio/MASTER.md`. Headline decisions:

| Layer | Choice | Source |
|---|---|---|
| Pattern | Portfolio Grid — Hero → Proof → Work grid → Experience → Capabilities → Contact | `--domain landing` |
| Style | Brutalist-leaning editorial: 0px radii, 2px rules, a visible grid | `--design-system` |
| Type | Space Grotesk (display) · Archivo (body) · JetBrains Mono (labels) | `--domain typography` |
| Colour | Monochrome + a single blue accent, light **and** dark | `--domain color` |
| Motion | Scroll stagger, 420ms, `back.out(1.4)` | `--motion 6` |

The searched palette came back light-only (`#FAFAFA` / `#09090B` / `#2563EB`). Dark is a
deliberate re-map rather than an inversion — the accent lifts to `#60A5FA` because `#2563EB`
only reaches 3.3:1 on a near-black background.

### Tokens

All colour lives in CSS custom properties in `src/index.css`, under `:root` and
`[data-theme='dark']`. Tailwind reads them via `tailwind.config.js`, so `bg-card`,
`text-muted-fg` etc. stay theme-correct. **Change a colour in one place only.**

Theme is chosen by an inline script in `index.html` before first paint (no flash),
persisted to `localStorage`, and falls back to `prefers-color-scheme`.

## Content

Every fact on the page comes from `src/data/content.js` — one export per section. To update
the site, edit that file; no component needs touching.

## Verified

Measured against the skill's pre-delivery checklist, driving headless Chrome over CDP:

- **Contrast** — all text pairs ≥ 4.5:1 in both themes (body 7.3:1 light / 7.7:1 dark)
- **Keyboard** — skip link is the first tab stop; every stop shows a 3px focus ring
- **Targets** — nav and footer links are ≥ 44px with no overlapping hit areas
- **Type** — no text below 12px
- **Responsive** — no horizontal overflow at 375 / 768 / 1440
- **Reduced motion** — all 41 reveal targets render at full opacity, marquee stops
- **Console** — no site-origin errors
- **Semantics** — one `h1`, labelled `nav` landmarks, decorative icons `aria-hidden`

## Layout

```
portfolio/
├── index.html              theme bootstrap + font preconnect
├── src/
│   ├── index.css           tokens, editorial primitives, motion
│   ├── data/content.js     all copy and figures
│   ├── lib/useReveal.js    GSAP scroll stagger (reduced-motion aware)
│   └── components/         Nav · Hero · Proof · Work · Experience ·
│                           Capabilities · Contact · Footer · SectionHead · BrandIcons
└── design-system/          persisted MASTER.md from the skill
```

`BrandIcons.jsx` exists because `lucide-react` v1 dropped brand marks — there is no
`Linkedin` export in the installed version.
