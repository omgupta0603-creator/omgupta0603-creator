import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Card } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";
import { Stars } from "./Stars";

/** Review cards arrive one by one while the average rating and count rise. */
export const ReviewsVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.reviews;
  const start = 26;
  const step = 18;
  const t = progress(frame, start, start + c.items.length * step + 20);
  const rating = mix(t, c.from, c.to);

  return (
    <div style={{ width: 840, display: "flex", gap: 30, alignItems: "center" }}>
      <Card
        style={{
          width: 280,
          padding: 34,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 96,
            lineHeight: 1,
            color: colors.text,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {rating.toFixed(1)}
        </div>
        <Stars filled={Math.round(rating)} size={34} />
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 22,
            color: colors.textMuted,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {Math.round(mix(t, 98, c.count))} reviews
        </div>
        <div
          style={{
            width: "100%",
            height: 10,
            borderRadius: 5,
            background: colors.border,
            marginTop: 6,
          }}
        >
          <div
            style={{
              width: `${(rating / 5) * 100}%`,
              height: "100%",
              borderRadius: 5,
              background: color,
            }}
          />
        </div>
      </Card>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}
      >
        {c.items.map((r, i) => {
          const s = springIn({
            frame,
            fps,
            delay: start + i * step,
            config: springs.snappy,
          });
          return (
            <div
              key={r.text}
              style={{
                padding: "18px 22px",
                borderRadius: 18,
                background: "#FFFFFF",
                boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
                opacity: s,
                transform: `translateY(${mix(s, 40, 0)}px) rotate(${mix(s, i % 2 ? 2 : -2, 0)}deg)`,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    background: [
                      colors.primary,
                      colors.secondary,
                      colors.accent,
                    ][i],
                  }}
                />
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontWeight: 700,
                    fontSize: 20,
                    color: "#202124",
                  }}
                >
                  Verified customer
                </div>
                <Stars filled={r.stars} size={20} />
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 24,
                  color: "#3C4043",
                }}
              >
                “{r.text}”
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
