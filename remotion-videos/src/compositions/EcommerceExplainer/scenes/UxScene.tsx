import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  AnimatedText,
  Background,
  Card,
  FadeIn,
  Stage,
} from "../../../components";
import { colors, fonts, typeScale } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const ACC = [colors.primary, colors.success, colors.secondary];

/** Three experience cards, then a shopping journey with a dot travelling to checkout. */
export const UxScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.ux;
  const jStart = 56;
  const steps = c.journey.length;
  const travel = progress(frame, jStart + 10, jStart + 70);
  const JW = 1200;

  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
        <AnimatedText
          text={c.heading}
          fontSize={typeScale.h1}
          staggerFrames={3}
        />
        <div style={{ display: "flex", gap: 30, marginTop: 56 }}>
          {c.cards.map((card, i) => (
            <FadeIn key={card.title} delay={14 + i * 8} distance={60}>
              <Card
                style={{
                  width: 380,
                  padding: 30,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  borderColor: ACC[i],
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 54,
                    color: ACC[i],
                  }}
                >
                  {card.value}
                </div>
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 34,
                    color: colors.text,
                  }}
                >
                  {card.title}
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={jStart - 8} style={{ marginTop: 60 }}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.caption,
              letterSpacing: 5,
              color: colors.textMuted,
              textAlign: "center",
              marginBottom: 26,
            }}
          >
            {c.journeyLabel.toUpperCase()}
          </div>
          <div style={{ position: "relative", width: JW, height: 90 }}>
            <div
              style={{
                position: "absolute",
                left: 40,
                right: 40,
                top: 30,
                height: 8,
                borderRadius: 4,
                background: colors.border,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 40,
                top: 30,
                height: 8,
                borderRadius: 4,
                width: (JW - 80) * travel,
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.success})`,
              }}
            />
            {c.journey.map((s, i) => {
              const x = 40 + ((JW - 80) * i) / (steps - 1);
              const reached = travel >= i / (steps - 1) - 0.001;
              const pop = springIn({
                frame,
                fps,
                delay: jStart + i * 6,
                config: springs.bouncy,
              });
              return (
                <div
                  key={s}
                  style={{
                    position: "absolute",
                    left: x,
                    top: 0,
                    transform: `translateX(-50%) scale(${pop})`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 34,
                      background: reached
                        ? colors.success
                        : colors.backgroundAlt,
                      border: `3px solid ${reached ? colors.success : colors.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: 28,
                      color: reached ? colors.background : colors.textMuted,
                      transform: `translateY(${mix(pop, 10, 0) - 0}px)`,
                    }}
                  >
                    {reached ? "✓" : i + 1}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontWeight: 700,
                      fontSize: 24,
                      color: colors.text,
                      marginTop: 2,
                    }}
                  >
                    {s}
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Stage>
    </AbsoluteFill>
  );
};
