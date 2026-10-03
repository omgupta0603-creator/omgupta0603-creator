import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  AnimatedText,
  Background,
  Card,
  FadeIn,
  Stage,
} from "../../../components";
import { colors, fonts, typeScale } from "../../../theme/theme";
import { mix, springIn, springs, stagger } from "../../../utils/animation";
import { content } from "../content";
import { Pill } from "../../../components";

const Globe: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const spin = (frame * 0.8) % 90; // meridians slide to fake rotation
  return (
    <svg width={200} height={200} viewBox="0 0 200 200">
      <circle
        cx={100}
        cy={100}
        r={90}
        fill={`${color}22`}
        stroke={color}
        strokeWidth={4}
      />
      {[0, 30, 60].map((o) => {
        const rx = Math.abs(Math.cos(((o + spin) / 90) * Math.PI)) * 90;
        return (
          <ellipse
            key={o}
            cx={100}
            cy={100}
            rx={rx}
            ry={90}
            fill="none"
            stroke={color}
            strokeWidth={2.5}
            opacity={0.7}
          />
        );
      })}
      {[-45, 0, 45].map((y) => {
        const half = Math.sqrt(90 * 90 - y * y);
        return (
          <line
            key={y}
            x1={100 - half}
            x2={100 + half}
            y1={100 + y}
            y2={100 + y}
            stroke={color}
            strokeWidth={2.5}
            opacity={0.7}
          />
        );
      })}
    </svg>
  );
};

const Storefront: React.FC<{ color: string; delay: number }> = ({
  color,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const labels = ["Category", "Product", "Product"];
  return (
    <div
      style={{ display: "flex", gap: 18, height: 200, alignItems: "flex-end" }}
    >
      {labels.map((label, i) => {
        const t = springIn({
          frame,
          fps,
          delay: stagger(i, 6, delay),
          config: springs.snappy,
        });
        const isCat = i === 0;
        return (
          <div
            key={i}
            style={{
              width: 150,
              height: isCat ? 190 : 170,
              borderRadius: 18,
              background: colors.backgroundAlt,
              border: `2px solid ${isCat ? color : colors.border}`,
              padding: 14,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              opacity: t,
              transform: `translateY(${mix(t, 50, 0)}px)`,
            }}
          >
            <div
              style={{
                flex: 1,
                borderRadius: 10,
                background: `linear-gradient(135deg, ${color}66, ${colors.primary}44)`,
              }}
            />
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 20,
                fontWeight: 500,
                color: colors.text,
              }}
            >
              {label}
            </div>
            <div
              style={{
                height: 10,
                width: "60%",
                borderRadius: 5,
                background: "rgba(255,255,255,0.2)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export const MoreTypesScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const c = content.more;
  const cards = [
    { ...c.international, color: colors.secondary, number: "05", delay: 12 },
    { ...c.ecommerce, color: colors.accent, number: "06", delay: 26 },
  ];
  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
        <AnimatedText text={c.heading} fontSize={typeScale.h1} />
        <div style={{ display: "flex", gap: 56, marginTop: 64 }}>
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={card.delay} distance={80}>
              <Card
                style={{
                  width: 740,
                  height: 600,
                  display: "flex",
                  flexDirection: "column",
                  gap: 22,
                }}
              >
                <div
                  style={{ height: 210, display: "flex", alignItems: "center" }}
                >
                  {i === 0 ? (
                    <Globe color={card.color} />
                  ) : (
                    <Storefront color={card.color} delay={card.delay + 10} />
                  )}
                </div>
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 30,
                    color: card.color,
                    letterSpacing: 2,
                  }}
                >
                  {card.number}
                </div>
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: typeScale.h3 + 8,
                    color: colors.text,
                  }}
                >
                  {card.title}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 30,
                    lineHeight: 1.4,
                    color: colors.textMuted,
                  }}
                >
                  {card.body}
                </div>
                {i === 0 ? (
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {c.international.tags.map((t, j) => (
                      <Pill
                        key={t}
                        color={card.color}
                        delay={card.delay + 20 + j * 4}
                        fontSize={22}
                      >
                        {t}
                      </Pill>
                    ))}
                  </div>
                ) : null}
              </Card>
            </FadeIn>
          ))}
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
