import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background, Card, FadeIn, Stage } from "../../../components";
import { colors, fonts, typeScale } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

/** Great content → crawler blocked → search visibility stays near zero. */
export const ExampleScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.example;
  const contentIn = springIn({ frame, fps, delay: 12, config: springs.snappy });
  const arrow1 = progress(frame, 36, 50);
  const block = springIn({ frame, fps, delay: 52, config: springs.bouncy });
  const arrow2 = progress(frame, 74, 88);
  const vis = springIn({ frame, fps, delay: 88, config: springs.snappy });
  const bar = progress(frame, 96, 120);

  const Arrow: React.FC<{ t: number }> = ({ t }) => (
    <svg width={120} height={40}>
      <path
        d="M 6 20 H 100"
        stroke={colors.textMuted}
        strokeWidth={5}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - t}
      />
      <path
        d="M 92 10 L 108 20 L 92 30"
        fill="none"
        stroke={colors.textMuted}
        strokeWidth={5}
        strokeLinecap="round"
        opacity={t > 0.95 ? 1 : 0}
      />
    </svg>
  );

  return (
    <AbsoluteFill>
      <Background intensity={0.4} />
      <Stage exitAt={exitAt}>
        <FadeIn distance={20}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.caption,
              letterSpacing: 6,
              color: colors.textMuted,
              marginBottom: 60,
            }}
          >
            {c.label.toUpperCase()}
          </div>
        </FadeIn>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Card
            style={{
              width: 440,
              height: 380,
              padding: 34,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              opacity: contentIn,
              transform: `scale(${mix(contentIn, 0.9, 1)})`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 40,
                color: colors.warm,
                letterSpacing: 6,
              }}
            >
              ★★★★★
            </div>
            <div
              style={{
                height: 18,
                width: "70%",
                borderRadius: 9,
                background: colors.primary,
              }}
            />
            {[1, 0.92, 0.97, 0.8, 0.9, 0.6].map((w, i) => (
              <div
                key={i}
                style={{
                  height: 12,
                  width: `${w * 100}%`,
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.2)",
                }}
              />
            ))}
            <div
              style={{
                marginTop: "auto",
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 34,
                color: colors.text,
              }}
            >
              {c.content}
            </div>
          </Card>
          <Arrow t={arrow1} />
          <Card
            style={{
              width: 400,
              height: 380,
              padding: 34,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              borderColor: colors.danger,
              opacity: block,
              transform: `scale(${mix(block, 0.8, 1)})`,
            }}
          >
            <div style={{ position: "relative" }}>
              <svg width={120} height={120} viewBox="0 0 24 24">
                <rect
                  x={4}
                  y={7}
                  width={16}
                  height={12}
                  rx={3}
                  fill="none"
                  stroke={colors.text}
                  strokeWidth={1.5}
                />
                <circle cx={9} cy={13} r={1.5} fill={colors.text} />
                <circle cx={15} cy={13} r={1.5} fill={colors.text} />
                <path d="M12 7 V3" stroke={colors.text} strokeWidth={1.5} />
              </svg>
              <div
                style={{
                  position: "absolute",
                  right: -16,
                  bottom: -6,
                  width: 62,
                  height: 62,
                  borderRadius: 31,
                  background: colors.danger,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  color: "white",
                  fontFamily: fonts.display,
                  fontWeight: 700,
                }}
              >
                ✕
              </div>
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 32,
                color: colors.text,
                textAlign: "center",
              }}
            >
              {c.blocked}
            </div>
          </Card>
          <Arrow t={arrow2} />
          <Card
            style={{
              width: 400,
              height: 380,
              padding: 34,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 22,
              opacity: vis,
              transform: `scale(${mix(vis, 0.8, 1)})`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 22,
                letterSpacing: 3,
                color: colors.textMuted,
              }}
            >
              SEARCH VISIBILITY
            </div>
            <div
              style={{
                height: 26,
                borderRadius: 13,
                background: colors.border,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: `${mix(bar, 0, 100)}%`,
                  borderRadius: 13,
                  border: `2px dashed ${colors.success}`,
                }}
              />
              <div
                style={{
                  width: `${mix(bar, 0, 6)}%`,
                  height: "100%",
                  borderRadius: 13,
                  background: colors.danger,
                }}
              />
            </div>
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 24,
                color: colors.textMuted,
              }}
            >
              <span style={{ color: colors.danger, fontWeight: 700 }}>
                Missing out on
              </span>{" "}
              the {c.result.toLowerCase()}
            </div>
          </Card>
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
