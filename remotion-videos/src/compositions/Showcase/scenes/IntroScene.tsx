import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  AnimatedText,
  Background,
  DrawLine,
  FadeIn,
  Stage,
} from "../../../components";
import { colors, fonts, gradients, typeScale } from "../../../theme/theme";
import { float, progress } from "../../../utils/animation";

const Ring: React.FC<{
  size: number;
  color: string;
  delay: number;
  x: number;
  y: number;
}> = ({ size, color, delay, x, y }) => {
  const frame = useCurrentFrame();
  const r = size / 2 - 4;
  const circumference = 2 * Math.PI * r;
  const draw = progress(frame, delay, delay + 40);
  return (
    <svg
      width={size}
      height={size}
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translateY(${float(frame, 140, 14, delay)}px) rotate(${frame * 0.6}deg)`,
        opacity: 0.9,
      }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - draw * 0.8)}
      />
    </svg>
  );
};

export const IntroScene: React.FC<{
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  exitAt?: number;
}> = ({ eyebrow, title, highlight, subtitle, exitAt }) => {
  const titleWords = title.split(" ").length;

  return (
    <AbsoluteFill>
      <Background />
      <Stage exitAt={exitAt}>
        <Ring size={220} color={colors.secondary} delay={6} x={190} y={170} />
        <Ring size={140} color={colors.accent} delay={14} x={1580} y={720} />
        <Ring size={90} color={colors.warm} delay={20} x={1500} y={190} />

        <FadeIn delay={0} from="top" distance={20}>
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: typeScale.caption,
              letterSpacing: 6,
              color: colors.textMuted,
              padding: "12px 28px",
              border: `1px solid ${colors.border}`,
              borderRadius: 999,
              background: colors.surface,
              marginBottom: 48,
            }}
          >
            {eyebrow}
          </div>
        </FadeIn>

        <AnimatedText text={title} delay={8} fontSize={typeScale.hero} />
        <AnimatedText
          text={highlight}
          delay={8 + titleWords * 4}
          fontSize={typeScale.hero}
          gradient={gradients.brand}
        />

        <DrawLine
          start={34}
          duration={24}
          width={420}
          height={10}
          style={{ marginTop: 40 }}
        />

        <FadeIn delay={44} style={{ marginTop: 40 }}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.body,
              color: colors.textMuted,
            }}
          >
            {subtitle}
          </div>
        </FadeIn>
      </Stage>
    </AbsoluteFill>
  );
};
