import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background, Card, FadeIn, Stage } from "../../../components";
import { colors, fonts, gradients, typeScale } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

/** Browser wireframe being tuned: "optimizing our own website". */
const OnPageIcon: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        width: 260,
        height: 170,
        borderRadius: 16,
        background: colors.backgroundAlt,
        border: `1px solid ${colors.border}`,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", gap: 6 }}>
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
          <div
            key={c}
            style={{ width: 10, height: 10, borderRadius: 5, background: c }}
          />
        ))}
      </div>
      {[0.8, 1, 0.9, 0.6].map((w, i) => (
        <div
          key={i}
          style={{
            height: 14,
            borderRadius: 7,
            width: `${w * 100}%`,
            background:
              progress(frame, delay + i * 6, delay + i * 6 + 10) > 0.5
                ? colors.primary
                : "rgba(255,255,255,0.18)",
          }}
        />
      ))}
    </div>
  );
};

/** Network of sites around yours: "reputation across the internet". */
const OffPageIcon: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const nodes = [
    [40, 40],
    [220, 30],
    [250, 140],
    [30, 150],
    [135, 165],
  ];
  return (
    <svg width={270} height={190}>
      {nodes.map(([x, y], i) => (
        <line
          key={i}
          x1={x}
          y1={y}
          x2={135}
          y2={92}
          stroke={colors.accent}
          strokeWidth={3}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={
            1 - progress(frame, delay + i * 5, delay + i * 5 + 12)
          }
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={14}
          fill={colors.backgroundAlt}
          stroke={colors.accent}
          strokeWidth={3}
        />
      ))}
      <circle cx={135} cy={92} r={30} fill={colors.accent} />
    </svg>
  );
};

export const CompareScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.compare;
  const vs = springIn({ frame, fps, delay: 40, config: springs.bouncy });
  const cards = [
    {
      ...c.onPage,
      color: colors.primary,
      delay: 10,
      icon: <OnPageIcon delay={22} />,
    },
    {
      ...c.offPage,
      color: colors.accent,
      delay: 48,
      icon: <OffPageIcon delay={60} />,
    },
  ];

  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
        <FadeIn distance={20}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.caption,
              letterSpacing: 6,
              color: colors.textMuted,
              marginBottom: 50,
            }}
          >
            {c.label.toUpperCase()}
          </div>
        </FadeIn>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {cards.map((card, i) => (
            <React.Fragment key={card.title}>
              {i === 1 ? (
                <div
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 55,
                    background: gradients.brand,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 40,
                    color: "white",
                    transform: `scale(${vs}) rotate(${mix(vs, -90, 0)}deg)`,
                  }}
                >
                  vs
                </div>
              ) : null}
              <FadeIn
                delay={card.delay}
                from={i === 0 ? "left" : "right"}
                distance={80}
              >
                <Card
                  style={{
                    width: 680,
                    height: 520,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 30,
                    borderColor: card.color,
                  }}
                >
                  {card.icon}
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: typeScale.h3 + 8,
                      color: card.color,
                    }}
                  >
                    {card.title}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 34,
                      lineHeight: 1.35,
                      color: colors.text,
                      textAlign: "center",
                      maxWidth: 520,
                    }}
                  >
                    {card.body}
                  </div>
                </Card>
              </FadeIn>
            </React.Fragment>
          ))}
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
