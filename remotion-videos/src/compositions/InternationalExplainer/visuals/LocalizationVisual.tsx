import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Pill } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, springIn, springs } from "../../../utils/animation";
import { content } from "../content";
import { COUNTRY_COLORS, CountryBadge } from "./CountryBadge";

/** One product, three localized versions (terminology, spelling, currency), then the aspects. */
export const LocalizationVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.localization;
  const aspectsAt = 14 + c.versions.length * 12 + 20;

  return (
    <div
      style={{ width: 860, display: "flex", flexDirection: "column", gap: 28 }}
    >
      <div style={{ display: "flex", gap: 20 }}>
        {c.versions.map((v, i) => {
          const t = springIn({
            frame,
            fps,
            delay: 14 + i * 12,
            config: springs.snappy,
          });
          const col = COUNTRY_COLORS[v.code];
          return (
            <div
              key={v.code}
              style={{
                flex: 1,
                borderRadius: 22,
                background: "#FFFFFF",
                overflow: "hidden",
                boxShadow: "0 30px 70px rgba(0,0,0,0.45)",
                opacity: t,
                transform: `translateY(${mix(t, 50, 0)}px) rotate(${mix(t, i - 1, 0) * 3}deg)`,
              }}
            >
              <div
                style={{
                  height: 150,
                  background: `linear-gradient(135deg, ${col}, ${colors.primary}99)`,
                  position: "relative",
                }}
              >
                <div style={{ position: "absolute", left: 14, top: 14 }}>
                  <CountryBadge code={v.code} size={50} />
                </div>
              </div>
              <div
                style={{
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 26,
                    lineHeight: 1.15,
                    color: "#111827",
                    minHeight: 60,
                  }}
                >
                  {v.product}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 20,
                    color: "#6B7280",
                  }}
                >
                  {v.note}
                </div>
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 36,
                    color: "#111827",
                  }}
                >
                  {v.price}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {c.aspects.map((a, i) => (
          <Pill
            key={a}
            color={
              [
                colors.primary,
                colors.secondary,
                colors.warm,
                colors.success,
                colors.accent,
              ][i]
            }
            delay={aspectsAt + i * 6}
            fontSize={24}
          >
            {a}
          </Pill>
        ))}
      </div>
    </div>
  );
};
