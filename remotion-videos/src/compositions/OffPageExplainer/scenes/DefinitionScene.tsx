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
import { float, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

/** Your website in the middle; a dashed boundary; the goals appear outside it. */
export const DefinitionScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.definition;
  const site = springIn({ frame, fps, delay: 18, config: springs.bouncy });
  const ring = progress(frame, 26, 56);
  const colorsList = [
    colors.primary,
    colors.secondary,
    colors.accent,
    colors.warm,
  ];

  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
        <div
          style={{
            position: "absolute",
            top: 70,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <AnimatedText
            text="Off-Page SEO"
            fontSize={typeScale.h2}
            gradient={gradients.brand}
          />
          <FadeIn delay={10}>
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
        </div>
        <div
          style={{
            position: "relative",
            width: 1200,
            height: 700,
            marginTop: 160,
          }}
        >
          <svg
            width={1200}
            height={700}
            style={{ position: "absolute", inset: 0 }}
          >
            <circle
              cx={600}
              cy={350}
              r={190}
              fill="none"
              stroke={colors.textMuted}
              strokeWidth={3}
              strokeDasharray="14 12"
              opacity={ring * 0.7}
              transform={`rotate(${frame * 0.3} 600 350)`}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              left: 600,
              top: 350,
              transform: `translate(-50%, -50%) scale(${site})`,
              width: 230,
              height: 160,
              borderRadius: 20,
              background: colors.backgroundAlt,
              border: `1px solid ${colors.border}`,
              boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              {["#FF5F57", "#FEBC2E", "#28C840"].map((col) => (
                <div
                  key={col}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    background: col,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 30,
                color: colors.text,
              }}
            >
              {c.site}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: 600,
              top: 350 + 205,
              transform: "translateX(-50%)",
              fontFamily: fonts.body,
              fontSize: 20,
              letterSpacing: 5,
              color: colors.textMuted,
              opacity: ring,
            }}
          >
            {c.outside}
          </div>
          {c.goals.map((g, i) => {
            // Four corners around the boundary, clearly outside it.
            const pos = [
              { x: 260, y: 150 },
              { x: 940, y: 150 },
              { x: 260, y: 550 },
              { x: 940, y: 550 },
            ][i];
            return (
              <div
                key={g}
                style={{
                  position: "absolute",
                  left: pos.x,
                  top: pos.y + float(frame, 120, 6, i * 20),
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Pill color={colorsList[i]} delay={44 + i * 10} fontSize={34}>
                  {g}
                </Pill>
              </div>
            );
          })}
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
