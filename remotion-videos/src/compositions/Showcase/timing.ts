import { secondsToFrames } from "../../config/video";
import type { ShowcaseProps } from "./schema";

/** Single source of truth for scene lengths (frames) and total duration. */
export const getShowcaseTiming = (props: ShowcaseProps, fps: number) => {
  const scenes = {
    intro: secondsToFrames(props.sceneSeconds.intro, fps),
    features: secondsToFrames(props.sceneSeconds.features, fps),
    stats: secondsToFrames(props.sceneSeconds.stats, fps),
    outro: secondsToFrames(props.sceneSeconds.outro, fps),
  };
  const sceneCount = Object.keys(scenes).length;
  // A transition can't be longer than the scenes on either side of it.
  const transitionFrames = Math.min(
    secondsToFrames(props.transitionSeconds, fps),
    ...Object.values(scenes).map((s) => s - 1),
  );
  const total =
    Object.values(scenes).reduce((a, b) => a + b, 0) -
    transitionFrames * (sceneCount - 1);

  return { scenes, transitionFrames, total };
};
