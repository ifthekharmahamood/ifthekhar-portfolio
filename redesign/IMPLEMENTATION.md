# Green and cream portfolio

The active implementation lives in src/Portfolio.jsx, src/ProductJourney.jsx, src/PortfolioSections.jsx, src/ResumePreview.jsx, src/portfolio.css, src/product-journey.css, and src/data/portfolio.js. The original root site and earlier redesign components are retained as reference.

Run from the repository root:

```powershell
npm.cmd run dev --prefix redesign
```

Preview uses port 5273. Build with npm.cmd run build --prefix redesign.

## Current experience

- Sage green and warm cream are the two section backgrounds. Active illustrations and the favicon use matching green/cream colors.
- Three featured product stories and six additional project stories.
- Dedicated Experience, Education, Certifications, Awards, Hobbies, and Contact sections.
- Hobbies were supplied by the user: books, photography, travelling, soccer, camping, and cycling.
- Header links and a desktop chapter rail traverse all seven main sections. Hover/focus reveals chapter names; active state follows scroll position. Smaller screens use a section jump menu.
- The hero replaces the decorative sculpture with a six-stage interactive product lifecycle: ideation, planning, design, development, launch, and follow-up. Each seven-second stage introduces its guiding question, work artifact, activities, and outcome. Follow-up loops back to discovery. This describes a product approach, not additional resume achievements.
- Visitors can pause/resume or select any stage. Selecting a stage pauses playback to allow reading. Playback pauses offscreen and when the document is hidden. Reduced motion disables autoplay and retains manual stage exploration. Desktop uses a split composition; smaller tablets and phones stack the journey below the introduction.
- Counters animate once on viewport entry. Section reveals, gentle project-image parallax, and reading progress remain active. Reduced motion uses readable final states.
- Resume controls open a native on-page dialog containing the full master-resume text, with a Word download inside. The reader is a browser-friendly rendering, not a PDF viewer. Resume JSON was extracted from the source DOCX, preserving all eight sections and normalizing an invalid separator character.
- Native project dialogs show the documented decisions and results. In-progress and concept work retain their actual status.

## Navigation alternatives

The chapter rail is the implemented recommendation. A floating section dock would make destinations more visible but occupy more screen space. An on-demand full-screen contents menu would keep the page quieter but require an extra action. The mobile menu already uses the on-demand approach.

## Verification

Source lint and production build passed. The user previously approved headless browser testing; authorization was reused for this update. All 22 functional checks, five motion checks, and eight product-journey checks passed. The journey tests cover an actual complete autoplay cycle, manual exploration, pause/resume, document visibility, reduced motion, keyboard interaction, and spacing at ten viewport widths. Hero screenshots were inspected at desktop, tablet, and phone sizes, including development and follow-up states. See design-qa.md and the result JSON files under qa/.
