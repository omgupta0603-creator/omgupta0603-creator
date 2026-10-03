import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Card } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const LEVEL = {
  H1: { indent: 0, size: 38, weight: 700, color: colors.accent },
  H2: { indent: 70, size: 30, weight: 600, color: colors.primary },
  H3: { indent: 140, size: 26, weight: 500, color: colors.secondary },
} as const;

/** Page outline: H1 → H2 → H3 rows appear in order with tree connectors. */
export const HeadingsVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tree = content.headings.tree;

  return (
    <Card
      style={{
        width: 820,
        padding: "40px 44px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 22,
          letterSpacing: 4,
          color: colors.textMuted,
          marginBottom: 6,
        }}
      >
        PAGE OUTLINE
      </div>
      {tree.map((row, i) => {
        const l = LEVEL[row.level];
        const t = springIn({
          frame,
          fps,
          delay: 22 + i * 12,
          config: springs.snappy,
        });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginLeft: l.indent,
              opacity: t,
              transform: `translateX(${mix(t, -40, 0)}px)`,
              position: "relative",
            }}
          >
            {l.indent > 0 ? (
              <div
                style={{
                  position: "absolute",
                  left: -40,
                  top: -26,
                  width: 28,
                  height: 52,
                  borderLeft: `3px solid ${colors.border}`,
                  borderBottom: `3px solid ${colors.border}`,
                  borderBottomLeftRadius: 12,
                }}
              />
            ) : null}
            <div
              style={{
                minWidth: 64,
                padding: "6px 12px",
                borderRadius: 10,
                background: `${l.color}2E`,
                border: `2px solid ${l.color}`,
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: 24,
                color: colors.text,
                textAlign: "center",
              }}
            >
              {row.level}
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontWeight: l.weight,
                fontSize: l.size,
                color: colors.text,
              }}
            >
              {row.text}
            </div>
          </div>
        );
      })}
    </Card>
  );
};
