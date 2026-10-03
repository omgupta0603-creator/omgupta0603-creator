import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Card } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

/** Answer-first article: a bold one-sentence answer, then supporting sections. */
export const AnswersVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.answers;
  const ans = springIn({ frame, fps, delay: 24, config: springs.snappy });
  const tagA = springIn({ frame, fps, delay: 40, config: springs.bouncy });
  const ctxAt = 58;
  const tagB = springIn({
    frame,
    fps,
    delay: ctxAt + c.context.length * 8 + 4,
    config: springs.bouncy,
  });

  return (
    <Card
      style={{
        width: 860,
        padding: "28px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div
        style={{
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: 40,
          color: colors.text,
          opacity: progress(frame, 8, 18),
        }}
      >
        {c.question}
      </div>
      <div
        style={{
          position: "relative",
          padding: "20px 24px",
          borderRadius: 16,
          background: `${color}1F`,
          border: `3px solid ${color}`,
          opacity: ans,
          transform: `scale(${mix(ans, 0.95, 1)})`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: 28,
            lineHeight: 1.4,
            color: colors.text,
          }}
        >
          {c.direct}
        </div>
        <div
          style={{
            position: "absolute",
            right: 16,
            top: -18,
            padding: "4px 14px",
            borderRadius: 999,
            background: color,
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: 18,
            color: colors.background,
            transform: `scale(${tagA})`,
          }}
        >
          1 · Answer first
        </div>
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: "16px 4px 4px",
        }}
      >
        {c.context.map((h, i) => {
          const t = progress(frame, ctxAt + i * 8, ctxAt + i * 8 + 10);
          return (
            <div
              key={h}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                opacity: t,
                transform: `translateY(${mix(t, 14, 0)}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 700,
                  fontSize: 22,
                  color: colors.textMuted,
                }}
              >
                {h}
              </div>
              <div
                style={{
                  height: 9,
                  width: `${90 - i * 12}%`,
                  borderRadius: 5,
                  background: "rgba(255,255,255,0.16)",
                }}
              />
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 4,
            padding: "4px 14px",
            borderRadius: 999,
            background: colors.backgroundAlt,
            border: `2px solid ${colors.textMuted}`,
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: 18,
            color: colors.text,
            transform: `scale(${tagB})`,
          }}
        >
          2 · Then context
        </div>
      </div>
    </Card>
  );
};
