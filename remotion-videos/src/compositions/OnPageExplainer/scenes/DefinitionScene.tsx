import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  AnimatedText,
  Background,
  Card,
  FadeIn,
  Stage,
} from "../../../components";
import { colors, fonts, gradients, typeScale } from "../../../theme/theme";
import { mix, springIn, springs, stagger } from "../../../utils/animation";
import { content } from "../content";

/** Rank bars climbing: "improve visibility". */
const VisibilityIcon: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 130 }}
    >
      {[0.35, 0.6, 1].map((h, i) => {
        const t = springIn({
          frame,
          fps,
          delay: stagger(i, 5, delay),
          config: springs.snappy,
        });
        return (
          <div
            key={i}
            style={{
              width: 42,
              height: 130 * h * t,
              borderRadius: 10,
              background: i === 2 ? gradients.hot : gradients.brand,
            }}
          />
        );
      })}
    </div>
  );
};

/** Five stars filling up: "better experience for users". */
const ExperienceIcon: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{ display: "flex", gap: 10, height: 130, alignItems: "center" }}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const t = springIn({
          frame,
          fps,
          delay: stagger(i, 4, delay),
          config: springs.bouncy,
        });
        return (
          <svg
            key={i}
            width={58}
            height={58}
            viewBox="0 0 24 24"
            style={{ transform: `scale(${mix(t, 0.4, 1)})` }}
          >
            <path
              d="M12 2 L14.9 8.6 L22 9.3 L16.6 14 L18.2 21 L12 17.3 L5.8 21 L7.4 14 L2 9.3 L9.1 8.6 Z"
              fill={t > 0.5 ? colors.warm : "transparent"}
              stroke={colors.warm}
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
    </div>
  );
};

export const DefinitionScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const c = content.definition;
  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
        <AnimatedText
          text="On-Page SEO"
          fontSize={typeScale.h1}
          gradient={gradients.brand}
        />
        <FadeIn delay={14} style={{ marginTop: 18 }}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.h3 - 4,
              color: colors.textMuted,
            }}
          >
            {c.lead}
          </div>
        </FadeIn>
        <div style={{ display: "flex", gap: 56, marginTop: 64 }}>
          {c.benefits.map((b, i) => {
            const delay = 34 + i * 26;
            return (
              <FadeIn key={b.title} delay={delay} distance={70}>
                <Card
                  style={{
                    width: 620,
                    height: 380,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 22,
                  }}
                >
                  {i === 0 ? (
                    <VisibilityIcon delay={delay + 8} />
                  ) : (
                    <ExperienceIcon delay={delay + 8} />
                  )}
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: typeScale.h3,
                      color: colors.text,
                    }}
                  >
                    {b.title}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 32,
                      color: colors.textMuted,
                    }}
                  >
                    {b.body}
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
