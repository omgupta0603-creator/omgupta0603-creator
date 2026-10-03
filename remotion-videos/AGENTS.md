# Agent guide: Remotion motion graphics project

This project makes videos with **Remotion 4.0.532** (React → MP4). Read this
before writing or editing a composition. For any API you are unsure about, use the
official Remotion skills in `.claude/skills/` (start with `remotion-best-practices`)
or the docs at https://www.remotion.dev/docs.

## Golden rules

1. **Everything animates from `useCurrentFrame()`.** Derive every moving value
   from the frame with `interpolate()`, `spring()` or the helpers in
   `src/utils/animation.ts`. **Never** use CSS transitions/animations, `@keyframes`,
   `setTimeout`, `requestAnimationFrame`, `Date.now()` or `Math.random()` (use
   `random(seed)` from `remotion` if you need randomness). Otherwise frames render
   inconsistently ("flicker").
2. **Think in frames, write in seconds.** Use `secondsToFrames(s, fps)` from
   `src/config/video.ts` and read `fps` from `useVideoConfig()`; never hardcode 30.
3. **Clamp interpolations** (`extrapolateLeft/Right: "clamp"`) unless you want overshoot.
4. **Assets live in `public/`** and are referenced with `staticFile("images/x.png")`.
   Use `<Img>` from `remotion`, and `<Audio>` / `<Video>` from `@remotion/media`.
   Do not use plain `<img>`, `<audio>` or `<video>`.
5. **Keep all `remotion` and `@remotion/*` packages on the exact same version**
   (no `^`). Add packages with `npm i --save-exact @remotion/<pkg>@4.0.532`.
   Upgrade with `npm run upgrade`.
6. Run `npm run lint` (ESLint with Remotion rules, plus `tsc`) after edits. It must pass.
7. Don't render an MP4 unless asked. Open the preview (`npm run dev`) instead.

## Project map

```
remotion.config.ts        CLI config: codec h264, CRF 18, jpeg frames, rspack
src/index.ts              Entry point (registerRoot). Don't edit.
src/Root.tsx              Registers every <Composition> (id, size, fps, duration, props)
src/config/video.ts       VIDEO = {width:1920, height:1080, fps:30}; secondsToFrames()
src/theme/theme.ts        colors, gradients, fonts (Google Fonts via @remotion/google-fonts), type scale
src/utils/animation.ts    springs, eases, springIn, progress, mix, fadeInOut, stagger, float
src/utils/audio.ts        beatToFrame, framesPerBeat, fadeVolume (audio sync)
src/utils/layout.ts       useScale(): size multiplier relative to 1920x1080
src/utils/timing.ts       getSceneTiming(): scene frames + total for TransitionSeries
src/scenes/               Shared full-frame scenes (TitleCard, ElementsIntro, QuoteSummary, ThankYou)
src/components/           Reusable building blocks (see table below)
src/compositions/<Name>/  One folder per video: <Name>.tsx, schema.ts, scenes/
src/compositions/_Template/  Starter copied by `npm run new`
scripts/new-composition.mjs  Scaffolder
public/audio|images|fonts Static assets
out/                      Render output (git-ignored)
```

### Components (`src/components`)

| Component | Use it for |
|---|---|
| `Background` | Animated gradient blobs + moving grid. Put it first in a scene. |
| `Stage` | 1920×1080 design canvas scaled to the real size; `exitAt` animates content out. |
| `AnimatedText` | Kinetic typography: per-word or per-char spring in, optional gradient fill. |
| `FadeIn` | Fade + slide any element in after `delay` frames, from any side. |
| `Highlight` | Marker underline that sweeps behind inline text, even across wrapped lines. |
| `DrawLine` | Underline/bar that draws itself left → right. |
| `ShapeBadge` | `@remotion/shapes` circle/triangle/square/star/hexagon with pop-in + float. |
| `CountUp` | Number counter between two frames. |
| `Card` | Frosted surface for grouping content. |
| `Pill` | Label chip that springs in at `delay`. |
| `Check` | Round check mark that pops in and draws its tick (`tickColor` for light backgrounds). |
| `SearchBar` / `SerpResult` | Google-style search box and result card; `useTyped()` for a typewriter effect. |
| `CodeCard` | Editor-style file card whose lines type in; `renderLine` for syntax colours. |
| `TopicLayout` | Numbered topic scene: outline number, title and body on the left, any visual on the right (`titleSize` for long titles). |

Prefer composing these over writing new one-off animation code. Put new reusable
pieces in `src/components/` and export them from `src/components/index.ts`.

### Shared scenes (`src/scenes`)

Full-frame scenes that take their text as props, used by the explainer videos:
`TitleCard` (eyebrow + two-line title), `ElementsIntro` ("in simple words" line
plus numbered topic chips), `QuoteSummary` (closing quote with two
underlined phrases) and `ThankYou` (outro that fades to black).

### Multi-scene timing

`getSceneTiming(order, sceneSeconds, transitionSeconds, fps)` in
`src/utils/timing.ts` turns per-scene seconds into frames and the total length
for a `<TransitionSeries>`. See `src/compositions/OnPageExplainer/timing.ts`.

### Explainer videos with a voiceover

`SeoExplainer`, `OnPageExplainer`, `OffPageExplainer`, `LocalExplainer`,
`TechnicalExplainer`, `InternationalExplainer`, `EcommerceExplainer` and
`StrategyExplainer` share one structure: copy in `content.ts`,
scene lengths as `sceneSeconds` props, and an optional `voiceoverSrc`. To sync a
narration, size each scene to its part of the script. Their voiceover runs at about
3.3 words per second, so scene seconds ≈ words ÷ 3.3 + 0.6 (the transition overlap)
+ a short pause.

## Creating a new composition

```bash
npm run new -- ProductLaunch      # PascalCase name
```

This copies `src/compositions/_Template` to `src/compositions/ProductLaunch/` and
registers `<Composition id="ProductLaunch">` in `src/Root.tsx` (at the
`@new-compositions` marker, which must stay). Then edit the new folder.

To register one by hand, add to `src/Root.tsx`:

```tsx
<Composition
  id="MyVideo"                    // used by `npx remotion render MyVideo`
  component={MyVideo}
  schema={myVideoSchema}          // zod schema → editable props in Studio
  defaultProps={{ title: "Hello", durationInSeconds: 8 }}  // keep inline, not imported
  width={VIDEO.width}
  height={VIDEO.height}
  fps={VIDEO.fps}
  durationInFrames={1}            // placeholder, real value from calculateMetadata
  calculateMetadata={({ props }) => ({
    durationInFrames: secondsToFrames(props.durationInSeconds, VIDEO.fps),
  })}
/>
```

Keep `defaultProps` inline in `Root.tsx`. Studio can only save prop edits back to
code when they are an object literal there.

## Changing resolution, frame rate and duration

- **Every composition:** edit `VIDEO` in `src/config/video.ts`.
- **One composition:** pass different `width`/`height`/`fps` in `Root.tsx`.
- **Per render:** `--scale=2` doubles the pixels (1080p → 4K) and `--frames=0-89`
  renders a range. The frame rate always comes from the composition.
- **Duration:** computed by `calculateMetadata` from props. For `Showcase`, change
  `sceneSeconds` / `transitionSeconds`, in Studio or with `--props`.
- Scenes are designed at 1920×1080 inside `<Stage>`, so 720p, 1440p and 4K just
  scale. For vertical 1080×1920, use `<Stage designWidth={1080} designHeight={1920}>`
  and lay the scene out for that shape.

## Building scenes

A scene is a component that fills the frame:

```tsx
export const MyScene: React.FC<{ title: string; exitAt?: number }> = ({ title, exitAt }) => (
  <AbsoluteFill>
    <Background />
    <Stage exitAt={exitAt}>
      <AnimatedText text={title} fontSize={typeScale.h1} />
      <FadeIn delay={20}><p>…</p></FadeIn>
    </Stage>
  </AbsoluteFill>
);
```

Inside a `<Sequence>` / `<TransitionSeries.Sequence>`, `useCurrentFrame()` starts
at 0 for that scene, so every scene animates from its own frame 0.

### Sequencing and transitions

- `<Sequence from={30} durationInFrames={60}>`: show children from frame 30 for 60 frames.
- `<Series>`: scenes back-to-back with no overlap.
- `<TransitionSeries>` (from `@remotion/transitions`): scenes with transitions.
  Presentations: `fade`, `slide`, `wipe`, `flip`, `clockWipe` and more, imported from
  `@remotion/transitions/<name>`. Timing: `linearTiming({durationInFrames})` or
  `springTiming({config:{damping:200}})`. **Each transition shortens the total
  duration by its length**: total = sum(scenes) − sum(transitions). See
  `src/compositions/Showcase/timing.ts`.
- Animate a scene's content out before its transition (`<Stage exitAt>`), so
  text from two scenes never overlaps during a crossfade.

### Animating typography

- `AnimatedText splitBy="word" | "char"`, with `staggerFrames` setting the rhythm. 2–4 is snappy.
- Chain lines with `delay`: the second line starts after the first line's words.
- Gradient text: `gradient={gradients.brand}`.
- Fonts: load at module level with `@remotion/google-fonts/<Font>` in
  `src/theme/theme.ts` (Remotion waits for them before rendering). For local fonts,
  put files in `public/fonts/` and use `loadFont()` from `@remotion/fonts`
  (install `@remotion/fonts@4.0.532`).
- Use `fontVariantNumeric: "tabular-nums"` for counters so digits don't jitter.

### Animating graphics

- Shapes: `@remotion/shapes` (`<Circle>`, `<Star>`, `<Polygon>`…) or plain SVG.
- Draw-on strokes: animate `strokeDashoffset` from the path length to 0
  (see `Ring` in `IntroScene.tsx`; `@remotion/paths` `getLength()` for paths).
- Prefer `transform` and `opacity` for motion. Springs: `springs.smooth` (no
  bounce), `springs.snappy`, `springs.bouncy`, `springs.heavy`.
- Idle motion: `float(frame, period, amplitude, phase)`.

## Audio and sync

```tsx
import { Audio } from "@remotion/media";
<Audio src={staticFile("audio/track.mp3")} volume={(f) => fadeVolume(f, durationInFrames, 30, 45)} />
```

- Position a sound in time by wrapping it: `<Sequence from={secondsToFrames(2.5, fps)}><Audio src={staticFile("audio/whoosh.mp3")} /></Sequence>`.
- Trim the source with `trimBefore` (in frames). Use `loop` for beds and
  `playbackRate` to change speed.
- Sync to music: `beatToFrame(beat, bpm, fps)` gives the frame of any beat. Use it as
  a scene's `delay` or a `<Sequence from>` so cuts and pops land on the beat.
- Visualising audio: `@remotion/media-utils` (`useWindowedAudioData`,
  `visualizeAudio`). Install it at the same version.
- `public/audio/ambient-pad.mp3` is a generated, royalty-free demo bed. Replace it
  with your own licensed music.

## Previewing

```bash
npm run dev                       # Remotion Studio at http://localhost:3000
```

In Studio: pick a composition on the left, press Space to play, step frames with the arrow
keys, and edit props in the right panel (Save writes them back to `Root.tsx`).
Render from the UI with the **Render** button. Check one frame quickly:

```bash
npx remotion still Showcase out/frame.png --frame=90
```

## Rendering

```bash
npm run render                                    # Showcase → out/Showcase.mp4
npx remotion render <CompositionId> out/<name>.mp4
npx remotion render Showcase out/custom.mp4 --props='{"title":"Hello,"}'
npx remotion render Showcase out/4k.mp4 --scale=2  # 3840x2160
npx remotion render Showcase out/clip.mp4 --frames=0-120
npx remotion render Showcase out/x.webm --codec=vp9
npm run render:all                                # every composition
```

Defaults (in `remotion.config.ts`): H.264, CRF 18, yuv420p. Set
`REMOTION_BROWSER_EXECUTABLE=/path/to/chrome-headless-shell` to use an existing
browser instead of Remotion's automatic download, for example on offline machines.

## Checklist before you finish

- [ ] `npm run lint` passes
- [ ] Composition appears in `npx remotion compositions` with the expected size/fps/duration
- [ ] Spot-check key frames with `npx remotion still`
- [ ] No text overlaps during transitions; nothing runs off-frame at the target size
