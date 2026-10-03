/**
 * Global video settings. Change these to re-target every composition
 * that uses the defaults (e.g. 3840x2160 for 4K, 1080x1920 for vertical, 60 fps).
 *
 * A single composition can still override them in src/Root.tsx.
 */
export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

/** Convert seconds to a whole number of frames at the given frame rate. */
export const secondsToFrames = (seconds: number, fps: number = VIDEO.fps) =>
  Math.max(1, Math.round(seconds * fps));

/** Convert frames to seconds at the given frame rate. */
export const framesToSeconds = (frames: number, fps: number = VIDEO.fps) =>
  frames / fps;
