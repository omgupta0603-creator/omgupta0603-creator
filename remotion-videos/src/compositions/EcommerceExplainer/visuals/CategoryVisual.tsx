import React from "react";
import { useCurrentFrame } from "remotion";
import { Pill } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { progress } from "../../../utils/animation";
import { content } from "../content";
import { ProductThumb } from "./ProductThumb";

/** Category page wireframe; each optimized element lights up with its label. */
export const CategoryVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const c = content.category;
  const at = (i: number) => 20 + i * 14;
  const glow = (i: number) => progress(frame, at(i), at(i) + 10);
  const ring = (i: number): React.CSSProperties => ({
    borderRadius: 10,
    outline: `3px solid rgba(108,92,255,${glow(i)})`,
    outlineOffset: 4,
  });

  return (
    <div
      style={{ width: 860, display: "flex", flexDirection: "column", gap: 18 }}
    >
      <div
        style={{
          position: "relative",
          width: 860,
          borderRadius: 26,
          background: colors.backgroundAlt,
          border: `1px solid ${colors.border}`,
          boxShadow: "0 40px 100px rgba(0,0,0,0.45)",
          padding: "20px 26px 26px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((x) => (
            <div
              key={x}
              style={{ width: 12, height: 12, borderRadius: 6, background: x }}
            />
          ))}
          <div
            style={{
              ...ring(0),
              marginLeft: 12,
              padding: "6px 14px",
              fontFamily: fonts.body,
              fontSize: 19,
              color: colors.text,
              background: "rgba(255,255,255,0.08)",
            }}
          >
            {c.tab}
          </div>
        </div>
        <div
          style={{
            ...ring(1),
            marginTop: 18,
            padding: "6px 10px",
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 38,
            color: colors.text,
            display: "inline-block",
          }}
        >
          {c.h1}
        </div>
        <div
          style={{
            ...ring(2),
            marginTop: 12,
            padding: 10,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {[1, 0.85].map((w, i) => (
            <div
              key={i}
              style={{
                height: 11,
                width: `${w * 100}%`,
                borderRadius: 6,
                background: "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
        <div
          style={{
            ...ring(3),
            marginTop: 12,
            padding: "6px 10px",
            display: "flex",
            gap: 16,
          }}
        >
          {c.links.map((l) => (
            <span
              key={l}
              style={{
                fontFamily: fonts.body,
                fontSize: 19,
                color: colors.secondary,
                textDecoration: "underline",
              }}
            >
              {l} →
            </span>
          ))}
        </div>
        <div
          style={{
            ...ring(4),
            marginTop: 14,
            padding: 8,
            display: "flex",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 140,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: 10,
              borderRadius: 10,
              background: "rgba(255,255,255,0.05)",
            }}
          >
            {["Size", "Color", "Price", "Brand"].map((f) => (
              <div
                key={f}
                style={{
                  fontFamily: fonts.body,
                  fontSize: 16,
                  color: colors.textMuted,
                }}
              >
                ☐ {f}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {["Runner", "Trail", "Road", "Racer"].map((p, i) => (
              <ProductThumb
                key={p}
                name={p}
                index={i}
                price="$49"
                width={140}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {c.labels.map((l, i) => (
          <Pill
            key={l}
            color={i === 4 ? colors.warm : color}
            delay={at(i)}
            fontSize={21}
            style={{ background: "rgba(7,11,26,0.92)" }}
          >
            {l}
          </Pill>
        ))}
      </div>
    </div>
  );
};
