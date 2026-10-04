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

/** An AI chat: the user asks; the AI writes an answer that mentions brands and cites sources. */
export const ExampleScene: React.FC<{
  exitAt?: number;
  durationInFrames: number;
}> = ({ exitAt, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.example;
  const qEnd = 12 + c.question.length * 0.7;
  const qChars = Math.floor(
    interpolate(frame, [12, qEnd], [0, c.question.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const thinkAt = qEnd + 6;
  const aStart = thinkAt + 20;
  const introChars = Math.floor(
    interpolate(
      frame,
      [aStart, aStart + c.intro.length / 3],
      [0, c.intro.length],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    ),
  );
  const brandsAt = aStart + c.intro.length / 3 + 4;
  const srcAt = brandsAt + c.brands.length * 10 + 6;
  const nextAt = Math.max(srcAt + 30, durationInFrames - 96);
  const next = springIn({ frame, fps, delay: nextAt, config: springs.bouncy });
  const thinking = frame >= thinkAt && frame < aStart;

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
              marginBottom: 22,
              textAlign: "center",
            }}
          >
            {c.label.toUpperCase()}
          </div>
        </FadeIn>
        <div
          style={{
            width: 1200,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              alignSelf: "flex-end",
              maxWidth: 820,
              padding: "18px 24px",
              borderRadius: "24px 24px 6px 24px",
              background: colors.primary,
              fontFamily: fonts.body,
              fontSize: 28,
              color: "white",
              opacity: progress(frame, 6, 12),
            }}
          >
            {c.question.slice(0, qChars)}
          </div>
          <div
            style={{
              alignSelf: "flex-start",
              width: 1000,
              padding: "22px 26px",
              borderRadius: "24px 24px 24px 6px",
              background: "#FFFFFF",
              boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              opacity: progress(frame, thinkAt, thinkAt + 6),
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: 20,
                color: colors.primary,
              }}
            >
              ✦ AI answer{" "}
              {thinking ? (
                <span style={{ color: "#9AA0A6" }}>
                  {".".repeat(1 + (Math.floor(frame / 6) % 3))}
                </span>
              ) : null}
            </div>
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 26,
                color: "#202124",
                minHeight: 34,
              }}
            >
              {c.intro.slice(0, introChars)}
            </div>
            {c.brands.map((b, i) => {
              const t = springIn({
                frame,
                fps,
                delay: brandsAt + i * 10,
                config: springs.snappy,
              });
              const you = "you" in b && b.you;
              return (
                <div
                  key={b.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "10px 14px",
                    borderRadius: 12,
                    background: you ? `${colors.success}22` : "#F1F3F4",
                    border: you
                      ? `2px solid ${colors.success}`
                      : "2px solid transparent",
                    opacity: t,
                    transform: `translateX(${mix(t, 30, 0)}px)`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: 24,
                      color: "#111827",
                      width: 160,
                    }}
                  >
                    {i + 1}. {b.name}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 22,
                      color: "#4D5156",
                    }}
                  >
                    {b.note}
                  </div>
                  {you ? (
                    <div
                      style={{
                        marginLeft: "auto",
                        fontFamily: fonts.body,
                        fontWeight: 700,
                        fontSize: 18,
                        color: "#0B7A55",
                      }}
                    >
                      ✓ Your brand is mentioned
                    </div>
                  ) : null}
                </div>
              );
            })}
            <div
              style={{
                display: "flex",
                gap: 10,
                opacity: progress(frame, srcAt, srcAt + 10),
              }}
            >
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: 17,
                  color: "#70757A",
                }}
              >
                Sources:
              </span>
              {c.sources.map((s) => (
                <span
                  key={s}
                  style={{
                    padding: "3px 10px",
                    borderRadius: 999,
                    background: "#F1F3F4",
                    fontFamily: fonts.body,
                    fontSize: 16,
                    color: "#4D5156",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 26,
            padding: "12px 28px",
            borderRadius: 999,
            background: `${colors.warm}26`,
            border: `2px solid ${colors.warm}`,
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 32,
            color: colors.text,
            transform: `scale(${next})`,
          }}
        >
          {c.next}
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
