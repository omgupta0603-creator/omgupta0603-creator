import { getSceneTiming } from "../../utils/timing";
import type { InternationalExplainerProps } from "./schema";

export const SCENE_ORDER = [
  "title",
  "definition",
  "example",
  "targeting",
  "hreflang",
  "keywords",
  "urls",
  "localization",
  "other",
  "summary",
  "thanks",
] as const;

export const getInternationalTiming = (
  props: InternationalExplainerProps,
  fps: number,
) =>
  getSceneTiming(SCENE_ORDER, props.sceneSeconds, props.transitionSeconds, fps);
