import { secondsToFrames } from "../../config/video";
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
export const getSeoTiming = (props: SeoExplainerProps, fps: number) => {
  const scenes = Object.fromEntries(
    SCENE_ORDER.map((k) => [k, secondsToFrames(props.sceneSeconds[k], fps)]),
  ) as Record<SceneKey, number>;
  const transitionFrames = Math.min(
    secondsToFrames(props.transitionSeconds, fps),
    ...Object.values(scenes).map((s) => s - 1),
  );
  const total =
    Object.values(scenes).reduce((a, b) => a + b, 0) -
    transitionFrames * (SCENE_ORDER.length - 1);
  return { scenes, transitionFrames, total };
};
