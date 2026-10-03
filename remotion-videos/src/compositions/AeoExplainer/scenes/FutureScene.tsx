import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background, FadeIn, Stage } from "../../../components";
import { colors, fonts, gradients, typeScale } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

/** SEO and AEO circles slide together; their overlap is a stronger visibility strategy. */
export const FutureScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.future;
  const join = springIn({ frame, fps, delay: 24, config: springs.heavy });
  const offset = mix(join, 300, 120);
  const result = springIn({ frame, fps, delay: 70, config: springs.bouncy });
  const R = 200;

  return (
    <AbsoluteFill>
      <Background intensity={0.5} />
      <Stage exitAt={exitAt}>
        <FadeIn>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 500,
              fontSize: typeScale.h3,
              color: colors.textMuted,
            }}
          >
            {c.lead}
          </div>
        </FadeIn>
        <div
          style={{
            position: "relative",
            width: 1000,
            height: 460,
            marginTop: 30,
          }}
        >
          {[
            { label: c.left, col: colors.primary, dx: -offset },
            { label: c.right, col: colors.accent, dx: offset },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                position: "absolute",
                left: 500 - R + s.dx,
                top: 230 - R,
                width: R * 2,
                height: R * 2,
                borderRadius: R,
                background: `${s.col}40`,
                border: `4px solid ${s.col}`,
                display: "flex",
                alignItems: "center",
                justifyContent: s.dx < 0 ? "flex-start" : "flex-end",
                padding: "0 70px",
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 64,
                color: colors.text,
                opacity: progress(frame, 4, 16),
              }}
            >
              {s.label}
            </div>
          ))}
          <div
            style={{
              position: "absolute",
              left: 500,
              top: 230,
              transform: `translate(-50%, -50%) scale(${result})`,
              width: 150,
              height: 150,
              borderRadius: 75,
              background: gradients.brand,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 60,
              color: "white",
              boxShadow: `0 0 60px ${colors.primary}`,
            }}
          >
            +
          </div>
        </div>
        <FadeIn delay={82}>
          <div
            style={{
              padding: "16px 34px",
              borderRadius: 999,
              background: `${colors.success}22`,
              border: `2px solid ${colors.success}`,
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 36,
              color: colors.text,
            }}
          >
            ↗ {c.result}
          </div>
        </FadeIn>
      </Stage>
    </AbsoluteFill>
  );
};
