import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Card } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { progress, springIn, springs } from "../../../utils/animation";

const Check: React.FC<{ delay: number; color: string }> = ({
  delay,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = springIn({ frame, fps, delay, config: springs.bouncy });
  const draw = progress(frame, delay + 4, delay + 14);
  return (
    <svg
      width={44}
      height={44}
      viewBox="0 0 44 44"
      style={{ transform: `scale(${pop})`, flexShrink: 0 }}
    >
      <circle
        cx={22}
        cy={22}
        r={20}
        fill={`${color}33`}
        stroke={color}
        strokeWidth={3}
      />
      <path
        d="M13 22.5 L19.5 29 L31 16"
        fill="none"
        stroke={colors.text}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={30}
        strokeDashoffset={30 * (1 - draw)}
      />
    </svg>
  );
};

/** Site-health checklist: every technical item gets a drawn check mark, plus a health score. */
export const TechnicalVisual: React.FC<{
  items: readonly string[];
  color: string;
}> = ({ items, color }) => {
  const frame = useCurrentFrame();
  const start = 22;
  const step = 9;
  const done = start + items.length * step;
  const score = Math.round(42 + 56 * progress(frame, start, done + 10));

  return (
    <Card style={{ width: 820, padding: 44 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 24,
            letterSpacing: 4,
            color: colors.textMuted,
          }}
        >
          SITE HEALTH
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 64,
            color,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {score}
          <span style={{ fontSize: 32, color: colors.textMuted }}>/100</span>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "22px 32px",
        }}
      >
        {items.map((item, i) => {
          const d = start + i * step;
          const o = progress(frame, d, d + 8);
          return (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: 0.25 + 0.75 * o,
              }}
            >
              <Check delay={d} color={color} />
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 30,
                  fontWeight: 500,
                  color: colors.text,
                }}
              >
                {item}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
