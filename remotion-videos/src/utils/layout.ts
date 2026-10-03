import { useVideoConfig } from "remotion";

/**
 * Returns a multiplier relative to the 1920x1080 design size, so sizes written
 * for 1080p scale automatically to 4K, 720p or vertical formats.
 * Usage: fontSize: 96 * scale
 */
export const useScale = (designWidth = 1920, designHeight = 1080) => {
  const { width, height } = useVideoConfig();
  return Math.min(width / designWidth, height / designHeight);
};
