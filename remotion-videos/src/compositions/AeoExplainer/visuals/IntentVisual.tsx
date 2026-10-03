import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Card } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

/** A question → what the user really wants → the matching answer format. */
export const IntentVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.intent;
  const q = springIn({ frame, fps, delay: 10, config: springs.snappy });
  const meaning = springIn({ frame, fps, delay: 34, config: springs.snappy });
  const pickAt = 70;

  return (
    <div
      style={{ width: 860, display: "flex", flexDirection: "column", gap: 24 }}
    >
      <div
        style={{
          alignSelf: "flex-start",
          maxWidth: 620,
          padding: "20px 26px",
          borderRadius: "26px 26px 26px 6px",
          background: "#FFFFFF",
          fontFamily: fonts.body,
          fontSize: 30,
          color: "#111827",
          opacity: q,
          transform: `translateY(${mix(q, 20, 0)}px)`,
        }}
      >
        &ldquo;{c.question}&rdquo;
      </div>
      <Card
        style={{
          padding: "20px 26px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          borderColor: color,
          opacity: meaning,
          transform: `scale(${mix(meaning, 0.9, 1)})`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 20,
            letterSpacing: 3,
            color,
          }}
        >
          INTENT
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 30,
            color: colors.text,
          }}
        >
          {c.meaning}
        </div>
      </Card>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 20,
          letterSpacing: 3,
          color: colors.textMuted,
          opacity: progress(frame, 48, 58),
        }}
      >
        EXPECTED ANSWER TYPE
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {c.formats.map((f, i) => {
          const t = springIn({
            frame,
            fps,
            delay: 52 + i * 5,
            config: springs.snappy,
          });
          const chosen = i === c.pick;
          const sel = chosen ? progress(frame, pickAt, pickAt + 10) : 0;
          const dim = !chosen ? progress(frame, pickAt, pickAt + 10) : 0;
          return (
            <div
              key={f}
              style={{
                padding: "16px 20px",
                borderRadius: 16,
                background: chosen
                  ? `rgba(46,230,166,${0.05 + sel * 0.15})`
                  : colors.surface,
                border: `2px solid ${chosen ? `rgba(46,230,166,${0.3 + sel * 0.7})` : colors.border}`,
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: 26,
                color: colors.text,
                opacity: t * mix(dim, 1, 0.4),
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {f}
              {chosen && sel > 0.5 ? (
                <span style={{ color: colors.success }}>✓</span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
