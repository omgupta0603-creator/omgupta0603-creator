import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { mix, springIn, springs } from "../../../utils/animation";

/** Label chip that pops in with a spring at `delay`. */
export const Pill: React.FC<{
  children: React.ReactNode;
  color: string;
  delay: number;
  fontSize?: number;
  style?: React.CSSProperties;
}> = ({ children, color, delay, fontSize = 26, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = springIn({ frame, fps, delay, config: springs.snappy });
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 20px",
        borderRadius: 999,
        background: `${color}26`,
        border: `2px solid ${color}`,
        color: colors.text,
        fontFamily: fonts.body,
        fontWeight: 500,
        fontSize,
        whiteSpace: "nowrap",
        opacity: t,
        transform: `scale(${mix(t, 0.6, 1)})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
