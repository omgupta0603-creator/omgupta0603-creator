import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Pill } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const STAGE_COLORS = [colors.secondary, colors.primary, colors.success];

/** The customer journey as a funnel: one keyword per stage, plus what keywords are based on. */
export const KeywordsVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.keywords;

  return (
    <div
      style={{ width: 860, display: "flex", flexDirection: "column", gap: 26 }}
    >
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {c.bases.map((b, i) => (
          <Pill
            key={b}
            color={
              [colors.warm, colors.primary, colors.secondary, colors.success][i]
            }
            delay={12 + i * 6}
            fontSize={24}
          >
            {b}
          </Pill>
        ))}
      </div>
      {c.journey.map((j, i) => {
        const t = springIn({
          frame,
          fps,
          delay: 40 + i * 14,
          config: springs.snappy,
        });
        const w = 860 - i * 90;
        return (
          <div
            key={j.stage}
            style={{
              width: w,
              alignSelf: "center",
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "20px 26px",
              borderRadius: 20,
              background: `${STAGE_COLORS[i]}22`,
              border: `2px solid ${STAGE_COLORS[i]}`,
              opacity: t,
              transform: `translateY(${mix(t, 30, 0)}px) scaleX(${mix(t, 0.9, 1)})`,
            }}
          >
            <div
              style={{
                width: 130,
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 30,
                color: STAGE_COLORS[i],
              }}
            >
              {j.stage}
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 26,
                color: colors.text,
                whiteSpace: "nowrap",
              }}
            >
              &quot;{j.keyword}&quot;
            </div>
          </div>
        );
      })}
    </div>
  );
};
