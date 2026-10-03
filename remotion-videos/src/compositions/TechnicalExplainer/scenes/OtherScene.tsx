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
  colors.success,
  colors.primary,
  colors.secondary,
  colors.danger,
  colors.warm,
  colors.accent,
  colors.primary,
];

export const OtherScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const c = content.other;
  const rows = [c.items.slice(0, 4), c.items.slice(4)];
  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
        <AnimatedText
          text={c.heading}
          fontSize={typeScale.h1}
          staggerFrames={3}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 26,
            marginTop: 60,
            alignItems: "center",
          }}
        >
          {rows.map((row, r) => (
            <div key={r} style={{ display: "flex", gap: 26 }}>
              {row.map((item, j) => {
                const i = r * 4 + j;
                return (
                  <FadeIn
                    key={item.title}
                    delay={stagger(i, 6, 14)}
                    distance={60}
                  >
                    <Card
                      style={{
                        width: 360,
                        height: 210,
                        padding: 30,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "monospace",
                          fontWeight: 700,
                          fontSize: 40,
                          color: ACCENTS[i],
                        }}
                      >
                        {item.glyph}
                      </div>
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
                    </Card>
                  </FadeIn>
                );
              })}
            </div>
          ))}
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
