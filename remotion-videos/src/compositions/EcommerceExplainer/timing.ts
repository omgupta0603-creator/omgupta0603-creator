import { getSceneTiming } from "../../utils/timing";
import type { EcommerceExplainerProps } from "./schema";

export const SCENE_ORDER = [
  "title",
  "definition",
  "example",
  "keywords",
  "category",
  "product",
  "technical",
  "linking",
  "schema",
  "ux",
  "summary",
  "thanks",
] as const;

export const getEcommerceTiming = (
  props: EcommerceExplainerProps,
  fps: number,
) =>
  getSceneTiming(SCENE_ORDER, props.sceneSeconds, props.transitionSeconds, fps);
