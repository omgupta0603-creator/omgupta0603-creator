import React from "react";
import { AbsoluteFill } from "remotion";
import {
  AnimatedText,
  Background,
  DrawLine,
  FadeIn,
  ShapeBadge,
  Stage,
} from "../../../components";
import { colors, fonts, gradients, typeScale } from "../../../theme/theme";
import { content } from "../content";

export const TitleScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const c = content.title;
  return (
    <AbsoluteFill>
      <Background />
      <Stage exitAt={exitAt}>
        <div style={{ position: "absolute", left: 200, top: 160 }}>
          <ShapeBadge
            shape="circle"
            color={colors.primary}
            size={110}
            delay={20}
          />
        </div>
        <div style={{ position: "absolute", right: 210, top: 200 }}>
          <ShapeBadge
            shape="triangle"
            color={colors.secondary}
            size={100}
            delay={26}
          />
        </div>
        <div style={{ position: "absolute", right: 300, bottom: 150 }}>
          <ShapeBadge
            shape="hexagon"
            color={colors.accent}
            size={90}
            delay={32}
          />
        </div>
        <FadeIn from="top" distance={20}>
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: typeScale.caption,
              letterSpacing: 8,
              color: colors.textMuted,
              padding: "12px 30px",
              borderRadius: 999,
              border: `1px solid ${colors.border}`,
              background: colors.surface,
              marginBottom: 44,
            }}
          >
            {c.eyebrow}
          </div>
        </FadeIn>
        <AnimatedText text={c.line1} delay={6} fontSize={typeScale.hero} />
        <AnimatedText
          text={c.line2}
          delay={18}
          fontSize={typeScale.h1}
          gradient={gradients.brand}
        />
        <DrawLine
          start={40}
          duration={24}
          width={380}
          height={10}
          style={{ marginTop: 44 }}
        />
      </Stage>
    </AbsoluteFill>
  );
};
