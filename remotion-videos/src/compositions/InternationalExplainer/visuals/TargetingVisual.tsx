import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Check } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";
import { COUNTRY_COLORS, CountryBadge } from "./CountryBadge";

/** Each user lands on the version of the page made for their country and language. */
export const TargetingVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = content.targeting.versions;

  return (
    <div
      style={{ width: 860, display: "flex", flexDirection: "column", gap: 30 }}
    >
      {v.map((row, i) => {
        const d = 18 + i * 20;
        const user = springIn({ frame, fps, delay: d, config: springs.bouncy });
        const line = progress(frame, d + 8, d + 20);
        const card = springIn({
          frame,
          fps,
          delay: d + 16,
          config: springs.snappy,
        });
        const col = COUNTRY_COLORS[row.user];
        return (
          <div
            key={row.path}
            style={{ display: "flex", alignItems: "center", gap: 18 }}
          >
            <div style={{ transform: `scale(${user})` }}>
              <CountryBadge code={row.user} size={84} />
            </div>
            <svg width={120} height={30}>
              <path
                d="M 4 15 H 104"
                stroke={col}
                strokeWidth={5}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - line}
              />
              <path
                d="M 96 5 L 112 15 L 96 25"
                fill="none"
                stroke={col}
                strokeWidth={5}
                strokeLinecap="round"
                opacity={line > 0.95 ? 1 : 0}
              />
            </svg>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "20px 24px",
                borderRadius: 20,
                background: colors.backgroundAlt,
                border: `2px solid ${col}`,
                opacity: card,
                transform: `translateX(${mix(card, 40, 0)}px)`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  flex: 1,
                }}
              >
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 28,
                    color: colors.text,
                  }}
                >
                  yourwebsite.com
                  <span style={{ color: col, fontWeight: 700 }}>
                    {row.path}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 22,
                    color: colors.textMuted,
                  }}
                >
                  {row.label}
                </div>
              </div>
              <Check delay={d + 26} color={colors.success} size={42} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
