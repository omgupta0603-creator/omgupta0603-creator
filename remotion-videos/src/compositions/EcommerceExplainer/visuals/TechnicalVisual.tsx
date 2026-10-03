import React from "react";
import { useCurrentFrame } from "remotion";
import { Card, Check } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { progress } from "../../../utils/animation";
import { content } from "../content";

const DOTS = 140;

/** URL count explodes, then each technical area gets checked; a faceted URL resolves to its canonical. */
export const TechnicalVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const c = content.technical;
  const grow = progress(frame, 8, 46);
  const start = 48;
  const step = 10;
  const facetAt = start + c.items.length * step + 4;
  const facet = progress(frame, facetAt, facetAt + 14);

  return (
    <div
      style={{ width: 860, display: "flex", flexDirection: "column", gap: 20 }}
    >
      <Card
        style={{
          padding: "22px 28px",
          display: "flex",
          alignItems: "center",
          gap: 28,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 60,
              color: colors.text,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {Math.round(c.urlCount * grow).toLocaleString("en-US")}
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 22,
              color: colors.textMuted,
            }}
          >
            URLs on the store
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 5 }}>
          {new Array(DOTS).fill(0).map((_, i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                background: i < grow * DOTS ? color : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>
      </Card>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px 26px",
          padding: "0 6px",
        }}
      >
        {c.items.map((it, i) => {
          const d = start + i * step;
          return (
            <div
              key={it}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                opacity: 0.25 + 0.75 * progress(frame, d, d + 8),
              }}
            >
              <Check delay={d} color={colors.success} size={36} />
              <div
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 500,
                  fontSize: 27,
                  color: colors.text,
                }}
              >
                {it}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: "monospace",
          fontSize: 22,
          opacity: facet,
        }}
      >
        <span style={{ color: colors.textMuted }}>{c.facet}</span>
        <span style={{ color }}>→ canonical</span>
        <span style={{ color: colors.text, fontWeight: 700 }}>
          {c.canonical}
        </span>
      </div>
    </div>
  );
};
