import { zColor } from "@remotion/zod-types";
import { z } from "zod";

/**
 * Props for the Showcase composition. Every field is editable live in the
 * Remotion Studio "Props" panel and can be overridden on the CLI with
 * --props='{"title":"..."}' or --props=./props.json.
 */
export const showcaseSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  highlight: z.string(),
  subtitle: z.string(),
  features: z
    .array(
      z.object({
        label: z.string(),
        description: z.string(),
        shape: z.enum(["circle", "triangle", "square", "star", "hexagon"]),
        color: zColor(),
      }),
    )
    .min(1)
    .max(4),
  outroTitle: z.string(),
  cta: z.string(),
  /** Length of each scene in seconds. Total length is computed from these. */
  sceneSeconds: z.object({
    intro: z.number().min(1).max(30),
    features: z.number().min(1).max(30),
    stats: z.number().min(1).max(30),
    outro: z.number().min(1).max(30),
  }),
  /** Length of each transition between scenes, in seconds. */
  transitionSeconds: z.number().min(0.1).max(2),
  /** Background music volume, 0 = silent. */
  musicVolume: z.number().min(0).max(1),
});

export type ShowcaseProps = z.infer<typeof showcaseSchema>;
