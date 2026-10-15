# Revised portfolio design brief

The user found the first concepts too simple and provided a Google Sheet of portfolio references. This round retains professional readability while adding a stronger visual identity, substantive project imagery, and purposeful interaction.

## Reference source

[Supplied spreadsheet](https://docs.google.com/spreadsheets/d/1u_57r45GtmRHcmhV-MxIxrJkg0gYw22xXWpHPskqqKc/edit?gid=1662116125) was read through its CSV export for the requested tab. It contains portfolio URLs, qualitative comments, and indicators for blogs, testimonials, projects, and newsletters. The tab includes PM and designer portfolios, minimal sites, project galleries, and process examples. Its annotations are curation notes, not evidence that the sites still match those descriptions.

## References inspected

| Reference | Evidence and useful direction |
| --- | --- |
| [Sam Dickie](https://www.samdickie.me/) | Read current page content and inspected a captured screenshot. Rounded bento modules, varied proportions, interactive widgets, and a personal tone. Adapt the modular discovery pattern to work stories and graduate context. Do not reproduce unrelated personal widgets. |
| [Mark Progano](https://mprogano.com/) | Read page content and inspected a captured screenshot. Expressive bold/italic typography, a confident introductory statement, and a strong connection between product work and practical problems. Adapt hierarchy and personality without borrowing his copy, portrait, claims, or testimonials. |
| [Sherlaine](https://sherlaine.com/) | Read project and process content and inspected a captured screenshot. A prominent introductory media region, personal introduction, work, and process. The screenshot's media region was still loading, so it is not a reliable reference for a finished hero. |
| [Samir Timezgida](https://www.samitimez.com/) | Read page content, but screenshot showed a browser-check screen. Excluded from visual grounding. |

Other sampled older links failed or redirected. Those were not treated as inspected visual references. Screenshots were fetched through the documented public Thum.io URL API because the session exposed no interactive browser surface. The successful Sam Dickie and Mark Progano captures were opened and attached as image references to the revised image generations.

## Authentic work imagery

Inspected public Google Play promotional artwork for:

- [Time Warp Scan](https://play.google.com/store/apps/details?id=com.kgs.timewarpscan&hl=en_US)
- [Beauty Editor](https://play.google.com/store/apps/details?id=com.app.beautyeditor)

Downloaded images are retained in `references/` and attached to the concept generations. They are product artwork, not a portrait of Ifthekhar. These are current listing images, which may reflect changes after his tenure. Present-day AI features, ratings, and download changes should not be attributed to his work. The portfolio's professional claims remain grounded in the master resume.

## What changes from the first exploration

- Replace a resume-like first screen with a distinctive visual composition and recognizable project imagery.
- Establish contrast, scale, and asymmetry so sections feel designed rather than simply stacked.
- Give each interaction a purpose: inspect a project, follow a decision narrative, view professional history, download a resume, or make contact.
- Show enough project context to distinguish product management from visual design or software engineering.
- Preserve short summaries and accessible navigation so recruiters can quickly find evidence.

## Three directions

### Product Studio

Warm white, ink, vermilion, and restrained pastel project surfaces. Confident mixed typography and overlapping authentic project covers in the hero. Large asymmetrical work features put the decision and result beside imagery.

Interaction plan: staged hero entrances, project image reveals, restrained crop movement on hover, and links to factual case-study detail. Best for a polished professional presentation with visual warmth.

### Interactive Desk

Cream-gray canvas, slate type, and indigo. A curated bento layout gives the recruiter several clear entry points: Beauty Editor, Time Warp Scan, Shuttle, his approach, and his current graduate work. Different tile proportions create visual rhythm.

Interaction plan: staggered module reveals, accessible project detail overlays or expansions, subtle hover accents, and active navigation. On mobile, modules follow a deliberate reading order. No unrelated weather, music, calendar, or social-feed widgets.

### Full-screen Stories

Deep blue-black, ivory, and pale green. Large editorial type and vivid product imagery introduce the portfolio. Spacious chapters pair each product with a decision and a measured outcome.

Interaction plan: chapter progress, gentle image movement, and staged text reveals while preserving ordinary scrolling. Disable nonessential movement for reduced motion. Best for strong contrast and deeper storytelling.

## Factual content and acceptance criteria

- Hero identity: Ifthekhar Enad Mahamood, Product Manager, Beaumont, Texas.
- Education: MS in Management Information Systems at Lamar University, expected December 2026; GPA 3.88/4.00 if displayed.
- Work claims: Time Warp Scan 5M+ downloads; Beauty Editor +21% core retention; Shuttle driver onboarding cost reduced 40%; payouts processed 50% faster; Partner ERP throughput improved 20%.
- Case studies explain the documented problem, responsibility, decision, and outcome. Avoid invented testing methodology, research counts, private screenshots, fabricated charts, or testimonials.
- The resume remains the authority for graduation dates, job history, LinkedIn, and outcomes. Verify generated concept text before implementation.
- Use keyboard-accessible controls, a normal cursor, visible focus, readable contrast, sensible touch targets, and mobile-friendly layouts.
- Static mockups demonstrate visual direction; scrolling and interaction require implementation after a direction is chosen.

The existing website source remains unchanged in this exploration. Downloaded reference assets are for concept research; publication decisions belong to the implementation step.

## Generated concept files

The built-in Image Gen tool produced the three independent mockups, saved locally in displayed order:

1. `concepts/01-product-studio.png`
2. `concepts/02-interactive-desk.png`
3. `concepts/03-full-screen-stories.png`

Prompts specified the direction, 1440px desktop width, visual source roles, professional PM audience, intended scroll interactions, and the resume-grounded facts above. The mockups are not implemented websites. Generated incidental artwork and marks are conceptual, not verified photography or brand assets. The second mockup contains a generated placeholder email; the correct email is `enadmahamood123@gmail.com`.
