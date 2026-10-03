import React from "react";
import { useCurrentFrame } from "remotion";
import { gradients } from "../theme/theme";
import { progress } from "../utils/animation";

/** A bar that draws itself from left to right between two frames. */
export const DrawLine: React.FC<{
  start?: number;
  duration?: number;
  width?: number;
  height?: number;
  background?: string;
  style?: React.CSSProperties;
}> = ({
  start = 0,
  duration = 20,
  width = 320,
  height = 8,
  background = gradients.brand,
  style,
}) => {
  const frame = useCurrentFrame();
  const t = progress(frame, start, start + duration);
  return (
    <div
      style={{
        width,
        height,
        borderRadius: height,
        background,
        transform: `scaleX(${t})`,
        transformOrigin: "left center",
        ...style,
      }}
    />
  );
};
