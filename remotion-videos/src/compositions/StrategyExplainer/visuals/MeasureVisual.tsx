import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Card } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const PTS = [0.2, 0.26, 0.24, 0.35, 0.42, 0.4, 0.55, 0.62, 0.7, 0.78, 0.86];

/** Rising organic-traffic line, KPI tiles, and a "continuously improve" loop. */
export const MeasureVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.measure;
  const W = 800;
  const H = 170;
  const draw = progress(frame, 10, 50);
  const path = PTS.map(
    (p, i) =>
      `${i === 0 ? "M" : "L"} ${(i / (PTS.length - 1)) * W} ${H - p * H}`,
  ).join(" ");
  const loop = springIn({ frame, fps, delay: 100, config: springs.bouncy });

  return (
    <div
      style={{ width: 860, display: "flex", flexDirection: "column", gap: 18 }}
    >
      <Card style={{ padding: "22px 30px" }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 20,
            letterSpacing: 3,
            color: colors.textMuted,
            marginBottom: 10,
          }}
        >
          ORGANIC TRAFFIC
        </div>
        <svg width={W} height={H} style={{ overflow: "visible" }}>
          <path
            d={`${path} L ${W} ${H} L 0 ${H} Z`}
            fill={`${colors.success}22`}
            opacity={draw}
          />
          <path
            d={path}
            fill="none"
            stroke={colors.success}
            strokeWidth={5}
            strokeLinejoin="round"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - draw}
          />
        </svg>
      </Card>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 14,
        }}
      >
        {c.kpis.map((k, i) => {
          const t = springIn({
            frame,
            fps,
            delay: 40 + i * 7,
            config: springs.snappy,
          });
          return (
            <div
              key={k.name}
              style={{
                padding: "14px 18px",
                borderRadius: 16,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                opacity: t,
                transform: `translateY(${mix(t, 24, 0)}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 18,
                  color: colors.textMuted,
                }}
              >
                {k.name}
              </div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: 32,
                  color: colors.text,
                }}
              >
                {k.value}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          alignSelf: "flex-start",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 22px",
          borderRadius: 999,
          background: `${colors.primary}26`,
          border: `2px solid ${colors.primary}`,
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 24,
          color: colors.text,
          transform: `scale(${loop})`,
        }}
      >
        <span
          style={{
            display: "inline-block",
            transform: `rotate(${frame * 4}deg)`,
            color: colors.primary,
          }}
        >
          ↻
        </span>
        {c.loop}
      </div>
    </div>
  );
};
