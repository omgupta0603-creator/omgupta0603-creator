import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background, FadeIn, Stage } from "../../../components";
import { colors, fonts, typeScale } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const ROW = 128;

/** A query is typed into a search bar; results appear and the business climbs to #1. */
export const SearchExampleScene: React.FC<{ exitAt?: number }> = ({
  exitAt,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.example;

  const typeStart = 14;
  const typeEnd = typeStart + c.query.length * 1.6;
  const chars = Math.floor(
    interpolate(frame, [typeStart, typeEnd], [0, c.query.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const cursorOn =
    frame < typeEnd + 10 ? Math.floor(frame / 12) % 2 === 0 : false;

  const resultsStart = Math.round(typeEnd) + 10;
  const climbStart = resultsStart + 40;
  const climb = springIn({
    frame,
    fps,
    delay: climbStart,
    config: springs.snappy,
  });
  // Ranks: before → after the climb. "You" moves from 3rd to 1st.
  const before = [0, 1, 2];
  const after = [1, 2, 0];

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
              marginBottom: 28,
              textAlign: "center",
            }}
          >
            {c.label.toUpperCase()}
          </div>
        </FadeIn>
        <FadeIn delay={4}>
          <div
            style={{
              width: 1100,
              height: 104,
              borderRadius: 52,
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              gap: 24,
              padding: "0 40px",
              boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
            }}
          >
            <svg width={40} height={40} viewBox="0 0 24 24">
              <circle
                cx={10}
                cy={10}
                r={7}
                fill="none"
                stroke="#5F6368"
                strokeWidth={2.5}
              />
              <path
                d="M15 15 L21 21"
                stroke="#5F6368"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            </svg>
            <div
              style={{ fontFamily: fonts.body, fontSize: 44, color: "#202124" }}
            >
              {c.query.slice(0, chars)}
              <span
                style={{ opacity: cursorOn ? 1 : 0, color: colors.primary }}
              >
                |
              </span>
            </div>
          </div>
        </FadeIn>

        <div
          style={{
            position: "relative",
            width: 1100,
            height: ROW * 3,
            marginTop: 40,
          }}
        >
          {c.results.map((r, i) => {
            const appear = springIn({
              frame,
              fps,
              delay: resultsStart + i * 6,
              config: springs.smooth,
            });
            const isYou = "isYou" in r && r.isYou;
            const y = mix(climb, before[i], after[i]) * ROW;
            const glow = isYou
              ? progress(frame, climbStart, climbStart + 20)
              : 0;
            return (
              <div
                key={r.url}
                style={{
                  position: "absolute",
                  left: 0,
                  top: y,
                  width: 1100,
                  height: ROW - 20,
                  borderRadius: 24,
                  padding: "0 36px",
                  display: "flex",
                  alignItems: "center",
                  gap: 28,
                  background: isYou
                    ? `rgba(108,92,255,${0.12 + glow * 0.18})`
                    : colors.surface,
                  border: `2px solid ${isYou ? `rgba(108,92,255,${0.4 + glow * 0.6})` : colors.border}`,
                  opacity: appear,
                  transform: `translateY(${mix(appear, 40, 0)}px) scale(${1 + glow * 0.03})`,
                  zIndex: isYou ? 2 : 1,
                  boxShadow: isYou
                    ? `0 20px 60px rgba(108,92,255,${glow * 0.45})`
                    : undefined,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 40,
                    color: colors.textMuted,
                    width: 50,
                  }}
                >
                  {Math.round(mix(climb, before[i], after[i])) + 1}
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 22,
                      color: colors.textMuted,
                    }}
                  >
                    {r.url}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontWeight: 700,
                      fontSize: 32,
                      color: isYou ? colors.text : "#8AB4F8",
                    }}
                  >
                    {r.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <FadeIn delay={climbStart + 16} style={{ marginTop: 24 }}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.body,
              color: colors.textMuted,
              textAlign: "center",
            }}
          >
            {c.caption}
          </div>
        </FadeIn>
      </Stage>
    </AbsoluteFill>
  );
};
