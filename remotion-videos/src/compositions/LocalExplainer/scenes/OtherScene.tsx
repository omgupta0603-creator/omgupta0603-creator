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

const ACCENTS = [colors.primary, colors.secondary, colors.warm, colors.success];

const Icon: React.FC<{ index: number; color: string }> = ({ index, color }) => {
  const s = {
    fill: "none",
    stroke: color,
    strokeWidth: 4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg width={84} height={84} viewBox="0 0 48 48">
      {index === 0 ? ( // link chain + pin
        <>
          <path d="M20 28 l8 -8" {...s} />
          <path d="M17 22 l-5 5 a6 6 0 0 0 9 9 l5 -5" {...s} />
          <path d="M31 26 l5 -5 a6 6 0 0 0 -9 -9 l-5 5" {...s} />
        </>
      ) : index === 1 ? ( // document with pin
        <>
          <path d="M10 6 h20 l8 8 v28 h-28 z" {...s} />
          <path
            d="M24 34 C24 34 17 27 17 22 a7 7 0 0 1 14 0 C31 27 24 34 24 34 z"
            {...s}
          />
        </>
      ) : index === 2 ? ( // image
        <>
          <rect x={6} y={10} width={36} height={28} rx={4} {...s} />
          <circle cx={16} cy={19} r={3} {...s} />
          <path d="M6 34 l11 -10 l8 7 l6 -5 l11 10" {...s} />
        </>
      ) : (
        // phone with checkmark
        <>
          <rect x={13} y={4} width={22} height={40} rx={4} {...s} />
          <path d="M18 24 l4 4 l8 -8" {...s} />
        </>
      )}
    </svg>
  );
};

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
        <div style={{ display: "flex", gap: 30, marginTop: 70 }}>
          {c.items.map((item, i) => (
            <FadeIn key={item} delay={stagger(i, 9, 14)} distance={70}>
              <Card
                style={{
                  width: 380,
                  height: 340,
                  padding: 36,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Icon index={i} color={ACCENTS[i]} />
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
                      fontSize: 38,
                      lineHeight: 1.15,
                      color: colors.text,
                    }}
                  >
                    {item}
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
