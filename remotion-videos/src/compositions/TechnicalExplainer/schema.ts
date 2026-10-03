import { z } from "zod";

const seconds = z.number().min(1).max(60);

/**
 * Timing + audio props. On-screen text lives in content.ts.
 * Default scene lengths follow the script at about 3.3 spoken words/second
 * (the pace of the SeoExplainer voiceover). Adjust them to your narration.
 */
export const technicalExplainerSchema = z.object({
  sceneSeconds: z.object({
    title: seconds,
    definition: seconds,
    simple: seconds,
    crawl: seconds,
    robots: seconds,
    sitemap: seconds,
    canonical: seconds,
    speed: seconds,
    mobile: seconds,
    other: seconds,
    example: seconds,
    summary: seconds,
    thanks: seconds,
  }),
  transitionSeconds: z.number().min(0.1).max(2),
  /** Path inside public/, e.g. "audio/technical-seo-voiceover.mp3". Empty = none. */
  voiceoverSrc: z.string(),
  musicVolume: z.number().min(0).max(1),
});

export type TechnicalExplainerProps = z.infer<typeof technicalExplainerSchema>;
