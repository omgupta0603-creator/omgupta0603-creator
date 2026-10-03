import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Card } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const GRID = "270px 150px 140px 105px 1fr";
const COMP: Record<string, string> = {
  Low: colors.success,
  Medium: colors.warm,
  High: colors.danger,
};

/** Candidate keywords scored on intent, competition, relevance and fit; the good ones get picked. */
export const KeywordsVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.keywords;
  const pickAt = 18 + c.rows.length * 10 + 10;

  return (
    <Card
      style={{
        width: 860,
        padding: "26px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: GRID,
          gap: 10,
          fontFamily: fonts.body,
          fontSize: 15,
          letterSpacing: 1,
          whiteSpace: "nowrap",
          color: colors.textMuted,
          padding: "0 12px 6px",
        }}
      >
        {c.columns.map((h) => (
          <div key={h}>{h.toUpperCase()}</div>
        ))}
      </div>
      {c.rows.map((r, i) => {
        const t = springIn({
          frame,
          fps,
          delay: 18 + i * 10,
          config: springs.snappy,
        });
        const picked = progress(frame, pickAt + i * 4, pickAt + i * 4 + 10);
        const dim = !r.pick ? progress(frame, pickAt, pickAt + 10) : 0;
        return (
          <div
            key={r.kw}
            style={{
              display: "grid",
              gridTemplateColumns: GRID,
              gap: 10,
              alignItems: "center",
              padding: "14px 12px",
              borderRadius: 14,
              background: r.pick
                ? `rgba(46,230,166,${picked * 0.12})`
                : colors.surface,
              border: `2px solid ${r.pick ? `rgba(46,230,166,${0.15 + picked * 0.85})` : colors.border}`,
              opacity: t * mix(dim, 1, 0.4),
              transform: `translateX(${mix(t, 40, 0)}px)`,
              fontFamily: fonts.body,
              fontSize: 21,
              color: colors.text,
            }}
          >
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 20,
                whiteSpace: "nowrap",
              }}
            >
              {r.kw}
            </div>
            <div>{r.intent}</div>
            <div style={{ color: COMP[r.comp], fontWeight: 700 }}>{r.comp}</div>
            <div
              style={{
                color: r.rel ? colors.success : colors.danger,
                fontWeight: 700,
              }}
            >
              {r.rel ? "✓" : "✕"}
            </div>
            <div
              style={{
                color: r.goal ? colors.success : colors.danger,
                fontWeight: 700,
              }}
            >
              {r.goal ? "✓" : "✕"}
            </div>
          </div>
        );
      })}
    </Card>
  );
};
