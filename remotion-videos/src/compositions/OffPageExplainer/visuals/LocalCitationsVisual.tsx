import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Card, Check } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

/** The same business details across several directories, then reviews counting up. */
export const LocalCitationsVisual: React.FC<{ color: string }> = ({
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.local;
  const reviewsAt = 20 + c.directories.length * 14 + 10;
  const reviewsIn = springIn({
    frame,
    fps,
    delay: reviewsAt,
    config: springs.snappy,
  });
  const count = progress(frame, reviewsAt + 4, reviewsAt + 40);

  return (
    <div
      style={{ width: 840, display: "flex", flexDirection: "column", gap: 22 }}
    >
      {c.directories.map((d, i) => {
        const delay = 20 + i * 14;
        const t = springIn({ frame, fps, delay, config: springs.snappy });
        return (
          <div
            key={d}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              padding: "20px 26px",
              borderRadius: 20,
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              opacity: t,
              transform: `translateX(${mix(t, 60, 0)}px)`,
            }}
          >
            <Check delay={delay + 8} color={colors.success} size={44} />
            <div
              style={{
                width: 330,
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: 24,
                whiteSpace: "nowrap",
                color: colors.text,
              }}
            >
              {d}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {c.fields.map((f) => (
                <div
                  key={f}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: `${color}22`,
                    border: `1px solid ${color}`,
                    fontFamily: fonts.body,
                    fontSize: 18,
                    color: colors.text,
                  }}
                >
                  {f}
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <Card
        style={{
          padding: "24px 30px",
          display: "flex",
          alignItems: "center",
          gap: 26,
          opacity: reviewsIn,
          transform: `scale(${mix(reviewsIn, 0.9, 1)})`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 64,
            color: colors.text,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {(c.rating * Math.min(1, count * 1.2)).toFixed(1)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2, 3, 4].map((s) => (
              <svg key={s} width={36} height={36} viewBox="0 0 24 24">
                <path
                  d="M12 2 L14.9 8.6 L22 9.3 L16.6 14 L18.2 21 L12 17.3 L5.8 21 L7.4 14 L2 9.3 L9.1 8.6 Z"
                  fill={count * 5 > s ? colors.warm : "transparent"}
                  stroke={colors.warm}
                  strokeWidth={1.5}
                />
              </svg>
            ))}
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 24,
              color: colors.textMuted,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {Math.round(c.reviews * count)} genuine customer reviews
          </div>
        </div>
      </Card>
    </div>
  );
};
