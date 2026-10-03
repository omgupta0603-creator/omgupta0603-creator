import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Card, Check } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

/** A claim gets citation markers that link to reliable sources, plus a review stamp. */
export const TrustVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.trust;
  const claim = progress(frame, 8, 20);
  const srcAt = 34;
  const stamp = springIn({
    frame,
    fps,
    delay: srcAt + c.sources.length * 10 + 8,
    config: springs.bouncy,
  });

  return (
    <div
      style={{ width: 860, display: "flex", flexDirection: "column", gap: 22 }}
    >
      <Card style={{ padding: "26px 30px", opacity: claim }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 20,
            letterSpacing: 3,
            color: colors.textMuted,
            marginBottom: 10,
          }}
        >
          CLAIM
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 500,
            fontSize: 32,
            lineHeight: 1.35,
            color: colors.text,
          }}
        >
          {c.claim}
          {c.sources.map((_, i) => (
            <sup
              key={i}
              style={{
                marginLeft: 4,
                fontSize: 20,
                color,
                opacity: progress(frame, srcAt + i * 10, srcAt + i * 10 + 6),
              }}
            >
              [{i + 1}]
            </sup>
          ))}
          .
        </div>
      </Card>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {c.sources.map((s, i) => {
          const t = springIn({
            frame,
            fps,
            delay: srcAt + i * 10,
            config: springs.snappy,
          });
          return (
            <div
              key={s}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "14px 20px",
                borderRadius: 16,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                opacity: t,
                transform: `translateX(${mix(t, 40, 0)}px)`,
              }}
            >
              <div style={{ fontFamily: "monospace", fontSize: 22, color }}>
                [{i + 1}]
              </div>
              <div
                style={{
                  flex: 1,
                  fontFamily: fonts.body,
                  fontWeight: 500,
                  fontSize: 26,
                  color: colors.text,
                }}
              >
                {s}
              </div>
              <Check
                delay={srcAt + i * 10 + 4}
                color={colors.success}
                size={36}
              />
            </div>
          );
        })}
      </div>
      <div
        style={{
          alignSelf: "flex-end",
          padding: "10px 22px",
          borderRadius: 999,
          border: `2px solid ${colors.success}`,
          background: `${colors.success}22`,
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 24,
          color: colors.text,
          transform: `scale(${stamp}) rotate(${mix(stamp, -8, -3)}deg)`,
        }}
      >
        ✓ {c.updated}
      </div>
    </div>
  );
};
