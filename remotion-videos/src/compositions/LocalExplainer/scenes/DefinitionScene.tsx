import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background, FadeIn, Highlight, Stage } from "../../../components";
import { colors, fonts, gradients, typeScale } from "../../../theme/theme";
import { mix, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

/** L · S · E · O letters appear, then expand into "Local Search Engine Optimization". */
export const DefinitionScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.definition;

  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
        <div style={{ display: "flex", gap: 48, alignItems: "flex-end" }}>
          {c.words.map((l, i) => {
            const pop = springIn({
              frame,
              fps,
              delay: i * 6,
              config: springs.bouncy,
            });
            const expand = springIn({
              frame,
              fps,
              delay: 26 + i * 8,
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
                    fontSize: 200,
                    lineHeight: 1,
                    backgroundImage: i === 0 ? gradients.hot : gradients.brand,
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
        <FadeIn delay={64} style={{ marginTop: 80, maxWidth: 1400 }}>
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
            <Highlight start={90} duration={18}>
              <b>{c.highlight}</b>
            </Highlight>
          </div>
        </FadeIn>
      </Stage>
    </AbsoluteFill>
  );
};
