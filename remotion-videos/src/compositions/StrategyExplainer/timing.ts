import { getSceneTiming } from "../../utils/timing";
import type { StrategyExplainerProps } from "./schema";

export const SCENE_ORDER = [
  "title",
  "roadmap",
  "audit",
  "keywords",
  "competitors",
  "onpage",
  "technical",
  "content",
  "offpage",
  "measure",
  "recap",
  "thanks",
] as const;

export const getStrategyTiming = (props: StrategyExplainerProps, fps: number) =>
  getSceneTiming(SCENE_ORDER, props.sceneSeconds, props.transitionSeconds, fps);
