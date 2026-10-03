import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Card, Pill } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";
import { Check } from "../../../components";

/** Target keyword → natural placements (checked) → keyword stuffing (struck out). */
export const KeywordVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.keyword;
  const placeStart = 34;
  const step = 10;
  const stuffStart = placeStart + c.placements.length * step + 14;
  const stuffIn = springIn({
    frame,
    fps,
    delay: stuffStart,
    config: springs.smooth,
  });
  const strike = progress(frame, stuffStart + 14, stuffStart + 30);
  const badge = springIn({
    frame,
    fps,
    delay: stuffStart + 28,
    config: springs.bouncy,
  });

  return (
    <Card
      style={{
        width: 820,
        padding: 40,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 22,
            letterSpacing: 4,
            color: colors.textMuted,
          }}
        >
          TARGET KEYWORD
        </div>
        <Pill
          color={color}
          delay={14}
          fontSize={28}
          style={{ fontFamily: "monospace" }}
        >
          {c.keyword}
        </Pill>
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 24,
          color: colors.textMuted,
          opacity: progress(frame, 22, 32),
        }}
      >
        {c.intent}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px 28px",
          marginTop: 6,
        }}
      >
        {c.placements.map((p, i) => {
          const d = placeStart + i * step;
          return (
            <div
              key={p}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                opacity: 0.25 + 0.75 * progress(frame, d, d + 8),
              }}
            >
              <Check delay={d} color={colors.success} size={38} />
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 28,
                  fontWeight: 500,
                  color: colors.text,
                }}
              >
                {p}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "relative",
          marginTop: 10,
          padding: "18px 24px",
          borderRadius: 16,
          background: `${colors.danger}1F`,
          border: `2px dashed ${colors.danger}`,
          opacity: stuffIn,
          transform: `translateY(${mix(stuffIn, 30, 0)}px)`,
        }}
      >
        <div
          style={{
            position: "relative",
            fontFamily: "monospace",
            fontSize: 24,
            color: colors.textMuted,
          }}
        >
          {c.stuffing}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              height: 4,
              borderRadius: 2,
              background: colors.danger,
              transform: `scaleX(${strike})`,
              transformOrigin: "left",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            right: -18,
            top: -26,
            padding: "8px 18px",
            borderRadius: 999,
            background: colors.danger,
            color: "white",
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: 22,
            transform: `scale(${badge})`,
          }}
        >
          ✕ No keyword stuffing
        </div>
      </div>
    </Card>
  );
};
