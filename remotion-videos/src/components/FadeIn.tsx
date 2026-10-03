import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { mix, springIn, springs } from "../utils/animation";

/** Wrap any element to fade + slide it in after `delay` frames. */
export const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  from?: "bottom" | "top" | "left" | "right" | "none";
  distance?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, from = "bottom", distance = 40, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = springIn({ frame, fps, delay, config: springs.smooth });
  const d = mix(t, distance, 0);
  const offset = {
    bottom: `translateY(${d}px)`,
    top: `translateY(${-d}px)`,
    left: `translateX(${-d}px)`,
    right: `translateX(${d}px)`,
    none: "none",
  }[from];

  return (
    <div style={{ opacity: t, transform: offset, ...style }}>{children}</div>
  );
};
