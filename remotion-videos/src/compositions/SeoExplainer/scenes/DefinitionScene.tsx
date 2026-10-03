import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background, FadeIn, Highlight, Stage } from "../../../components";
import { colors, fonts, gradients, typeScale } from "../../../theme/theme";
import { mix, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

/** S · E · O letters appear, then each expands into its word, then the definition. */
export const DefinitionScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.definition;

  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
        <div style={{ display: "flex", gap: 56, alignItems: "flex-end" }}>
          {c.letters.map((l, i) => {
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
                key={l.letter}
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
                    fontSize: 220,
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
        <FadeIn delay={54} style={{ marginTop: 80, maxWidth: 1400 }}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.h3 - 4,
              lineHeight: 1.45,
              color: colors.textMuted,
              textAlign: "center",
            }}
          >
            {c.body}{" "}
            <Highlight start={78} duration={18}>
              <b>{c.highlight}</b>
            </Highlight>
          </div>
        </FadeIn>
      </Stage>
    </AbsoluteFill>
  );
};
