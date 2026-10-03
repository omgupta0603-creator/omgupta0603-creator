import React from "react";
import { AbsoluteFill } from "remotion";
import { Background, FadeIn, Highlight, Stage } from "../components";
import { colors, fonts, gradients, typeScale } from "../theme/theme";

/** Closing quote; phrases `a` and `b` get animated marker underlines. */
export const QuoteSummary: React.FC<{
  lead: string;
  a: string;
  joiner: string;
  b: string;
  exitAt?: number;
}> = ({ exitAt, ...c }) => {
  return (
    <AbsoluteFill>
      <Background intensity={0.55} />
      <Stage exitAt={exitAt}>
        <FadeIn>
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: 200,
              lineHeight: 0.6,
              color: colors.primary,
              textAlign: "center",
            }}
          >
            “
          </div>
        </FadeIn>
        <FadeIn delay={6} style={{ maxWidth: 1500 }}>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 500,
              fontSize: typeScale.h2,
              lineHeight: 1.3,
              color: colors.textMuted,
              textAlign: "center",
            }}
          >
            {c.lead}{" "}
            <Highlight start={30} gradient={gradients.brand}>
              {c.a}
            </Highlight>{" "}
            {c.joiner}{" "}
            <Highlight start={60} gradient={gradients.hot}>
              {c.b}
            </Highlight>
          </div>
        </FadeIn>
      </Stage>
    </AbsoluteFill>
  );
};
