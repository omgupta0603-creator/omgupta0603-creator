import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background, FadeIn, Stage } from "../../../components";
import { colors, fonts, typeScale } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const SIZE = 600;
const C = SIZE / 2;
const R_OUT = 270;
const R_IN = 150;
const SEG_COLORS = [
  colors.warm,
  colors.primary,
  colors.secondary,
  colors.accent,
  colors.success,
];

const arc = (
  a0: number,
  a1: number,
  rOut: number,
  rIn: number,
  cx: number,
  cy: number,
) => {
  const p = (r: number, a: number) =>
    `${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`;
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${p(rOut, a0)} A ${rOut} ${rOut} 0 ${large} 1 ${p(rOut, a1)} L ${p(rIn, a1)} A ${rIn} ${rIn} 0 ${large} 0 ${p(rIn, a0)} Z`;
};

/** A marketing-strategy wheel; the Local SEO segment pops out. */
export const StrategyScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.strategy;
  const n = c.segments.length;
  const gap = 0.04;
  const pop = springIn({ frame, fps, delay: 56, config: springs.bouncy });

  return (
    <AbsoluteFill>
      <Background intensity={0.5} />
      <Stage exitAt={exitAt}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 100,
            width: 1700,
          }}
        >
          <div
            style={{
              position: "relative",
              width: SIZE,
              height: SIZE,
              flexShrink: 0,
            }}
          >
            <svg width={SIZE} height={SIZE} style={{ overflow: "visible" }}>
              {c.segments.map((s, i) => {
                const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / n + gap;
                const a1 = -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / n - gap;
                const grow = progress(frame, 10 + i * 6, 26 + i * 6);
                const mid = (a0 + a1) / 2;
                const out = i === 0 ? pop * 30 : 0;
                const dx = Math.cos(mid) * out;
                const dy = Math.sin(mid) * out;
                const lr = (R_OUT + R_IN) / 2;
                return (
                  <g
                    key={s}
                    transform={`translate(${dx} ${dy})`}
                    opacity={grow}
                  >
                    <path
                      d={arc(a0, a0 + (a1 - a0) * grow, R_OUT, R_IN, C, C)}
                      fill={i === 0 ? SEG_COLORS[0] : `${SEG_COLORS[i]}55`}
                      stroke={i === 0 ? "white" : "none"}
                      strokeWidth={i === 0 ? 3 * pop : 0}
                    />
                    <text
                      x={C + Math.cos(mid) * lr}
                      y={C + Math.sin(mid) * lr + 8}
                      textAnchor="middle"
                      fontFamily={fonts.body}
                      fontWeight={700}
                      fontSize={i === 0 ? 26 : 21}
                      fill={i === 0 ? colors.background : colors.text}
                    >
                      {s}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div
              style={{
                position: "absolute",
                left: C - 120,
                top: C - 60,
                width: 240,
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 26,
                lineHeight: 1.2,
                color: colors.textMuted,
                opacity: progress(frame, 30, 44),
              }}
            >
              {c.center}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <FadeIn delay={6}>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: typeScale.h1,
                  lineHeight: 1.05,
                  color: colors.text,
                }}
              >
                {c.lead}
              </div>
            </FadeIn>
            <FadeIn delay={40}>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: typeScale.h3 - 2,
                  lineHeight: 1.4,
                  color: colors.textMuted,
                }}
              >
                <span
                  style={{
                    color: colors.warm,
                    fontWeight: 700,
                    display: "inline-block",
                    transform: `scale(${mix(pop, 1, 1)})`,
                  }}
                >
                  Local SEO
                </span>
                {c.line.replace("Local SEO", "")}
              </div>
            </FadeIn>
          </div>
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
