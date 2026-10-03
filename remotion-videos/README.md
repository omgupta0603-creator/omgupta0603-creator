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

## Structure

```
src/
  Root.tsx            composition registry
  config/video.ts     width / height / fps
  theme/theme.ts      colours, gradients, fonts, type scale
  utils/              animation, audio-sync and layout helpers
  components/         AnimatedText, Background, Stage, FadeIn, DrawLine, ShapeBadge, CountUp, Card
  compositions/
    Showcase/         sample video (scenes/, schema.ts, timing.ts)
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
