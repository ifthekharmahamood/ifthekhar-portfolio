# Design QA

Source visual truth: D:/Professional/ifthekhar-portfolio/design-exploration/concepts/05-spacious-pastel-portfolio.png
Implementation: local Vite preview at http://127.0.0.1:5273/

## Evidence and normalization

The source raster is 1122 x 1402 pixels. It was displayed at 1440px width with its aspect ratio preserved (approximately 1800px high). The implementation comparison capture is 1440 x 1800 pixels at device scale factor 1. Both show the initial desktop state in the same pastel palette, with reduced motion used for stable comparison. The mockup only covers the opening sections; the implementation intentionally continues into the remaining work stories, professional background, graduate chapter, and contact.

Full-view comparison: qa/screenshots/comparison-board.png. Focused hero comparison: qa/screenshots/hero-comparison.png. Additional evidence: desktop-hero.png, desktop-impact.png, desktop-case-study.png, mobile-hero.png, mobile-work.png, and desktop-full-reduced-motion.png under qa/screenshots/.

## Comparison history

Initial comparison found two P2 issues: the portrait hero image made a visible rectangular boundary, and typography/spacing pushed the first work feature too far down relative to the concept. Replaced the portrait with a generated landscape background that leaves the left side clear for copy. Enlarged the hero type, adjusted hero placement, removed redundant work headings/tags, and aligned feature proportions. Recaptured desktop and mobile views, then inspected the new full and focused comparison boards. Both P2 issues are resolved.

## Required fidelity surfaces

- Typography: DM Sans provides the clean geometric sans-serif direction. Name, introduction, outcomes, and headings retain the intended hierarchy and readable wrapping. The generated reference does not specify an exact font. Small navigation and supporting copy are intentionally conventional website sizes.
- Spacing: the near-viewport hero, generous outcome band, and large alternating project features follow the expanded direction. The rendered desktop page is approximately 5800px tall. Experience and graduate context are open narrative sections rather than a compact resume table.
- Colors: sage, warm cream, powder blue, and lavender sections with slate/teal type match the requested light palette. Actual text/background combinations use high-contrast dark colors.
- Assets: built-in Image Gen produced matching decorative sculpture and conceptual project images. All were opened and inspected. The new hero background removes the rectangular edge. No CSS/SVG approximation substitutes for these image assets; standard UI icons come from the installed Lucide library.
- Copy: current professional claims and contact details match the master resume. Graduate GPA is 3.88, graduation is expected December 2026, and ERP results in the case study use 20% throughput and 50% paperwork reduction. Store links are separate from internal stories. The active resume download is the updated Word document, not the older unverified PDF.

## Browser verification

User explicitly approved local headless browser testing. Chrome was launched with an isolated headless session using Playwright; no existing user profile was used.

All 16 functional checks in qa/results.json passed: intermediate and final counter values; case-study open, Escape close, and focus return; current contact links and resume download; mobile navigation; no horizontal overflow at 1440, 1024, 768, 390, and 375px; reduced-motion counters and visible content; no runtime errors; no failed site asset requests.

The counter sample progressed from intermediate values 1.1, 5, and 9 to final values 5, 21, and 40, with suffixes M+, %, and % in the UI.

All five additional motion checks in qa/motion-results.json passed: visible hero movement; work-content fade through an intermediate opacity; reading-progress change; offscreen floating pause; and correct counters after dynamically enabling reduced motion.

Mobile hero, work, and native case-study screenshots were inspected for wrapping and clipping. The full desktop page was also opened for section rhythm. No actionable P0/P1/P2 issue remains.

## Follow-up polish

The abstract artwork is conceptual rather than a product screenshot, and is labelled accordingly. Authentic product artifacts can replace it later if supplied. Minor differences in synthetic-reference letterforms and artwork arrangement are acceptable for this responsive implementation.

## October 14 update

Reference for this update: the user?s two annotated screenshots and explicit instructions to use only green/cream, replace the sparse biography/graduate layouts with more projects and dedicated sections, add the supplied hobbies, provide section traversal, and show the resume in a popup. The original 1122 x 1402 visual target remains the baseline for hero/featured-work composition; its blue/lavender colors and three-link navigation are intentionally superseded.

The updated implementation capture is qa/screenshots/desktop-comparison.png, 1440 x 1800 at device scale factor 1. The source and new implementation were composed together in qa/screenshots/comparison-board.png, with a focused hero comparison in hero-comparison.png. Green/cream recoloring and added navigation destinations are required changes, not drift. New sections have no pixel-specific visual source and were reviewed against the user?s requested content and existing spacing/type system.

Opened and inspected desktop-hero.png, more-projects.png, education.png, certifications.png, awards.png, hobbies.png, resume-popup.png, and mobile-resume.png. The old two-column biography and graduate chapter are replaced; the two marked empty areas no longer exist. New project cards, education, credentials, and hobbies use the established readable typography and generous section rhythm. Recolored raster assets preserve their composition and eliminate blue/purple/peach accents. Foreground and background CSS now use green-family text and sage/cream surfaces. The old starter favicon was replaced with a green standard-library leaf icon.

All 22 updated functional checks passed, including all section/navigation destinations, six additional project stories, two degrees, two certifications, three awards, six hobbies, chapter-index traversal/highlighting, green/cream-only section backgrounds, complete resume-popup contents and focus return, current Word download, mobile layout/navigation, counters, reduced motion, and no runtime or site-asset errors. All five retained motion checks passed. The resume reader contains all eight master-resume sections and supports internal scrolling on desktop/mobile.

No actionable P0/P1/P2 issues remain. The exact letterforms in the synthetic baseline and conceptual artwork arrangement are accepted minor differences. Publication and replacing conceptual covers with authentic product artifacts remain separate future tasks.

## Product journey hero update

The user's latest instruction supersedes the sculpture background: show the whole product lifecycle as an animation, from ideation to follow-up. The preserved baseline is qa/screenshots/hero-before-journey.png (1440 x 1000). The updated equivalent is journey-desktop.png, with journey-stage-4.png and journey-stage-6.png documenting development and follow-up in the same viewport. Both baseline and updated captures were opened and inspected. The introduction, green/cream palette, hierarchy, CTAs, and chapter navigation remain consistent; the new semantic lifecycle replaces the decorative image intentionally.

The journey uses standard Lucide icons and actual interactive stage controls and process content. It is an illustrative product workflow with no invented project metrics or client claims. Ideation starts with validating the user problem, planning includes success criteria and scope tradeoffs, design includes user testing, development includes acceptance criteria and instrumentation, launch uses a staged rollout, and follow-up feeds measured outcomes and feedback into discovery.

The active artifact enters with a short fade/translation, its three activities appear in sequence, and a progress indicator advances to the next stage every seven seconds. Manual stage selection pauses playback. Autoplay pauses when offscreen or when the document is hidden. Reduced motion removes autoplay and transitions while preserving every stage through keyboard-accessible controls. Auto updates are not announced as live-region chatter; manually selected content uses a polite live region.

Browser results: all 22 existing functional checks passed (qa/results.json), all five updated scrolling/motion checks passed (qa/motion-results.json), and eight journey-specific checks passed (qa/journey-results.json). The latter observed the actual full six-stage cycle and return to ideation, pause/resume, all direct stage selections, document visibility changes, reduced motion, keyboard exploration, and no runtime errors. Spacing was checked at 1920, 1440, 1280, 1100, 1024, 834, 800, 768, 390, and 375px, without horizontal overflow or copy/journey overlap.

The first spacing check exposed a narrow tablet composition. Tablets at 950px and below now stack the journey below the introduction. Also changed the heading/action/location block widths to fit their content so the layout bounds match the visible content. Final screenshots journey-desktop.png, journey-launch.png, journey-mobile-top.png, journey-mobile.png, journey-small-tablet.png, journey-stage-4.png, journey-stage-6.png, and journey-tablet.png were inspected. The hero stays readable, controls remain reachable, and the animation stays inside its section. No actionable P0/P1/P2 issue remains.

final result: passed
