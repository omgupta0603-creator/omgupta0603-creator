import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText, Background, FadeIn, Stage } from "../components";
import { colors, fonts, gradients, typeScale } from "../theme/theme";

/** Outro: short line + big "Thank you!", then fade to black. */
export const ThankYou: React.FC<{
  line: string;
  big: string;
  durationInFrames: number;
}> = ({ durationInFrames, ...c }) => {
  const frame = useCurrentFrame();
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
