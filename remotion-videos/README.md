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

## Structure

```
src/
  Root.tsx            composition registry
  config/video.ts     width / height / fps
  theme/theme.ts      colours, gradients, fonts, type scale
  utils/              animation, audio-sync and layout helpers
  components/         AnimatedText, Background, Stage, FadeIn, Highlight, DrawLine, ShapeBadge, CountUp, Card, Pill, Check, TopicLayout
  scenes/             shared TitleCard, QuoteSummary, ThankYou
  compositions/
    Showcase/         sample video (scenes/, schema.ts, timing.ts)
    SeoExplainer/     "What is SEO" explainer (content.ts, scenes/, visuals/)
    OnPageExplainer/  "What is On-Page SEO?" explainer
    OffPageExplainer/ "What is Off-Page SEO?" explainer
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
