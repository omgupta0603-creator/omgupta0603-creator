import { getSceneTiming } from "../../utils/timing";
import type { GeoExplainerProps } from "./schema";

export const SCENE_ORDER = [
  "title",
  "definition",
  "example",
  "quality",
  "topical",
  "readable",
  "brand",
  "fresh",
  "summary",
  "future",
  "thanks",
] as const;

export const getGeoTiming = (props: GeoExplainerProps, fps: number) =>
  getSceneTiming(SCENE_ORDER, props.sceneSeconds, props.transitionSeconds, fps);
