import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText, Background, FadeIn, Stage } from "../../../components";
import { colors, fonts, gradients, typeScale } from "../../../theme/theme";
import { content } from "../content";

export const ThanksScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const c = content.thanks;
  // Last scene: fade to black over its final 20 frames.
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <AbsoluteFill style={{ opacity: fadeOut }}>
        <Background intensity={0.6} />
        <Stage>
          <FadeIn>
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: typeScale.body + 4,
                color: colors.textMuted,
                marginBottom: 36,
              }}
            >
              {c.line}
            </div>
          </FadeIn>
          <AnimatedText
            text={c.big}
            splitBy="char"
            delay={14}
            staggerFrames={2}
            fontSize={180}
            gradient={gradients.brand}
          />
        </Stage>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
