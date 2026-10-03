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
  colors.primary,
  colors.secondary,
  colors.warm,
  colors.accent,
  colors.success,
];

/** Simple line icons, one per activity. */
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
      {index === 0 ? ( // speech bubble with @
        <>
          <path d="M6 10 h36 v22 h-20 l-8 8 v-8 h-8 z" {...s} />
          <circle cx={24} cy={21} r={5} {...s} />
        </>
      ) : index === 1 ? ( // map pin with lines
        <>
          <path
            d="M24 42 C24 42 10 28 10 18 a14 14 0 0 1 28 0 C38 28 24 42 24 42 z"
            {...s}
          />
          <circle cx={24} cy={18} r={5} {...s} />
        </>
      ) : index === 2 ? ( // list / directory
        <>
          <rect x={8} y={6} width={32} height={36} rx={4} {...s} />
          <path d="M15 16 h18 M15 24 h18 M15 32 h12" {...s} />
        </>
      ) : index === 3 ? ( // two linked rings
        <>
          <circle cx={18} cy={24} r={10} {...s} />
          <circle cx={30} cy={24} r={10} {...s} />
        </>
      ) : (
        // people / community
        <>
          <circle cx={16} cy={16} r={6} {...s} />
          <circle cx={32} cy={16} r={6} {...s} />
          <path
            d="M6 40 c0-8 5-12 10-12 s10 4 10 12 M22 40 c0-8 5-12 10-12 s10 4 10 12"
            {...s}
          />
        </>
      )}
    </svg>
  );
};

export const MoreScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const c = content.more;
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
            <FadeIn key={item} delay={stagger(i, 9, 14)} distance={70}>
              <Card
                style={{
                  width: 320,
                  height: 320,
                  padding: 32,
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
                      fontSize: 36,
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
        <FadeIn delay={70} style={{ marginTop: 50 }}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.body,
              color: colors.textMuted,
            }}
          >
            {c.footnote}
          </div>
        </FadeIn>
      </Stage>
    </AbsoluteFill>
  );
};
