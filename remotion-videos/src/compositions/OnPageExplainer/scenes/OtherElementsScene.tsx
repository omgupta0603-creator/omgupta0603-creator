import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  AnimatedText,
  Background,
  Card,
  FadeIn,
  Stage,
} from "../../../components";
import { colors, fonts, typeScale } from "../../../theme/theme";
import { mix, progress, stagger } from "../../../utils/animation";
import { content } from "../content";

const ACCENTS = [
  colors.primary,
  colors.secondary,
  colors.warm,
  colors.accent,
  colors.success,
];

/** Small animated glyph per element. */
const Glyph: React.FC<{ index: number; delay: number; color: string }> = ({
  index,
  delay,
  color,
}) => {
  const frame = useCurrentFrame();
  const t = progress(frame, delay, delay + 30);
  switch (index) {
    case 0: // URL
      return (
        <div style={{ fontFamily: "monospace", fontSize: 30, color }}>
          / → /seo
        </div>
      );
    case 1: // image shrink
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: mix(t, 110, 64),
              height: mix(t, 82, 48),
              borderRadius: 10,
              background: `linear-gradient(135deg, ${color}, ${colors.primary})`,
            }}
          />
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 30,
              color: colors.text,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {Math.round(mix(t, 1200, 180))} KB
          </div>
        </div>
      );
    case 2: // alt
      return (
        <div style={{ fontFamily: "monospace", fontSize: 30, color }}>
          alt=&quot;…&quot;
        </div>
      );
    case 3: // schema
      return (
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 40,
            fontWeight: 700,
            color,
          }}
        >
          {"{ }"}
        </div>
      );
    default: // readability
      return (
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 56,
            fontWeight: 700,
            color,
          }}
        >
          Aa
        </div>
      );
  }
};

export const OtherElementsScene: React.FC<{ exitAt?: number }> = ({
  exitAt,
}) => {
  const c = content.other;
  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
        <AnimatedText
          text={c.heading}
          fontSize={typeScale.h1}
          staggerFrames={3}
        />
        <div style={{ display: "flex", gap: 26, marginTop: 72 }}>
          {c.items.map((item, i) => {
            const delay = stagger(i, 9, 14);
            return (
              <FadeIn key={item.title} delay={delay} distance={70}>
                <Card
                  style={{
                    width: 320,
                    height: 380,
                    padding: 32,
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                  }}
                >
                  <div
                    style={{
                      height: 96,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Glyph index={i} delay={delay + 10} color={ACCENTS[i]} />
                  </div>
                  <div
                    style={{
                      width: 60,
                      height: 6,
                      borderRadius: 3,
                      background: ACCENTS[i],
                    }}
                  />
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: 36,
                      lineHeight: 1.15,
                      color: colors.text,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 22,
                      lineHeight: 1.4,
                      color: colors.textMuted,
                    }}
                  >
                    {item.detail}
                  </div>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
