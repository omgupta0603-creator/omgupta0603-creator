import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText, Background, FadeIn, Stage } from "../../../components";
import { colors, fonts, gradients, typeScale } from "../../../theme/theme";
import { mix, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const PILLAR_COLORS = [colors.primary, colors.secondary, colors.accent];

/** Foundation slab, three pillars (crawl / understand / index), then the user-experience roof. */
export const DefinitionScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.definition;
  const base = springIn({ frame, fps, delay: 30, config: springs.snappy });
  const roof = springIn({ frame, fps, delay: 86, config: springs.bouncy });

  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
        <AnimatedText
          text="Technical SEO"
          fontSize={typeScale.h2}
          gradient={gradients.brand}
        />
        <FadeIn delay={10} style={{ marginTop: 14 }}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.body + 2,
              color: colors.textMuted,
            }}
          >
            {c.lead}
          </div>
        </FadeIn>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          {/* Roof */}
          <div
            style={{
              width: 1000,
              padding: "20px 0",
              borderRadius: 20,
              background: gradients.hot,
              textAlign: "center",
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 36,
              color: colors.background,
              opacity: roof,
              transform: `translateY(${mix(roof, -80, 0)}px)`,
            }}
          >
            {c.roof}
          </div>
          {/* Pillars */}
          <div
            style={{
              display: "flex",
              gap: 90,
              height: 260,
              alignItems: "flex-end",
              marginTop: 14,
            }}
          >
            {c.pillars.map((p, i) => {
              const t = springIn({
                frame,
                fps,
                delay: 44 + i * 10,
                config: springs.snappy,
              });
              return (
                <div
                  key={p}
                  style={{
                    width: 270,
                    height: 260,
                    borderRadius: 18,
                    background: `linear-gradient(180deg, ${PILLAR_COLORS[i]}, ${PILLAR_COLORS[i]}55)`,
                    transform: `scaleY(${t})`,
                    transformOrigin: "bottom",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 36,
                    color: "white",
                  }}
                >
                  <span style={{ opacity: t > 0.8 ? 1 : 0 }}>{p}</span>
                </div>
              );
            })}
          </div>
          {/* Foundation */}
          <div
            style={{
              width: 1100,
              marginTop: 14,
              padding: "24px 0",
              borderRadius: 18,
              background: colors.backgroundAlt,
              border: `2px solid ${colors.border}`,
              textAlign: "center",
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 36,
              letterSpacing: 2,
              color: colors.text,
              transform: `scaleX(${base})`,
            }}
          >
            {c.foundation}
          </div>
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
