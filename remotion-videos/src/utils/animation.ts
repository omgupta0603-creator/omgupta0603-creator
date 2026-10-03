import { Easing, interpolate, spring, type SpringConfig } from "remotion";

/**
 * Animation helpers. Every animation in Remotion must be a pure function of
 * the current frame (from `useCurrentFrame()`). Never use CSS transitions,
 * CSS @keyframes, setTimeout or Date.now() — they will not render correctly.
 */

/** Spring presets. `damping: 200` = smooth, no bounce. */
export const springs = {
  smooth: { damping: 200 },
  snappy: { damping: 20, stiffness: 200 },
  bouncy: { damping: 8 },
  heavy: { damping: 15, stiffness: 80, mass: 2 },
} satisfies Record<string, Partial<SpringConfig>>;

/** Cubic-bezier easing presets, usable with interpolate(..., {easing}). */
export const eases = {
  out: Easing.bezier(0.16, 1, 0.3, 1),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  in: Easing.bezier(0.7, 0, 0.84, 0),
} as const;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** 0 → 1 spring starting at `delay` frames. */
export const springIn = ({
  frame,
  fps,
  delay = 0,
  config = springs.smooth,
  durationInFrames,
}: {
  frame: number;
  fps: number;
  delay?: number;
  config?: Partial<SpringConfig>;
  durationInFrames?: number;
}) => spring({ frame: frame - delay, fps, config, durationInFrames });

/** Eased 0 → 1 progress between two frames (clamped). */
export const progress = (
  frame: number,
  start: number,
  end: number,
  easing: (t: number) => number = eases.out,
) => interpolate(frame, [start, end], [0, 1], { ...clamp, easing });

/** Map a 0..1 value onto any output range. */
export const mix = (t: number, from: number, to: number) =>
  from + (to - from) * t;

/** Opacity that fades in at the start and out at the end of a scene. */
export const fadeInOut = (
  frame: number,
  durationInFrames: number,
  fadeFrames = 15,
) =>
  interpolate(
    frame,
    [0, fadeFrames, durationInFrames - fadeFrames, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );

/** Delay for the n-th item in a staggered list. */
export const stagger = (index: number, step = 4, offset = 0) =>
  offset + index * step;

/** Gentle looping float, e.g. for idle shapes. `period` is in frames. */
export const float = (frame: number, period = 90, amplitude = 12, phase = 0) =>
  Math.sin(((frame + phase) / period) * Math.PI * 2) * amplitude;
