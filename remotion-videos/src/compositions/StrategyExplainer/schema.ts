import { z } from "zod";

const seconds = z.number().min(1).max(60);

/**
 * Timing + audio props. On-screen text lives in content.ts.
 * Step scenes get a few extra seconds so each visual can play out; shorten
 * them to match your narration if you record one.
 */
export const strategyExplainerSchema = z.object({
  sceneSeconds: z.object({
    title: seconds,
    roadmap: seconds,
    audit: seconds,
    keywords: seconds,
    competitors: seconds,
    onpage: seconds,
    technical: seconds,
    content: seconds,
    offpage: seconds,
    measure: seconds,
    recap: seconds,
    thanks: seconds,
  }),
  transitionSeconds: z.number().min(0.1).max(2),
  /** Path inside public/, e.g. "audio/seo-strategy-voiceover.mp3". Empty = none. */
  voiceoverSrc: z.string(),
  musicVolume: z.number().min(0).max(1),
});

export type StrategyExplainerProps = z.infer<typeof strategyExplainerSchema>;
