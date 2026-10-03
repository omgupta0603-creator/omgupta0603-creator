import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText, Background, FadeIn, Stage } from "../../../components";
import { colors, fonts, typeScale } from "../../../theme/theme";
import { springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const COLORS = [colors.primary, colors.secondary, colors.accent, colors.warm];
const HEIGHTS = [0.7, 0.85, 0.78, 1];

/** Four pillars rise: trust, authority, relevance, brand visibility. */
export const ObjectiveScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.objective;

  return (
    <AbsoluteFill>
      <Background intensity={0.5} />
      <Stage exitAt={exitAt}>
        <AnimatedText text={c.heading} fontSize={typeScale.h1} />
        <div
          style={{
            display: "flex",
            gap: 40,
            alignItems: "flex-end",
            height: 440,
            marginTop: 50,
          }}
        >
          {c.pillars.map((p, i) => {
            const t = springIn({
              frame,
              fps,
              delay: 18 + i * 10,
              config: springs.snappy,
            });
            return (
              <div
                key={p}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 18,
                }}
              >
                <div
                  style={{
                    width: 300,
                    height: 340 * HEIGHTS[i],
                    borderRadius: "24px 24px 8px 8px",
                    background: `linear-gradient(180deg, ${COLORS[i]}, ${COLORS[i]}33)`,
                    transform: `scaleY(${t})`,
                    transformOrigin: "bottom",
                    boxShadow: `0 20px 60px ${COLORS[i]}44`,
                  }}
                />
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 40,
                    color: colors.text,
                    opacity: t,
                  }}
                >
                  {p}
                </div>
              </div>
            );
          })}
        </div>
        <FadeIn delay={64} style={{ marginTop: 40 }}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.h3 - 6,
              color: colors.textMuted,
            }}
          >
            {c.footer}
          </div>
        </FadeIn>
      </Stage>
    </AbsoluteFill>
  );
};
