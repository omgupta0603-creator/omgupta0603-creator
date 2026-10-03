import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background, Card, FadeIn, Stage } from "../../../components";
import { colors, fonts, gradients, typeScale } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

/** A ranked list of links: "appear in search results". */
const ResultsIcon: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{ width: 300, display: "flex", flexDirection: "column", gap: 12 }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            opacity: progress(frame, delay + i * 5, delay + i * 5 + 8),
          }}
        >
          <div
            style={{
              height: 12,
              width: `${80 - i * 10}%`,
              borderRadius: 6,
              background: "#8AB4F8",
            }}
          />
          <div
            style={{
              height: 8,
              width: "95%",
              borderRadius: 4,
              background: "rgba(255,255,255,0.18)",
            }}
          />
        </div>
      ))}
    </div>
  );
};

/** A chat-style answer bubble: "answers the question directly". */
const AnswerIcon: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const t = progress(frame, delay, delay + 12);
  return (
    <div
      style={{ width: 300, display: "flex", flexDirection: "column", gap: 10 }}
    >
      <div
        style={{
          alignSelf: "flex-end",
          padding: "8px 14px",
          borderRadius: "14px 14px 4px 14px",
          background: "rgba(255,255,255,0.15)",
          fontFamily: fonts.body,
          fontSize: 18,
          color: colors.text,
          opacity: t,
        }}
      >
        What is…?
      </div>
      <div
        style={{
          padding: "12px 14px",
          borderRadius: "14px 14px 14px 4px",
          background: `${colors.accent}33`,
          border: `2px solid ${colors.accent}`,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          opacity: progress(frame, delay + 8, delay + 20),
        }}
      >
        <div
          style={{
            height: 10,
            width: "92%",
            borderRadius: 5,
            background: colors.text,
          }}
        />
        <div
          style={{
            height: 10,
            width: "70%",
            borderRadius: 5,
            background: "rgba(255,255,255,0.6)",
          }}
        />
      </div>
    </div>
  );
};

export const CompareScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.compare;
  const vs = springIn({ frame, fps, delay: 44, config: springs.bouncy });
  const cards = [
    {
      ...c.seo,
      color: colors.primary,
      delay: 10,
      icon: <ResultsIcon delay={22} />,
    },
    {
      ...c.aeo,
      color: colors.accent,
      delay: 52,
      icon: <AnswerIcon delay={64} />,
    },
  ];

  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
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
                    height: 540,
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
                      maxWidth: 540,
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
