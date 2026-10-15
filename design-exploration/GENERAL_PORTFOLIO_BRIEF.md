# General purpose portfolio direction

The latest user feedback replaces the earlier three visual directions with one balanced, broadly professional personal portfolio.

## Design

Use spacious sections with pastel sage, warm cream, and powder-blue backgrounds; deep slate type; and muted forest-teal controls. His name and product management experience are the primary introduction. Keep the page professional and general-purpose, with no dominant app-store imagery. The latest feedback supersedes the earlier compact three-card composition.

The visual concept should show only the first two or three sections at a natural desktop scale. It must not squeeze the entire website into one image. The finished portfolio should unfold through multiple viewports, with an approximately viewport-height introduction and substantial room around each work story.

## Structure

1. Header with Work, Experience, About, Contact, and Resume.
2. Introduction with his name, role, professional scope, location, and two clear actions.
3. Three concise outcomes with the product and metric explicitly paired.
4. Large, alternating two-column work features with problem, contribution, result, and case-study link; one product per substantial section.
5. An open narrative about product experience, followed by a separate current education and university-work section. Avoid a resume-style side-by-side table.
6. A short explanation of his approach.
7. Direct email, LinkedIn, and resume links.

## Motion

Use normal scrolling, staggered hero text, substantial section reveals, gentle artwork movement, animated outcome counters, restrained project parallax, and accessible case-study expansions. Respect reduced motion and preserve readable content without animation.

## Motion specification for implementation

| Element | Trigger and behavior |
| --- | --- |
| Hero text and actions | On initial load, fade and move upward 20px over 700ms with 90ms stagger. |
| Hero artwork | Gentle 8px vertical float over 6 seconds; pause when offscreen or the document is hidden. |
| Outcome counters | On first viewport entry, count 0 to 5M+, 21%, and 40%, over 1.4 seconds with 120ms stagger and an eased finish. Keep the number width stable and announce only the final value to screen readers. |
| Section headings and paragraphs | Fade and move upward 24px over 600ms as their section enters the viewport. Reveal once. |
| Work imagery | At most 20px scroll-linked vertical movement, preserving normal scrolling and preventing clipped content. |
| Work controls | Border/color transitions over 180ms, with clear hover and keyboard focus states. |
| Header | Stay visible while scrolling; a slim progress indicator tracks reading position. |
| Reduced motion | Render final counters and visible content immediately; disable float, parallax, smooth scrolling, and nonessential transitions. |

Use approximately 100–140px section padding on desktop, reduced appropriately on mobile. Do not set every section to an excessive fixed height. Counter labels remain paired with their products: Time Warp Scan downloads, Beauty Editor core retention, and lower Shuttle onboarding cost.

## Content

Keep the master resume as the authority. Expected graduation is December 2026; graduate GPA is 3.88/4.00; contact email is enadmahamood123@gmail.com; LinkedIn is https://www.linkedin.com/in/ifthekhar-pm. Keep product impact distinct and attributable to the correct project. The generated thumbnail illustrations are conceptual symbols, not screenshots of actual product interfaces.

This is one revised visual concept. No website source changes are included in this design exploration.
