import { getSceneTiming } from "../../utils/timing";
import type { TechnicalExplainerProps } from "./schema";

export const SCENE_ORDER = [
  "title",
  "definition",
  "simple",
  "crawl",
  "robots",
  "sitemap",
  "canonical",
  "speed",
  "mobile",
  "other",
  "example",
  "summary",
  "thanks",
] as const;

export const getTechnicalTiming = (
  props: TechnicalExplainerProps,
  fps: number,
) =>
  getSceneTiming(SCENE_ORDER, props.sceneSeconds, props.transitionSeconds, fps);
