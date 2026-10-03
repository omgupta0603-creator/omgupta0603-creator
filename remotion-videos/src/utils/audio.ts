import { interpolate } from "remotion";

/**
 * Audio sync helpers. Remotion audio is timeline-based: place sounds with
 * <Sequence from={frame}> and shape volume with a per-frame callback.
 */

/** Frame at which a given beat lands, for music at `bpm`. Beat 0 = frame 0. */
export const beatToFrame = (beat: number, bpm: number, fps: number) =>
  Math.round((beat * 60 * fps) / bpm);

/** Number of frames per beat. */
export const framesPerBeat = (bpm: number, fps: number) => (60 * fps) / bpm;

/**
 * Volume envelope for <Audio volume={...}>: fades in and out.
 * Usage: <Audio volume={(f) => fadeVolume(f, durationInFrames, 30, 45)} />
 */
export const fadeVolume = (
  frame: number,
  durationInFrames: number,
  fadeInFrames = 30,
  fadeOutFrames = 30,
  maxVolume = 1,
) =>
  interpolate(
    frame,
    [0, fadeInFrames, durationInFrames - fadeOutFrames, durationInFrames],
    [0, maxVolume, maxVolume, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
