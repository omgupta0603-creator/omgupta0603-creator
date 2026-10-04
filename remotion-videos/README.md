# Remotion motion graphics

Programmatic motion graphics videos with [Remotion](https://www.remotion.dev)
**4.0.532**, React 19 and TypeScript, set up for AI coding agents.
Agent instructions are in [`AGENTS.md`](./AGENTS.md); `CLAUDE.md` imports them.

## Quick start

```bash
cd remotion-videos
npm install                 # Node 18+ (tested with Node 22)
npm run dev                 # open Remotion Studio → http://localhost:3000
```

## Commands

| Task | Command |
|---|---|
| Preview in Studio | `npm run dev` |
| List compositions | `npm run compositions` |
| New composition | `npm run new -- MyVideo` |
| Render sample MP4 | `npm run render` → `out/Showcase.mp4` |
| Render any composition | `npx remotion render <Id> out/<name>.mp4` |
| Render with custom props | `npx remotion render Showcase out/x.mp4 --props='{"title":"Hi,"}'` |
| Render a still | `npx remotion still Showcase out/frame.png --frame=90` |
| Render everything | `npm run render:all` |
| Lint + typecheck | `npm run lint` |
| Upgrade Remotion | `npm run upgrade` |

## Sample: `Showcase`

1920×1080 · 30 fps · about 13.7 s. Four scenes (kinetic title, shape cards,
counters and bar chart, logo outro) joined with fade, slide and wipe transitions,
with a music bed that fades in and out.

- **Resolution / fps:** `src/config/video.ts`
- **Duration:** `sceneSeconds` and `transitionSeconds` props (Studio props panel, or `--props`)
- **Text, colours, features:** props in `src/Root.tsx`, editable live in Studio

## `SeoExplainer`: What is SEO and what are its types?

1920×1080 · 30 fps · about 75.6 s. Ten scenes follow the script: title, the S-E-O
definition, a search example ("best SEO company in Delhi"), On-Page, Technical,
Off-Page and Local SEO, International and E-commerce SEO, a summary quote and a
thank-you outro.

- **On-screen text:** `src/compositions/SeoExplainer/content.ts`
- **Scene lengths:** the `sceneSeconds` props (Studio, or `--props`)
- **Voiceover:** add `public/audio/seo-voiceover.mp3`, then render with
  `--props='{"voiceoverSrc":"audio/seo-voiceover.mp3", ...}'` or set it in Studio,
  and match `sceneSeconds` to your narration

```bash
npx remotion render SeoExplainer out/SeoExplainer.mp4
```

## `OnPageExplainer`: What is On-Page SEO?

Same look as `SeoExplainer`. 1920×1080 · 30 fps · about 88.9 s, timed for the script
at the pace of the SeoExplainer voiceover (about 3.3 words/s). It has 12 scenes:
title, definition, "in simple words" with the six elements, then keyword
optimization, title tag, meta description, heading structure, content optimization
and internal linking, other elements (URL, images, alt text, schema, readability),
a summary and a thank-you outro.

```bash
npx remotion render OnPageExplainer out/OnPageExplainer.mp4
```

Text: `src/compositions/OnPageExplainer/content.ts`. Timing and voiceover: the
`sceneSeconds` and `voiceoverSrc` props.

## `OffPageExplainer`: What is Off-Page SEO?

Same look as the other explainers. 1920×1080 · 30 fps · about 85 s, timed for the
script at about 3.3 words/s. It has 11 scenes: title, definition (activities
outside your website), On-Page vs Off-Page, link building, quality over quantity,
digital PR, other activities (brand mentions, citations, directories, partnerships,
community), Off-Page for Local SEO (consistent listings and reviews), the main
objective, a summary and a thank-you outro.

```bash
npx remotion render OffPageExplainer out/OffPageExplainer.mp4
```

Text: `src/compositions/OffPageExplainer/content.ts`. Timing and voiceover: the
`sceneSeconds` and `voiceoverSrc` props.

## `LocalExplainer`: What is Local SEO?

Same look as the other explainers. 1920×1080 · 30 fps · about 89 s, timed for the
script at about 3.3 words/s. It has 11 scenes: title, L-S-E-O definition, a local
search example (three queries typed, a map and local results), Google Business
Profile, local keyword optimization, customer reviews, local citations (one
inconsistent listing gets corrected), other activities, a summary, the
digital-marketing strategy wheel and a thank-you outro. Business names, reviews
and listings are illustrative.

```bash
npx remotion render LocalExplainer out/LocalExplainer.mp4
```

Text: `src/compositions/LocalExplainer/content.ts`. Timing and voiceover: the
`sceneSeconds` and `voiceoverSrc` props.

## `TechnicalExplainer`: What is Technical SEO?

Same look as the other explainers. 1920×1080 · 30 fps · about 99 s, timed for the
script at about 3.3 words/s. It has 13 scenes: title, the technical foundation
(crawl, understand, index), "in simple words" with the six areas, then crawling
and indexing, robots.txt, XML sitemap, canonicalization, speed and Core Web
Vitals, mobile optimization, other areas, the "great content that can't be
crawled" example, a summary and a thank-you outro. URLs and metric values are
illustrative.

```bash
npx remotion render TechnicalExplainer out/TechnicalExplainer.mp4
```

Text: `src/compositions/TechnicalExplainer/content.ts`. Timing and voiceover: the
`sceneSeconds` and `voiceoverSrc` props.

## `InternationalExplainer`: What is International SEO?

Same look as the other explainers. 1920×1080 · 30 fps · about 90.5 s, timed for
the script at about 3.3 words/s. It has 11 scenes: title, definition (one site,
localized versions), the India / US / UK market example, country and language
targeting, hreflang, international keyword research (literal translation vs
local research), URL structure, content localization, other considerations, a
summary and a thank-you outro. Domains, prices and search terms are illustrative.

```bash
npx remotion render InternationalExplainer out/InternationalExplainer.mp4
```

Text: `src/compositions/InternationalExplainer/content.ts`. Timing and voiceover:
the `sceneSeconds` and `voiceoverSrc` props.

## `EcommerceExplainer`: What is E-commerce SEO?

Same look as the other explainers. 1920×1080 · 30 fps · about 92 s, timed for the
script at about 3.3 words/s. It has 12 scenes: title, the store structure, two
product searches, keyword research (customer journey), category pages, product
pages, technical SEO, internal linking, product schema, UX and performance, a
summary and a thank-you outro. Store, products, prices and counts are
illustrative.

```bash
npx remotion render EcommerceExplainer out/EcommerceExplainer.mp4
```

Text: `src/compositions/EcommerceExplainer/content.ts`. Timing and voiceover: the
`sceneSeconds` and `voiceoverSrc` props.

## `StrategyExplainer`: SEO Strategy

Same look as the other explainers. 1920×1080 · 30 fps · about 69 s. It has 12
scenes: title, an 8-step roadmap, one scene per step (audit, keyword research,
competitor analysis, on-page, technical, content strategy, off-page and digital
PR, measurement and improvement), a recap roadmap with a "continuously improve"
loop, and a thank-you outro. Step scenes are slightly longer than the narration
so each visual can play out. Scores, counts and keywords are illustrative.

```bash
npx remotion render StrategyExplainer out/StrategyExplainer.mp4
```

Text: `src/compositions/StrategyExplainer/content.ts`. Timing and voiceover: the
`sceneSeconds` and `voiceoverSrc` props.

## `AeoExplainer`: What is AEO?

Same look as the other explainers. 1920×1080 · 30 fps · about 104 s, timed for the
script at about 3.3 words/s. It has 13 scenes: title, the A-E-O definition, SEO
vs AEO, a direct-answer example, five optimization steps (search intent, direct
answers, content structure, topical depth, trustworthy information), a
structured-data tip, a summary, SEO + AEO and a thank-you outro. Questions,
answers and sources are illustrative.

```bash
npx remotion render AeoExplainer out/AeoExplainer.mp4
```

Text: `src/compositions/AeoExplainer/content.ts`. Timing and voiceover: the
`sceneSeconds` and `voiceoverSrc` props.

## `GeoExplainer`: What is GEO?

Same look as the other explainers. 1920×1080 · 30 fps · about 99.5 s, timed for
the script at about 3.3 words/s. It has 11 scenes: title, the G-E-O definition,
an AI-answer example that mentions your brand, five steps (quality content,
topical authority, easy for AI to understand, brand authority and mentions,
accurate and up-to-date info), an SEO / AEO / GEO summary, the combined
strategy and a thank-you outro. The script's last sentence was cut off, so
`future.lead` / `future.result` in `content.ts` complete it. Brands, numbers
and sources are illustrative.

```bash
npx remotion render GeoExplainer out/GeoExplainer.mp4
```

Text: `src/compositions/GeoExplainer/content.ts`. Timing and voiceover: the
`sceneSeconds` and `voiceoverSrc` props.

## Structure

```
src/
  Root.tsx            composition registry
  config/video.ts     width / height / fps
  theme/theme.ts      colours, gradients, fonts, type scale
  utils/              animation, audio-sync and layout helpers
  components/         AnimatedText, Background, Stage, FadeIn, Highlight, DrawLine, ShapeBadge, CountUp, Card, Pill, Check, TopicLayout, SearchBar/SerpResult, CodeCard
  scenes/             shared TitleCard, AcronymScene, ElementsIntro, QuoteSummary, ThankYou
  compositions/
    Showcase/         sample video (scenes/, schema.ts, timing.ts)
    SeoExplainer/     "What is SEO" explainer (content.ts, scenes/, visuals/)
    OnPageExplainer/  "What is On-Page SEO?" explainer
    OffPageExplainer/ "What is Off-Page SEO?" explainer
    LocalExplainer/   "What is Local SEO?" explainer
    TechnicalExplainer/ "What is Technical SEO?" explainer
    InternationalExplainer/ "What is International SEO?" explainer
    EcommerceExplainer/ "What is E-commerce SEO?" explainer
    StrategyExplainer/ "SEO Strategy" 8-step explainer
    AeoExplainer/     "What is AEO?" explainer
    GeoExplainer/     "What is GEO?" explainer
    _Template/        starter used by `npm run new`
public/               audio/, images/, fonts/
.claude/skills/       official Remotion agent skills
```

## Docs

- Fundamentals: https://www.remotion.dev/docs/the-fundamentals
- Existing-project install: https://www.remotion.dev/docs/brownfield
- Agent skills: https://www.remotion.dev/docs/ai/skills
- Transitions: https://www.remotion.dev/docs/transitions/transitionseries
- Audio: https://www.remotion.dev/docs/audio/importing
- Rendering CLI: https://www.remotion.dev/docs/cli/render

## License note

Remotion is free for individuals and teams of up to 3. Larger companies need a
company license: https://www.remotion.dev/docs/license
