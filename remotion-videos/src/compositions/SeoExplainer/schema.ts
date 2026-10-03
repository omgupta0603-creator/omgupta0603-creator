import { z } from "zod";

const seconds = z.number().min(1).max(60);

/**
 * Timing + audio props. On-screen text lives in content.ts.
 * Tip: when you record a voiceover, set each scene's seconds to match its
 * narration and put the file in public/audio/, then set voiceoverSrc.
 */
export const seoExplainerSchema = z.object({
  sceneSeconds: z.object({
    title: seconds,
    definition: seconds,
    example: seconds,
    onPage: seconds,
    technical: seconds,
    offPage: seconds,
    local: seconds,
    more: seconds,
    summary: seconds,
    thanks: seconds,
  }),
  transitionSeconds: z.number().min(0.1).max(2),
  /** Path inside public/, e.g. "audio/seo-voiceover.mp3". Empty = none. */
  voiceoverSrc: z.string(),
  musicVolume: z.number().min(0).max(1),
});

export type SeoExplainerProps = z.infer<typeof seoExplainerSchema>;
