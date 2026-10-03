import React from "react";
import { AbsoluteFill } from "remotion";
import {
  AnimatedText,
  Background,
  Card,
  FadeIn,
  Stage,
} from "../../../components";
import { colors, fonts, typeScale } from "../../../theme/theme";
import { stagger } from "../../../utils/animation";
import { content } from "../content";

const ACCENTS = [
  colors.accent,
  colors.warm,
  colors.secondary,
  colors.primary,
  colors.success,
];

export const OtherScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
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
        <div style={{ display: "flex", gap: 26, marginTop: 70 }}>
          {c.items.map((item, i) => (
            <FadeIn key={item.title} delay={stagger(i, 8, 14)} distance={70}>
              <Card
                style={{
                  width: 320,
                  height: 300,
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    fontSize: 38,
                    color: ACCENTS[i],
                  }}
                >
                  {item.glyph}
                </div>
                <div>
                  <div
                    style={{
                      width: 60,
                      height: 6,
                      borderRadius: 3,
                      background: ACCENTS[i],
                      marginBottom: 18,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: 34,
                      lineHeight: 1.15,
                      color: colors.text,
                    }}
                  >
                    {item.title}
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
