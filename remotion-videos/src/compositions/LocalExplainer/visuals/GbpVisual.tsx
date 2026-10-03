import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Check } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";
import { Stars } from "./Stars";

/** A business profile card; every field gets checked, then an "up to date" badge. */
export const GbpVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.gbp;
  const cardIn = springIn({ frame, fps, delay: 8, config: springs.smooth });
  const start = 30;
  const step = 11;
  const badgeAt = start + c.fields.length * step + 8;
  const badge = springIn({
    frame,
    fps,
    delay: badgeAt,
    config: springs.bouncy,
  });

  return (
    <div
      style={{
        position: "relative",
        width: 840,
        borderRadius: 28,
        background: "#FFFFFF",
        boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
        overflow: "hidden",
        opacity: cardIn,
        transform: `translateY(${mix(cardIn, 40, 0)}px)`,
      }}
    >
      {/* Photo strip */}
      <div style={{ display: "flex", height: 120 }}>
        {[color, colors.secondary, colors.accent, colors.warm].map((col, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: `linear-gradient(135deg, ${col}, ${colors.primary}AA)`,
              opacity:
                progress(
                  frame,
                  start + 7 * step + i * 3,
                  start + 7 * step + i * 3 + 8,
                ) *
                  0.8 +
                0.2,
            }}
          />
        ))}
      </div>
      <div
        style={{
          padding: "26px 34px 30px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 38,
                color: "#202124",
              }}
            >
              {c.business}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 4,
              }}
            >
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: 22,
                  color: "#202124",
                }}
              >
                4.8
              </span>
              <Stars filled={5} size={22} />
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: 20,
                  color: "#70757A",
                }}
              >
                {c.category}
              </span>
            </div>
          </div>
          <div
            style={{
              padding: "8px 18px",
              borderRadius: 999,
              background: colors.success,
              color: colors.background,
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: 20,
              transform: `scale(${badge})`,
              whiteSpace: "nowrap",
            }}
          >
            ✓ {c.badge}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px 26px",
          }}
        >
          {c.fields.map((f, i) => {
            const d = start + i * step;
            return (
              <div
                key={f}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  opacity: 0.3 + 0.7 * progress(frame, d, d + 8),
                }}
              >
                <Check
                  delay={d}
                  color={colors.success}
                  size={34}
                  tickColor="#0B7A55"
                />
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontWeight: 500,
                    fontSize: 26,
                    color: "#202124",
                  }}
                >
                  {f}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
