import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  AnimatedText,
  Background,
  FadeIn,
  ShapeBadge,
  Stage,
} from "../../../components";
import { colors, fonts, gradients, typeScale } from "../../../theme/theme";
import { mix, springIn, springs } from "../../../utils/animation";

export const OutroScene: React.FC<{ title: string; cta: string }> = ({
  title,
  cta,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Three shapes fly in from the sides and lock together into a logo mark.
  const converge = springIn({ frame, fps, delay: 0, config: springs.heavy });
  const spread = mix(converge, 520, 110);

  // Fade the whole scene to black over the last 15 frames.
  const exit = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <AbsoluteFill style={{ opacity: exit }}>
        <Background intensity={0.6} />
        <Stage>
          <div
            style={{
              position: "relative",
              width: 400,
              height: 180,
              marginBottom: 40,
            }}
          >
            {[
              { shape: "circle" as const, color: colors.primary, x: -spread },
              { shape: "triangle" as const, color: colors.secondary, x: 0 },
              { shape: "square" as const, color: colors.accent, x: spread },
            ].map((s, i) => (
              <div
                key={s.shape}
                style={{
                  position: "absolute",
                  left: 200 - 70,
                  top: 0,
                  transform: `translateX(${s.x}px)`,
                }}
              >
                <ShapeBadge
                  shape={s.shape}
                  color={s.color}
                  size={140}
                  delay={i * 4}
                  idle={false}
                />
              </div>
            ))}
          </div>
          <AnimatedText
            text={title}
            splitBy="char"
            delay={14}
            staggerFrames={2}
            fontSize={typeScale.hero}
          />
          <FadeIn delay={34} style={{ marginTop: 44 }}>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: typeScale.h3 - 8,
                color: colors.text,
                padding: "18px 40px",
                borderRadius: 999,
                background: gradients.brand,
                boxShadow: `0 20px 60px ${colors.primary}66`,
              }}
            >
              <span style={{ opacity: 0.7 }}>$ </span>
              {cta}
            </div>
          </FadeIn>
          <FadeIn delay={44} style={{ marginTop: 28 }}>
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: typeScale.caption,
                color: colors.textMuted,
              }}
            >
              Edit src/compositions to make it yours
            </div>
          </FadeIn>
        </Stage>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
