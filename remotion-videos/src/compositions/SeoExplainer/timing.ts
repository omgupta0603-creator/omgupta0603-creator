import { getSceneTiming } from "../../utils/timing";
import type { SeoExplainerProps } from "./schema";

export const SCENE_ORDER = [
  "title",
  "definition",
  "example",
  "onPage",
  "technical",
  "offPage",
  "local",
  "more",
  "summary",
  "thanks",
] as const;

export type SceneKey = (typeof SCENE_ORDER)[number];

/** Scene lengths in frames + total duration (transitions overlap scenes). */
export const getSeoTiming = (props: SeoExplainerProps, fps: number) =>
  getSceneTiming(SCENE_ORDER, props.sceneSeconds, props.transitionSeconds, fps);
