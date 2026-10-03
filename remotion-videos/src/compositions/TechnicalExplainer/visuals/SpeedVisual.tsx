import React from "react";
import { useCurrentFrame } from "remotion";
import { Card } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress } from "../../../utils/animation";
import { content } from "../content";

const R = 70;
const C = 2 * Math.PI * R;

/** Three Core Web Vitals gauges fill to "Good", plus a page-load bar. */
export const SpeedVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const metrics = content.speed.metrics;
  const load = progress(frame, 16, 52);

  return (
    <div
      style={{ width: 860, display: "flex", flexDirection: "column", gap: 28 }}
    >
      <Card
        style={{
          padding: "24px 30px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: fonts.body,
            fontSize: 22,
            color: colors.textMuted,
          }}
        >
          <span>yourwebsite.com</span>
          <span
            style={{
              color: load >= 1 ? colors.success : colors.textMuted,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {load >= 1
              ? "✓ Loaded in 1.2 s"
              : `Loading… ${(load * 1.2).toFixed(1)} s`}
          </span>
        </div>
        <div
          style={{
            height: 14,
            borderRadius: 7,
            background: colors.border,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${load * 100}%`,
              height: "100%",
              borderRadius: 7,
              background: `linear-gradient(90deg, ${colors.secondary}, ${colors.success})`,
            }}
          />
        </div>
      </Card>
      <div style={{ display: "flex", gap: 24 }}>
        {metrics.map((m, i) => {
          const t = progress(frame, 40 + i * 10, 70 + i * 10);
          const frac = m.value / m.max;
          const val = mix(t, 0, m.value);
          return (
            <Card
              key={m.name}
              style={{
                flex: 1,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ position: "relative", width: 170, height: 170 }}>
                <svg width={170} height={170}>
                  <circle
                    cx={85}
                    cy={85}
                    r={R}
                    fill="none"
                    stroke={colors.border}
                    strokeWidth={14}
                  />
                  <circle
                    cx={85}
                    cy={85}
                    r={R}
                    fill="none"
                    stroke={colors.success}
                    strokeWidth={14}
                    strokeLinecap="round"
                    strokeDasharray={C}
                    strokeDashoffset={C * (1 - frac * t)}
                    transform="rotate(-90 85 85)"
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 36,
                    color: colors.text,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {m.unit === "ms"
                    ? Math.round(val)
                    : val.toFixed(m.unit === "s" ? 1 : 2)}
                  <span
                    style={{
                      fontSize: 20,
                      color: colors.textMuted,
                      marginLeft: 3,
                    }}
                  >
                    {m.unit}
                  </span>
                </div>
              </div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: 30,
                  color: colors.text,
                }}
              >
                {m.name}
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 20,
                  color: colors.textMuted,
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 700,
                  fontSize: 20,
                  color: colors.success,
                  opacity: t >= 1 ? 1 : 0,
                }}
              >
                Good
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
