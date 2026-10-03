import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background, Stage } from "../components";
import { colors, fonts, gradients, typeScale } from "../theme/theme";
import { mix, springIn, springs } from "../utils/animation";

/**
 * Acronym letters pop in, then each expands into its word
 * (e.g. A · E · O → Answer Engine Optimization). Anything passed as
 * children is shown underneath (usually a FadeIn with the definition).
 */
export const AcronymScene: React.FC<{
  words: readonly { letter: string; word: string }[];
  exitAt?: number;
  children?: React.ReactNode;
}> = ({ words, exitAt, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
        <div style={{ display: "flex", gap: 56, alignItems: "flex-end" }}>
          {words.map((l, i) => {
            const pop = springIn({
              frame,
              fps,
              delay: i * 6,
              config: springs.bouncy,
            });
            const expand = springIn({
              frame,
              fps,
              delay: 24 + i * 8,
              config: springs.smooth,
            });
            return (
              <div
                key={l.word}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 210,
                    lineHeight: 1,
                    backgroundImage: gradients.brand,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    transform: `scale(${pop})`,
                  }}
                >
                  {l.letter}
                </div>
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 500,
                    fontSize: typeScale.h3,
                    color: colors.text,
                    opacity: expand,
                    transform: `translateY(${mix(expand, -30, 0)}px)`,
                    letterSpacing: mix(expand, 12, 0),
                  }}
                >
                  {l.word}
                </div>
              </div>
            );
          })}
        </div>
        {children}
      </Stage>
    </AbsoluteFill>
  );
};
