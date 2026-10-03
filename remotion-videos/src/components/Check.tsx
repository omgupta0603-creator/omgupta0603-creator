import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme/theme";
import { progress, springIn, springs } from "../utils/animation";

/** Round check mark that pops in and draws its tick. */
export const Check: React.FC<{
  delay: number;
  color: string;
  size?: number;
}> = ({ delay, color, size = 40 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = springIn({ frame, fps, delay, config: springs.bouncy });
  const draw = progress(frame, delay + 4, delay + 14);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      style={{ transform: `scale(${pop})`, flexShrink: 0 }}
    >
      <circle
        cx={22}
        cy={22}
        r={20}
        fill={`${color}33`}
        stroke={color}
        strokeWidth={3}
      />
      <path
        d="M13 22.5 L19.5 29 L31 16"
        fill="none"
        stroke={colors.text}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={30}
        strokeDashoffset={30 * (1 - draw)}
      />
    </svg>
  );
};
