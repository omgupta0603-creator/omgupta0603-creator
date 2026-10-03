import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background, FadeIn, Highlight, Stage } from "../../../components";
import { colors, fonts, typeScale } from "../../../theme/theme";
import { mix, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const CHIP_COLORS = [
  colors.warm,
  colors.primary,
  colors.secondary,
  colors.accent,
  colors.success,
  colors.primary,
];

/** "In simple words…" definition, then the six elements covered next. */
export const SimpleWordsScene: React.FC<{
  exitAt?: number;
  elementsAt: number;
}> = ({ exitAt, elementsAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.simple;

  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
        <FadeIn distance={20}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.caption,
              letterSpacing: 6,
              color: colors.textMuted,
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            {c.label.toUpperCase()}
          </div>
        </FadeIn>
        <FadeIn delay={6} style={{ maxWidth: 1500 }}>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 500,
              fontSize: typeScale.h2,
              lineHeight: 1.25,
              color: colors.text,
              textAlign: "center",
            }}
          >
            {c.lead}{" "}
            <Highlight start={30} duration={20}>
              {c.highlight}
            </Highlight>
          </div>
        </FadeIn>
        <FadeIn delay={elementsAt} style={{ marginTop: 80 }}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.caption,
              letterSpacing: 6,
              color: colors.textMuted,
              textAlign: "center",
            }}
          >
            {c.elementsLabel.toUpperCase()}
          </div>
        </FadeIn>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 440px)",
            gap: 24,
            marginTop: 28,
          }}
        >
          {c.elements.map((e, i) => {
            const t = springIn({
              frame,
              fps,
              delay: elementsAt + 6 + i * 5,
              config: springs.snappy,
            });
            const col = CHIP_COLORS[i];
            return (
              <div
                key={e}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  padding: "18px 24px",
                  borderRadius: 20,
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  opacity: t,
                  transform: `translateY(${mix(t, 30, 0)}px) scale(${mix(t, 0.9, 1)})`,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 30,
                    color: col,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontWeight: 500,
                    fontSize: 28,
                    color: colors.text,
                  }}
                >
                  {e}
                </div>
              </div>
            );
          })}
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
