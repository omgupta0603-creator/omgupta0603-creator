import { getSceneTiming } from "../../utils/timing";
import type { OffPageExplainerProps } from "./schema";

export const SCENE_ORDER = [
  "title",
  "definition",
  "compare",
  "links",
  "quality",
  "pr",
  "more",
  "local",
  "objective",
  "summary",
  "thanks",
] as const;

export const getOffPageTiming = (props: OffPageExplainerProps, fps: number) =>
  getSceneTiming(SCENE_ORDER, props.sceneSeconds, props.transitionSeconds, fps);
