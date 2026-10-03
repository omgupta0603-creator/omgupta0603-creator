import React from "react";
import { useCurrentFrame } from "remotion";
import { Card, Check } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { progress } from "../../../utils/animation";
import { content } from "../content";

/** A page wireframe next to a checklist of on-page elements. */
export const OnPageVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const items = content.onpage.items;
  const start = 16;
  const step = 9;
  const lit = (i: number) =>
    progress(frame, start + i * step, start + i * step + 8);

  return (
    <div
      style={{ width: 860, display: "flex", gap: 26, alignItems: "stretch" }}
    >
      <Card
        style={{
          width: 380,
          padding: 22,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            height: 22,
            borderRadius: 6,
            background: `rgba(108,92,255,${0.25 + lit(0) * 0.75})`,
          }}
        />
        <div
          style={{
            height: 30,
            width: "75%",
            borderRadius: 6,
            background: `rgba(255,255,255,${0.15 + lit(1) * 0.6})`,
          }}
        />
        {[1, 0.9, 0.95, 0.7].map((w, i) => (
          <div
            key={i}
            style={{
              height: 10,
              width: `${w * 100}%`,
              borderRadius: 5,
              background: `rgba(255,255,255,${0.12 + lit(2) * 0.25})`,
            }}
          />
        ))}
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 16,
            color: lit(3) > 0.5 ? color : colors.textMuted,
          }}
        >
          /seo-strategy-guide
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 16,
            color: lit(4) > 0.5 ? colors.secondary : colors.textMuted,
            textDecoration: "underline",
          }}
        >
          Related: keyword research →
        </div>
        <div
          style={{
            height: 90,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${color}${lit(5) > 0.5 ? "" : "55"}, ${colors.secondary}55)`,
          }}
        />
      </Card>
      <Card
        style={{
          flex: 1,
          padding: "26px 30px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 16,
          alignContent: "center",
        }}
      >
        {items.map((it, i) => (
          <div
            key={it}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              opacity: 0.25 + 0.75 * lit(i),
            }}
          >
            <Check delay={start + i * step} color={colors.success} size={38} />
            <div
              style={{
                fontFamily: fonts.body,
                fontWeight: 500,
                fontSize: 28,
                color: colors.text,
              }}
            >
              {it}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};
