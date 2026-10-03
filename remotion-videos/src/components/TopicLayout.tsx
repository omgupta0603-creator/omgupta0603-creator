import React from "react";
import { AbsoluteFill } from "remotion";
import { AnimatedText } from "./AnimatedText";
import { Background } from "./Background";
import { FadeIn } from "./FadeIn";
import { Stage } from "./Stage";
import { colors, fonts, typeScale } from "../theme/theme";

/** Numbered topic layout: big outline number, title and body on the left, a visual on the right. */
export const TopicLayout: React.FC<{
  number: string;
  title: string;
  body: string;
  color: string;
  exitAt?: number;
  children: React.ReactNode;
}> = ({ number, title, body, color, exitAt, children }) => (
  <AbsoluteFill>
    <Background intensity={0.4} />
    <Stage exitAt={exitAt}>
      <div
        style={{
          display: "flex",
          width: 1680,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: 720,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <FadeIn from="left">
            <div
              style={{
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 140,
                lineHeight: 1,
                color: "transparent",
                WebkitTextStroke: `3px ${color}`,
              }}
            >
              {number}
            </div>
          </FadeIn>
          <AnimatedText
            text={title}
            delay={6}
            fontSize={typeScale.h1}
            align="left"
          />
          <FadeIn delay={18}>
            <div
              style={{
                width: 120,
                height: 8,
                borderRadius: 8,
                background: color,
                marginBottom: 8,
              }}
            />
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: typeScale.h3 - 6,
                lineHeight: 1.35,
                color: colors.textMuted,
              }}
            >
              {body}
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={10} from="right" distance={80}>
          {children}
        </FadeIn>
      </div>
    </Stage>
  </AbsoluteFill>
);
