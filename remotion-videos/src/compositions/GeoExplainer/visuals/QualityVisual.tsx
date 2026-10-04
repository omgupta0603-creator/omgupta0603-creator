import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Card, Check } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

/** An article that answers the question; three quality checks tick in. */
export const QualityVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.quality;
  const card = springIn({ frame, fps, delay: 8, config: springs.smooth });

  return (
    <div
      style={{ width: 860, display: "flex", flexDirection: "column", gap: 22 }}
    >
      <Card
        style={{
          padding: "26px 30px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          opacity: card,
          transform: `translateY(${mix(card, 30, 0)}px)`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 34,
            color: colors.text,
          }}
        >
          {c.heading}
        </div>
        <div
          style={{
            padding: "14px 16px",
            borderRadius: 12,
            background: `${color}1F`,
            borderLeft: `5px solid ${color}`,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              height: 11,
              width: "95%",
              borderRadius: 6,
              background: "rgba(255,255,255,0.55)",
            }}
          />
          <div
            style={{
              height: 11,
              width: "70%",
              borderRadius: 6,
              background: "rgba(255,255,255,0.55)",
            }}
          />
        </div>
        {[0.9, 1, 0.8].map((w, i) => (
          <div
            key={i}
            style={{
              height: 9,
              width: `${w * 100}%`,
              borderRadius: 5,
              background: "rgba(255,255,255,0.16)",
            }}
          />
        ))}
      </Card>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {c.checks.map((ch, i) => {
          const d = 30 + i * 12;
          return (
            <div
              key={ch}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: 0.25 + 0.75 * progress(frame, d, d + 8),
              }}
            >
              <Check delay={d} color={colors.success} size={42} />
              <div
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 500,
                  fontSize: 30,
                  color: colors.text,
                }}
              >
                {ch}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
