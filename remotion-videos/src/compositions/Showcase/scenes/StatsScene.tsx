import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  AnimatedText,
  Background,
  Card,
  CountUp,
  FadeIn,
  Stage,
} from "../../../components";
import { colors, fonts, gradients, typeScale } from "../../../theme/theme";
import { springIn, springs, stagger } from "../../../utils/animation";

const BARS = [0.35, 0.55, 0.45, 0.75, 0.62, 0.9, 1];

const BarChart: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 270 }}
    >
      {BARS.map((v, i) => {
        const t = springIn({
          frame,
          fps,
          delay: stagger(i, 4, delay),
          config: springs.snappy,
        });
        return (
          <div
            key={i}
            style={{
              width: 50,
              height: 270 * v,
              borderRadius: 16,
              background:
                i === BARS.length - 1 ? gradients.hot : gradients.brand,
              transform: `scaleY(${t})`,
              transformOrigin: "bottom",
              opacity: 0.35 + 0.65 * t,
            }}
          />
        );
      })}
    </div>
  );
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: fonts.body,
      fontSize: typeScale.caption,
      color: colors.textMuted,
      letterSpacing: 4,
    }}
  >
    {children}
  </div>
);

export const StatsScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const { width, height, fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
        <AnimatedText
          text="Any size. Any frame rate."
          fontSize={typeScale.h1}
          staggerFrames={3}
        />
        <div
          style={{
            display: "flex",
            gap: 56,
            marginTop: 80,
            alignItems: "stretch",
          }}
        >
          <FadeIn delay={10} from="left" distance={80}>
            <Card
              style={{
                width: 700,
                height: 420,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <Label>RESOLUTION</Label>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                <CountUp to={width} start={14} duration={40} fontSize={104} />
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 64,
                    color: colors.textMuted,
                  }}
                >
                  ×
                </div>
                <CountUp to={height} start={18} duration={40} fontSize={104} />
              </div>
              <Label>FRAME RATE</Label>
              <CountUp
                to={fps}
                start={24}
                duration={30}
                suffix=" fps"
                fontSize={104}
                color={colors.secondary}
              />
            </Card>
          </FadeIn>
          <FadeIn delay={18} from="right" distance={80}>
            <Card
              style={{
                width: 560,
                height: 420,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Label>FRAME-ACCURATE ANIMATION</Label>
              <BarChart delay={26} />
            </Card>
          </FadeIn>
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
