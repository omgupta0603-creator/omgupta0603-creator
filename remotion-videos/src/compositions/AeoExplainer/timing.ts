import { getSceneTiming } from "../../utils/timing";
import type { AeoExplainerProps } from "./schema";

export const SCENE_ORDER = [
  "title",
  "definition",
  "compare",
  "example",
  "intent",
  "answers",
  "structure",
  "depth",
  "trust",
  "schema",
  "summary",
  "future",
  "thanks",
] as const;

export const getAeoTiming = (props: AeoExplainerProps, fps: number) =>
  getSceneTiming(SCENE_ORDER, props.sceneSeconds, props.transitionSeconds, fps);
