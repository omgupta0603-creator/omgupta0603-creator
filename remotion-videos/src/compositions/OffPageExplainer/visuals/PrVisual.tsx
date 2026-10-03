import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Highlight, Pill } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

/** A news article that mentions the brand, then the kinds of platforms around it. */
export const PrVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.pr;
  const cardIn = springIn({ frame, fps, delay: 10, config: springs.smooth });

  return (
    <div
      style={{ width: 840, display: "flex", flexDirection: "column", gap: 30 }}
    >
      <div
        style={{
          borderRadius: 24,
          background: "#FFFFFF",
          padding: "30px 36px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
          opacity: cardIn,
          transform: `translateY(${mix(cardIn, 40, 0)}px) rotate(${mix(cardIn, -2, 0)}deg)`,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #E5E7EB",
            paddingBottom: 12,
          }}
        >
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 26,
              letterSpacing: 4,
              color: "#111827",
            }}
          >
            {c.outlet}
          </div>
          <div
            style={{ fontFamily: fonts.body, fontSize: 18, color: "#6B7280" }}
          >
            Feature
          </div>
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 40,
            lineHeight: 1.15,
            color: "#111827",
          }}
        >
          {c.headline}
        </div>
        <div style={{ display: "flex", gap: 22 }}>
          <div
            style={{
              width: 190,
              height: 130,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${color}, ${colors.primary})`,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 26,
              lineHeight: 1.5,
              color: "#374151",
            }}
          >
            <Highlight
              start={36}
              duration={18}
              color="#111827"
              gradient={`linear-gradient(90deg, ${colors.warm}, ${colors.warm})`}
            >
              <b>{c.brand}</b>
            </Highlight>{" "}
            {c.quote}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
        {c.platforms.map((p, i) => (
          <Pill key={p} color={color} delay={58 + i * 8} fontSize={26}>
            {p}
          </Pill>
        ))}
      </div>
    </div>
  );
};
