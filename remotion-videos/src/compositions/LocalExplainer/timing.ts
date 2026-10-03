import { getSceneTiming } from "../../utils/timing";
import type { LocalExplainerProps } from "./schema";

export const SCENE_ORDER = [
  "title",
  "definition",
  "example",
  "gbp",
  "keywords",
  "reviews",
  "citations",
  "other",
  "summary",
  "strategy",
  "thanks",
] as const;

export const getLocalTiming = (props: LocalExplainerProps, fps: number) =>
  getSceneTiming(SCENE_ORDER, props.sceneSeconds, props.transitionSeconds, fps);
