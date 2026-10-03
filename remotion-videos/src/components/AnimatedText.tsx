import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme/theme";
import { mix, springIn, springs } from "../utils/animation";

type SplitBy = "word" | "char";

/**
 * Kinetic typography: splits text into words or characters and springs each
 * piece in (rise + fade + un-blur) with a stagger.
 */
export const AnimatedText: React.FC<{
  text: string;
  splitBy?: SplitBy;
  delay?: number;
  staggerFrames?: number;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  color?: string;
  /** CSS background for gradient text, e.g. gradients.brand */
  gradient?: string;
  letterSpacing?: number;
  lineHeight?: number;
  rise?: number;
  align?: React.CSSProperties["textAlign"];
  style?: React.CSSProperties;
}> = ({
  text,
  splitBy = "word",
  delay = 0,
  staggerFrames = 4,
  fontSize = 96,
  fontWeight = 700,
  fontFamily = fonts.display,
  color = colors.text,
  gradient,
  letterSpacing = -2,
  lineHeight = 1.05,
  rise = 60,
  align = "center",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const parts = splitBy === "word" ? text.split(" ") : Array.from(text);

  return (
    <div
      style={{
        fontFamily,
        fontSize,
        fontWeight,
        letterSpacing,
        lineHeight,
        color,
        textAlign: align,
        ...style,
      }}
    >
      {parts.map((part, i) => {
        const t = springIn({
          frame,
          fps,
          delay: delay + i * staggerFrames,
          config: springs.snappy,
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              opacity: t,
              filter: `blur(${mix(t, 12, 0)}px)`,
              transform: `translateY(${mix(t, rise, 0)}px)`,
              ...(gradient
                ? {
                    backgroundImage: gradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }
                : {}),
            }}
          >
            {part}
            {splitBy === "word" && i < parts.length - 1 ? " " : ""}
          </span>
        );
      })}
    </div>
  );
};
