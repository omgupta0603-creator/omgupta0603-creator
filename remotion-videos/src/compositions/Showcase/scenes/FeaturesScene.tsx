import React from "react";
import { AbsoluteFill } from "remotion";
import {
  AnimatedText,
  Background,
  Card,
  FadeIn,
  ShapeBadge,
  Stage,
} from "../../../components";
import { colors, fonts, typeScale } from "../../../theme/theme";
import { stagger } from "../../../utils/animation";
import type { ShowcaseProps } from "../schema";

export const FeaturesScene: React.FC<{
  features: ShowcaseProps["features"];
  exitAt?: number;
}> = ({ features, exitAt }) => {
  return (
    <AbsoluteFill>
      <Background intensity={0.4} />
      <Stage exitAt={exitAt}>
        <AnimatedText
          text="Built from reusable pieces"
          fontSize={typeScale.h1}
          staggerFrames={3}
        />
        <div style={{ display: "flex", gap: 48, marginTop: 90 }}>
          {features.map((f, i) => {
            const delay = stagger(i, 8, 14);
            return (
              <FadeIn key={f.label} delay={delay} distance={80}>
                <Card
                  style={{
                    width: 440,
                    height: 420,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 28,
                  }}
                >
                  <ShapeBadge
                    shape={f.shape}
                    color={f.color}
                    size={150}
                    delay={delay + 6}
                  />
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: typeScale.h3,
                      color: colors.text,
                    }}
                  >
                    {f.label}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontSize: typeScale.caption + 4,
                      color: colors.textMuted,
                    }}
                  >
                    {f.description}
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
