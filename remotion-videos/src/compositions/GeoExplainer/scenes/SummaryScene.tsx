import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  AnimatedText,
  Background,
  Card,
  FadeIn,
  Stage,
} from "../../../components";
import { colors, fonts, typeScale } from "../../../theme/theme";
import { progress } from "../../../utils/animation";
import { content } from "../content";

const COLS = [colors.primary, colors.accent, colors.success];

/** Three cards: what SEO, AEO and GEO each focus on. */
export const SummaryScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const c = content.summary;
  return (
    <AbsoluteFill>
      <Background intensity={0.5} />
      <Stage exitAt={exitAt}>
        <AnimatedText text={c.heading} fontSize={typeScale.h1} />
        <div style={{ display: "flex", gap: 36, marginTop: 70 }}>
          {c.cards.map((card, i) => {
            const d = 20 + i * 40;
            const lit = progress(frame, d + 10, d + 22);
            return (
              <FadeIn key={card.name} delay={d} distance={70}>
                <Card
                  style={{
                    width: 500,
                    height: 380,
                    padding: 40,
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                    borderColor: COLS[i],
                    boxShadow: `0 0 ${lit * 50}px ${COLS[i]}55`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: 96,
                      lineHeight: 1,
                      color: COLS[i],
                    }}
                  >
                    {card.name}
                  </div>
                  <div
                    style={{
                      width: 70,
                      height: 6,
                      borderRadius: 3,
                      background: COLS[i],
                    }}
                  />
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 500,
                      fontSize: 38,
                      lineHeight: 1.25,
                      color: colors.text,
                    }}
                  >
                    {card.focus}
                  </div>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
