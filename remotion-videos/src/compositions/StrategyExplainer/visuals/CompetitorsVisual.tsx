import React from "react";
import { useCurrentFrame } from "remotion";
import { Card } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { progress } from "../../../utils/animation";
import { content } from "../content";

const SITE_COLS = [colors.warm, colors.primary, colors.secondary];

/** Grouped bars: you vs two competitors across five dimensions. */
export const CompetitorsVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const c = content.competitors;
  const H = 260;

  return (
    <Card
      style={{
        width: 860,
        padding: "28px 30px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 24,
          fontFamily: fonts.body,
          fontSize: 21,
          color: colors.textMuted,
        }}
      >
        {c.sites.map((s, i) => (
          <span
            key={s.name}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                background: SITE_COLS[i],
              }}
            />
            <span
              style={{
                color: i === 0 ? colors.text : colors.textMuted,
                fontWeight: i === 0 ? 700 : 400,
              }}
            >
              {s.name}
            </span>
          </span>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          height: H,
          borderBottom: `2px solid ${colors.border}`,
          padding: "0 6px",
        }}
      >
        {c.metrics.map((m, mi) => (
          <div
            key={m}
            style={{ display: "flex", gap: 8, alignItems: "flex-end" }}
          >
            {c.sites.map((s, si) => {
              const t = progress(
                frame,
                16 + mi * 8 + si * 3,
                40 + mi * 8 + si * 3,
              );
              return (
                <div
                  key={s.name}
                  style={{
                    width: 34,
                    height: H * s.values[mi] * t,
                    borderRadius: "8px 8px 0 0",
                    background: SITE_COLS[si],
                    opacity: si === 0 ? 1 : 0.8,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 6px",
        }}
      >
        {c.metrics.map((m) => (
          <div
            key={m}
            style={{
              width: 118,
              textAlign: "center",
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: 21,
              color: colors.text,
            }}
          >
            {m}
          </div>
        ))}
      </div>
    </Card>
  );
};
