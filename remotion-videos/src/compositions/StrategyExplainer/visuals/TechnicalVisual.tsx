import React from "react";
import { interpolateColors, useCurrentFrame } from "remotion";
import { Card } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress } from "../../../utils/animation";
import { content } from "../content";

/** Health bars rise from "before" to "after" and shift from red to green. */
export const TechnicalVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const items = content.technical.items;

  return (
    <Card
      style={{
        width: 860,
        padding: "30px 34px",
        display: "flex",
        flexDirection: "column",
        gap: 26,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: fonts.body,
          fontSize: 20,
          letterSpacing: 3,
          color: colors.textMuted,
        }}
      >
        <span>TECHNICAL HEALTH</span>
        <span>BEFORE → AFTER</span>
      </div>
      {items.map((it, i) => {
        const t = progress(frame, 24 + i * 10, 60 + i * 10);
        const v = mix(t, it.from, it.to);
        const col = interpolateColors(
          v,
          [0.3, 0.6, 0.9],
          [colors.danger, colors.warm, colors.success],
        );
        return (
          <div
            key={it.name}
            style={{ display: "flex", alignItems: "center", gap: 20 }}
          >
            <div
              style={{
                width: 240,
                fontFamily: fonts.body,
                fontWeight: 500,
                fontSize: 28,
                color: colors.text,
              }}
            >
              {it.name}
            </div>
            <div
              style={{
                flex: 1,
                height: 22,
                borderRadius: 11,
                background: colors.border,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${v * 100}%`,
                  height: "100%",
                  borderRadius: 11,
                  background: col,
                }}
              />
            </div>
            <div
              style={{
                width: 80,
                textAlign: "right",
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 28,
                color: col,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {Math.round(v * 100)}
            </div>
          </div>
        );
      })}
    </Card>
  );
};
