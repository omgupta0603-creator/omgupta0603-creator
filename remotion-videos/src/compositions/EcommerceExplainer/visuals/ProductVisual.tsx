import React from "react";
import { useCurrentFrame } from "remotion";
import { Pill } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { progress } from "../../../utils/animation";
import { content } from "../content";

/** Product page wireframe; title, description, images, URL and headings light up in turn. */
export const ProductVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const c = content.product;
  // labels order: title, description, images, url, headings
  const at = (i: number) => 20 + i * 14;
  const glow = (i: number) => progress(frame, at(i), at(i) + 10);
  const ring = (i: number): React.CSSProperties => ({
    borderRadius: 10,
    outline: `3px solid rgba(0,209,255,${glow(i)})`,
    outlineOffset: 4,
  });

  return (
    <div
      style={{
        position: "relative",
        width: 860,
        borderRadius: 26,
        background: colors.backgroundAlt,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 40px 100px rgba(0,0,0,0.45)",
        padding: "18px 26px 26px",
      }}
    >
      <div
        style={{
          ...ring(3),
          padding: "8px 14px",
          fontFamily: "monospace",
          fontSize: 19,
          color: colors.textMuted,
          background: "rgba(255,255,255,0.06)",
        }}
      >
        {c.url}
      </div>
      <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
        <div
          style={{
            ...ring(2),
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: 6,
          }}
        >
          <div
            style={{
              width: 300,
              height: 220,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${color}, ${colors.primary}99)`,
            }}
          />
          <div style={{ display: "flex", gap: 10 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 92,
                  height: 64,
                  borderRadius: 10,
                  background: `linear-gradient(135deg, ${[colors.accent, colors.warm, colors.success][i]}, ${colors.primary}66)`,
                }}
              />
            ))}
          </div>
        </div>
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}
        >
          <div
            style={{
              ...ring(0),
              padding: "6px 8px",
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 32,
              lineHeight: 1.15,
              color: colors.text,
            }}
          >
            {c.name}
          </div>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 30,
              color: colors.warm,
              padding: "0 8px",
            }}
          >
            {c.price}
          </div>
          <div
            style={{
              ...ring(1),
              padding: 10,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {[1, 0.9, 0.95, 0.6].map((w, i) => (
              <div
                key={i}
                style={{
                  height: 10,
                  width: `${w * 100}%`,
                  borderRadius: 5,
                  background: "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
          <div
            style={{
              ...ring(4),
              padding: "6px 10px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {["H2 · Features", "H2 · Size & fit", "H2 · Reviews"].map((h) => (
              <div
                key={h}
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 700,
                  fontSize: 18,
                  color: colors.textMuted,
                }}
              >
                {h}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginTop: 20,
        }}
      >
        {c.labels.map((l, i) => (
          <Pill
            key={l}
            color={color}
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
