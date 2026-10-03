import React from "react";
import { useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme/theme";
import { progress } from "../utils/animation";

/** Animated number that counts from `from` to `to` between two frames. */
export const CountUp: React.FC<{
  to: number;
  from?: number;
  start?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  fontSize?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({
  to,
  from = 0,
  start = 0,
  duration = 45,
  decimals = 0,
  prefix = "",
  suffix = "",
  fontSize = 120,
  color = colors.text,
  style,
}) => {
  const frame = useCurrentFrame();
  const value = from + (to - from) * progress(frame, start, start + duration);
  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontWeight: 700,
        fontSize,
        color,
        fontVariantNumeric: "tabular-nums",
        letterSpacing: -2,
        ...style,
      }}
    >
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </div>
  );
};
