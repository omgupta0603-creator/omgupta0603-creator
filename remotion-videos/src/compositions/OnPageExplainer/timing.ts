import { getSceneTiming } from "../../utils/timing";
import type { OnPageExplainerProps } from "./schema";

export const SCENE_ORDER = [
  "title",
  "definition",
  "simple",
  "keyword",
  "titleTag",
  "meta",
  "headings",
  "content",
  "linking",
  "other",
  "summary",
  "thanks",
] as const;

export const getOnPageTiming = (props: OnPageExplainerProps, fps: number) =>
  getSceneTiming(SCENE_ORDER, props.sceneSeconds, props.transitionSeconds, fps);
