import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const INTENT_COLS: Record<string, string> = {
  Informational: colors.secondary,
  Commercial: colors.warm,
  Transactional: colors.success,
};

/** Audience need → search intent → the content piece that answers it. */
export const ContentVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.content;

  const Arrow: React.FC<{ t: number }> = ({ t }) => (
    <svg width={50} height={24} style={{ flexShrink: 0 }}>
      <path
        d="M 2 12 H 40"
        stroke={colors.textMuted}
        strokeWidth={4}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - t}
      />
      <path
        d="M 34 4 L 46 12 L 34 20"
        fill="none"
        stroke={colors.textMuted}
        strokeWidth={4}
        strokeLinecap="round"
        opacity={t > 0.95 ? 1 : 0}
      />
    </svg>
  );

  return (
    <div
      style={{ width: 880, display: "flex", flexDirection: "column", gap: 18 }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: "0 6px",
          fontFamily: fonts.body,
          fontSize: 18,
          letterSpacing: 3,
          color: colors.textMuted,
        }}
      >
        <div style={{ width: 330 }}>{c.columns[0].toUpperCase()}</div>
        <div style={{ width: 60 }} />
        <div style={{ width: 190 }}>{c.columns[1].toUpperCase()}</div>
        <div style={{ width: 60 }} />
        <div>{c.columns[2].toUpperCase()}</div>
      </div>
      {c.rows.map((r, i) => {
        const d = 16 + i * 18;
        const a = springIn({ frame, fps, delay: d, config: springs.snappy });
        const b = springIn({
          frame,
          fps,
          delay: d + 8,
          config: springs.snappy,
        });
        const cc = springIn({
          frame,
          fps,
          delay: d + 16,
          config: springs.bouncy,
        });
        const ic = INTENT_COLS[r.intent];
        return (
          <div
            key={r.need}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <div
              style={{
                width: 330,
                padding: "16px 18px",
                borderRadius: 16,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                fontFamily: fonts.body,
                fontSize: 22,
                color: colors.text,
                opacity: a,
                transform: `translateX(${mix(a, -30, 0)}px)`,
              }}
            >
              &ldquo;{r.need}&rdquo;
            </div>
            <Arrow t={progress(frame, d + 4, d + 12)} />
            <div
              style={{
                width: 190,
                padding: "12px 14px",
                borderRadius: 999,
                background: `${ic}26`,
                border: `2px solid ${ic}`,
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: 20,
                color: colors.text,
                textAlign: "center",
                opacity: b,
              }}
            >
              {r.intent}
            </div>
            <Arrow t={progress(frame, d + 12, d + 20)} />
            <div
              style={{
                flex: 1,
                padding: "16px 18px",
                borderRadius: 16,
                background: colors.backgroundAlt,
                border: `2px solid ${color}`,
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 24,
                color: colors.text,
                transform: `scale(${cc})`,
              }}
            >
              {r.piece}
            </div>
          </div>
        );
      })}
    </div>
  );
};
