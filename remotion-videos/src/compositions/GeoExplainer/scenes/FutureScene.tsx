import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background, FadeIn, Stage } from "../../../components";
import { colors, fonts, gradients, typeScale } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const COLS = [colors.primary, colors.accent, colors.success];

/** SEO, AEO and GEO circles move together; the overlap is a stronger visibility strategy. */
export const FutureScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.future;
  const join = springIn({ frame, fps, delay: 24, config: springs.heavy });
  const spread = mix(join, 2.2, 1);
  const center = springIn({ frame, fps, delay: 70, config: springs.bouncy });
  const R = 170;
  // Unit directions: SEO top-left, AEO top-right, GEO bottom.
  const dirs = [
    { x: -1, y: -0.62 },
    { x: 1, y: -0.62 },
    { x: 0, y: 0.9 },
  ];
  const C = { x: 500, y: 225 };

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
            height: 520,
            marginTop: 20,
          }}
        >
          {c.parts.map((p, i) => {
            const x = C.x + dirs[i].x * 115 * spread;
            const y = C.y + dirs[i].y * 105 * spread;
            return (
              <div
                key={p}
                style={{
                  position: "absolute",
                  left: x - R,
                  top: y - R,
                  width: R * 2,
                  height: R * 2,
                  borderRadius: R,
                  background: `${COLS[i]}33`,
                  border: `4px solid ${COLS[i]}`,
                  opacity: progress(frame, 4 + i * 5, 16 + i * 5),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 52,
                    color: colors.text,
                    transform: `translate(${dirs[i].x * 55}px, ${dirs[i].y * 60}px)`,
                  }}
                >
                  {p}
                </div>
              </div>
            );
          })}
          <div
            style={{
              position: "absolute",
              left: C.x,
              top: C.y,
              transform: `translate(-50%, -50%) scale(${center})`,
              width: 120,
              height: 120,
              borderRadius: 60,
              background: gradients.brand,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 56,
              color: "white",
              boxShadow: `0 0 60px ${colors.primary}`,
            }}
          >
            ✦
          </div>
        </div>
        <FadeIn delay={84}>
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
