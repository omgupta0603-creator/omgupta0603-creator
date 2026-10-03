import { secondsToFrames } from "../config/video";

/**
 * Timing for a <TransitionSeries> of scenes: per-scene frames, the
 * transition length, and the total (transitions overlap, so they shorten it).
 */
export const getSceneTiming = <K extends string>(
  order: readonly K[],
  sceneSeconds: Record<K, number>,
  transitionSeconds: number,
  fps: number,
) => {
  const scenes = Object.fromEntries(
    order.map((k) => [k, secondsToFrames(sceneSeconds[k], fps)]),
  ) as Record<K, number>;
  const frames = order.map((k) => scenes[k]);
  // A transition can't be longer than the scenes on either side of it.
  const transitionFrames = Math.min(
    secondsToFrames(transitionSeconds, fps),
    ...frames.map((f) => f - 1),
  );
  const total =
    frames.reduce((a, b) => a + b, 0) - transitionFrames * (order.length - 1);
  return { scenes, transitionFrames, total };
};
