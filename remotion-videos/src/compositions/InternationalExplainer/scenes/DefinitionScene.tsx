import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  AnimatedText,
  Background,
  FadeIn,
  Pill,
  Stage,
} from "../../../components";
import { colors, fonts, gradients, typeScale } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const GLOBE = 300;

const Globe: React.FC<{ color: string; scale: number }> = ({
  color,
  scale,
}) => {
  const frame = useCurrentFrame();
  const spin = (frame * 0.8) % 90;
  const r = GLOBE / 2 - 6;
  const c = GLOBE / 2;
  return (
    <svg width={GLOBE} height={GLOBE} style={{ transform: `scale(${scale})` }}>
      <circle
        cx={c}
        cy={c}
        r={r}
        fill={`${color}22`}
        stroke={color}
        strokeWidth={5}
      />
      {[0, 30, 60].map((o) => (
        <ellipse
          key={o}
          cx={c}
          cy={c}
          rx={Math.abs(Math.cos(((o + spin) / 90) * Math.PI)) * r}
          ry={r}
          fill="none"
          stroke={color}
          strokeWidth={3}
          opacity={0.7}
        />
      ))}
      {[-0.5, 0, 0.5].map((k) => {
        const y = k * r;
        const half = Math.sqrt(r * r - y * y);
        return (
          <line
            key={k}
            x1={c - half}
            x2={c + half}
            y1={c + y}
            y2={c + y}
            stroke={color}
            strokeWidth={3}
            opacity={0.7}
          />
        );
      })}
    </svg>
  );
};

/** Globe in the middle; arcs reach three localized page versions. */
export const DefinitionScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.definition;
  const globe = springIn({ frame, fps, delay: 30, config: springs.bouncy });
  const pageColors = [colors.warm, colors.primary, colors.secondary];
  const W = 1500;
  const H = 420;
  const pages = [
    { x: 230, y: 210 },
    { x: 750, y: 360 },
    { x: 1270, y: 210 },
  ];

  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
        <AnimatedText
          text="International SEO"
          fontSize={typeScale.h2}
          gradient={gradients.brand}
        />
        <FadeIn delay={10} style={{ marginTop: 14 }}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.body + 2,
              color: colors.textMuted,
            }}
          >
            {c.lead}
          </div>
        </FadeIn>
        <div style={{ display: "flex", gap: 18, marginTop: 24 }}>
          {c.targets.map((t, i) => (
            <Pill
              key={t}
              color={pageColors[i]}
              delay={18 + i * 6}
              fontSize={30}
            >
              {t}
            </Pill>
          ))}
        </div>
        <div
          style={{ position: "relative", width: W, height: H, marginTop: 20 }}
        >
          <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
            {pages.map((p, i) => {
              const d = progress(frame, 50 + i * 8, 66 + i * 8);
              return (
                <path
                  key={i}
                  d={`M ${W / 2} 110 Q ${(W / 2 + p.x) / 2} ${i === 1 ? 240 : 40}, ${p.x} ${p.y - 50}`}
                  fill="none"
                  stroke={pageColors[i]}
                  strokeWidth={4}
                  strokeDasharray="10 10"
                  opacity={d}
                  pathLength={1}
                />
              );
            })}
          </svg>
          <div
            style={{ position: "absolute", left: W / 2 - GLOBE / 2, top: -40 }}
          >
            <Globe color={colors.secondary} scale={mix(globe, 0, 0.55)} />
          </div>
          {pages.map((p, i) => {
            const t = springIn({
              frame,
              fps,
              delay: 62 + i * 8,
              config: springs.snappy,
            });
            return (
              <div
                key={c.pages[i].code}
                style={{
                  position: "absolute",
                  left: p.x,
                  top: p.y,
                  transform: `translate(-50%, -50%) scale(${t})`,
                  width: 300,
                  padding: "18px 22px",
                  borderRadius: 20,
                  background: colors.backgroundAlt,
                  border: `2px solid ${pageColors[i]}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 26,
                    fontWeight: 700,
                    color: pageColors[i],
                  }}
                >
                  /{c.pages[i].code}/
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 24,
                    color: colors.text,
                  }}
                >
                  {c.pages[i].label}
                </div>
              </div>
            );
          })}
        </div>
        <FadeIn delay={96}>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 500,
              fontSize: typeScale.h3 - 6,
              color: colors.text,
            }}
          >
            {c.caption}
          </div>
        </FadeIn>
      </Stage>
    </AbsoluteFill>
  );
};
