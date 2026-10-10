# Portfolio redesign: wireframes and mockups

Two passes for the four pages (Home, About, Skills, Contact), desktop at 1440px.

1. `wireframes/`: low-fidelity, greyscale layouts. Each section carries a blue note naming
   what it does and which reference it borrows from.
2. `mockups/`: high-fidelity designs built from those wireframes in the site's palette
   (#0F172A, #1E293B, #38BDF8, #818CF8), Plus Jakarta Sans, Inter and JetBrains Mono.

## References used
- kevin-indig.com: giant outlined name in the hero and footer, logo wall, two-up service cards, "Meet" section, quote cards
- aleydasolis.com: portrait and intro card, free resources section, testimonials, contact block
- reeni-wp.laralink.com: rotating role text, big "years of experience" card with stat tiles, skill bars, education and experience cards, CTA with form
- dribbble.com/search/personal-website: portrait-led heroes, "what I can do" cards, stat strips
- The two Pinterest searches could not be loaded (Pinterest blocks automated access).

The AI-answer card from the live site stays as the hero's signature element.

## Placeholders to fill before building
- Portrait and working photos (shown as silhouettes)
- Case-study results ("Add result metric")
- Testimonials (placeholder quotes)
- Certifications
- LinkedIn URL

## Regenerating
`src/` holds the HTML/CSS and generators. Edit, then run from `src/`:

    python3 build_wireframes.py && python3 render.py "wireframe-*.html" ../wireframes
    python3 build_mockups.py && python3 render.py "mockup-*.html" ../mockups

Rendering needs Python Playwright and Chromium.
