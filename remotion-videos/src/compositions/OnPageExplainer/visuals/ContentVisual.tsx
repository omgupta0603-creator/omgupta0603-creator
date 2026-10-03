import React from "react";
import { useCurrentFrame } from "remotion";
import { Card } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress } from "../../../utils/animation";
import { content } from "../content";
import { Check } from "./Check";

/** A document with a quality score ring; each quality gets ticked off. */
export const ContentVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const q = content.content.qualities;
  const start = 26;
  const step = 12;
  const score = progress(frame, start, start + q.length * step + 6);
  const R = 92;
  const C = 2 * Math.PI * R;

  return (
    <Card
      style={{
        width: 820,
        padding: 40,
        display: "flex",
        gap: 40,
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 26,
        }}
      >
        <div style={{ position: "relative", width: 220, height: 220 }}>
          <svg width={220} height={220}>
            <circle
              cx={110}
              cy={110}
              r={R}
              fill="none"
              stroke={colors.border}
              strokeWidth={16}
            />
            <circle
              cx={110}
              cy={110}
              r={R}
              fill="none"
              stroke={color}
              strokeWidth={16}
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - score * 0.96)}
              transform="rotate(-90 110 110)"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
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
              {Math.round(mix(score, 0, 96))}
            </div>
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 18,
                letterSpacing: 3,
                color,
              }}
            >
              QUALITY
            </div>
          </div>
        </div>
        {/* mini document */}
        <div
          style={{
            width: 200,
            padding: 18,
            borderRadius: 14,
            background: colors.backgroundAlt,
            border: `1px solid ${colors.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 9,
          }}
        >
          <div
            style={{
              height: 14,
              width: "70%",
              borderRadius: 7,
              background: color,
            }}
          />
          {[1, 0.9, 0.95, 0.6].map((w, i) => (
            <div
              key={i}
              style={{
                height: 9,
                width: `${w * 100}%`,
                borderRadius: 5,
                background: "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {q.map((item, i) => {
          const d = start + i * step;
          return (
            <div
              key={item}
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
                  fontSize: 32,
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
