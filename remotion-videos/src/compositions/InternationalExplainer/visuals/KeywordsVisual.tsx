import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Card } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";
import { CountryBadge } from "./CountryBadge";

/** Literal translation (crossed out) vs. the term people actually search, then terms per market. */
export const KeywordsVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.keywords;
  const a = springIn({ frame, fps, delay: 12, config: springs.snappy });
  const strike = progress(frame, 44, 58);
  const b = springIn({ frame, fps, delay: 60, config: springs.bouncy });
  const marketsAt = 96;

  const Box: React.FC<{
    title: string;
    note: string;
    good: boolean;
    t: number;
  }> = ({ title, note, good, t }) => (
    <Card
      style={{
        flex: 1,
        padding: "24px 28px",
        borderColor: good ? colors.success : colors.danger,
        opacity: t,
        transform: `translateY(${mix(t, 30, 0)}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 20,
          letterSpacing: 2,
          color: good ? colors.success : colors.danger,
        }}
      >
        {good ? "✓ LOCAL RESEARCH" : "✕ JUST TRANSLATED"}
      </div>
      <div
        style={{
          position: "relative",
          alignSelf: "flex-start",
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: 48,
          color: good ? colors.text : colors.textMuted,
        }}
      >
        {title}
        {!good ? (
          <div
            style={{
              position: "absolute",
              left: -4,
              right: -4,
              top: "55%",
              height: 5,
              borderRadius: 3,
              background: colors.danger,
              transform: `scaleX(${strike})`,
              transformOrigin: "left",
            }}
          />
        ) : null}
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 22,
          lineHeight: 1.35,
          color: colors.textMuted,
        }}
      >
        {note}
      </div>
    </Card>
  );

  return (
    <div
      style={{ width: 860, display: "flex", flexDirection: "column", gap: 24 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: fonts.body,
          fontSize: 26,
          color: colors.textMuted,
          opacity: progress(frame, 4, 14),
        }}
      >
        English keyword:{" "}
        <span
          style={{ fontFamily: "monospace", color: colors.text, fontSize: 30 }}
        >
          &quot;{c.source}&quot;
        </span>{" "}
        → Germany
      </div>
      <div style={{ display: "flex", gap: 22 }}>
        <Box title={c.translated} note={c.translatedNote} good={false} t={a} />
        <Box title={c.researched} note={c.researchedNote} good t={b} />
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        {c.markets.map((m, i) => {
          const t = springIn({
            frame,
            fps,
            delay: marketsAt + i * 8,
            config: springs.snappy,
          });
          return (
            <div
              key={m.code}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 18px",
                borderRadius: 18,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                opacity: t,
                transform: `scale(${mix(t, 0.85, 1)})`,
              }}
            >
              <CountryBadge code={m.code} size={50} />
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 24,
                  color: colors.text,
                  whiteSpace: "nowrap",
                }}
              >
                {m.term}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
