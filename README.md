# Ifthekhar Enad Mahamood — Portfolio

Personal portfolio for a Product Manager. React + Vite + GSAP.

## Run it

```powershell
npm.cmd install                          # once, at the repo root
npm.cmd run dev --prefix redesign        # http://localhost:5273
npm.cmd run build --prefix redesign      # optimises images, then builds
```

The site lives in **`redesign/`**. That folder deliberately has no
`node_modules` of its own — Node resolves dependencies by walking up to the
root install, so always run `npm install` at the **repo root**, never inside
`redesign/`.

## Adding images

Drop files into `redesign/public/images/`. The hero headshot must be named
`headshot.jpg` or `headshot.png`; it replaces the placeholder automatically.

Optimisation runs as part of the build, or on demand:

```powershell
npm.cmd run optimize:images --prefix redesign          # new or changed only
npm.cmd run optimize:images:force --prefix redesign    # re-encode everything
```

Every image gets a visually-lossless WebP sibling at the **same pixel
dimensions** — nothing is downscaled — and the original is kept as a
`<picture>` fallback.

## Repository conventions

Read **`guardrails.md`** before making changes. **`context.md`** carries the
running summary of what changed and why.
