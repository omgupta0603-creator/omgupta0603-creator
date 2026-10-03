import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { z } from "zod";
import { AnimatedText, Background, FadeIn, Stage } from "../../components";
import { colors, fonts, gradients, typeScale } from "../../theme/theme";

/**
 * Starter composition. `npm run new -- MyVideo` copies this folder to
 * src/compositions/MyVideo and registers it in src/Root.tsx.
 */
export const templateSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  durationInSeconds: z.number().min(1).max(600),
});

export type TemplateProps = z.infer<typeof templateSchema>;

export const Template: React.FC<TemplateProps> = ({ title, subtitle }) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background />
      <Stage>
        <AnimatedText
          text={title}
          fontSize={typeScale.h1}
          gradient={gradients.brand}
        />
        {/* <Sequence from={...}> delays its children: inside it, frame 0 = the "from" frame. */}
        <Sequence from={Math.round(0.6 * fps)} layout="none">
          <FadeIn style={{ marginTop: 32 }}>
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
        </Sequence>
      </Stage>
    </AbsoluteFill>
  );
};
