import React from "react";
import { useCurrentFrame } from "remotion";
import { colors, gradients } from "../theme/theme";
import { progress } from "../utils/animation";

/**
 * Marker-style highlight that sweeps behind inline text, line by line, even
 * when the phrase wraps over several lines.
 */
export const Highlight: React.FC<{
  children: React.ReactNode;
  start: number;
  duration?: number;
  gradient?: string;
  color?: string;
  /** Height of the marker as a % of the line. */
  thickness?: number;
}> = ({
  children,
  start,
  duration = 24,
  gradient = gradients.hot,
  color = colors.text,
  thickness = 16,
}) => {
  const frame = useCurrentFrame();
  const t = progress(frame, start, start + duration);
  return (
    <span
      style={{
        color,
        backgroundImage: gradient,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 100%",
        backgroundSize: `${t * 100}% ${thickness}%`,
        padding: "0 4px 6px",
      }}
    >
      {children}
    </span>
  );
};
