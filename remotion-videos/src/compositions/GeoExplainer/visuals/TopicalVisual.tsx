import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const COLS = [colors.secondary, colors.warm, colors.accent, colors.success];
const W = 880;
const H = 560;

/** A topic hub with four groups around it: questions, use cases, comparisons, insights. */
export const TopicalVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.topical;
  const hub = springIn({ frame, fps, delay: 8, config: springs.bouncy });
  const spots = [
    { x: 0, y: 0 },
    { x: W - 400, y: 0 },
    { x: 0, y: H - 190 },
    { x: W - 400, y: H - 190 },
  ];

  return (
    <div style={{ position: "relative", width: W, height: H }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        {spots.map((s, i) => (
          <line
            key={i}
            x1={W / 2}
            y1={H / 2}
            x2={s.x + 200}
            y2={s.y + 95}
            stroke={COLS[i]}
            strokeWidth={3}
            opacity={0.6}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - progress(frame, 18 + i * 10, 32 + i * 10)}
          />
        ))}
      </svg>
      {c.groups.map((g, i) => {
        const t = springIn({
          frame,
          fps,
          delay: 24 + i * 10,
          config: springs.snappy,
        });
        return (
          <div
            key={g.name}
            style={{
              position: "absolute",
              left: spots[i].x,
              top: spots[i].y,
              width: 400,
              padding: "18px 20px",
              borderRadius: 20,
              background: colors.backgroundAlt,
              border: `2px solid ${COLS[i]}`,
              opacity: t,
              transform: `scale(${mix(t, 0.85, 1)})`,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 26,
                color: COLS[i],
              }}
            >
              {g.name}
            </div>
            {g.items.map((it) => (
              <div
                key={it}
                style={{
                  fontFamily: fonts.body,
                  fontSize: 22,
                  color: colors.text,
                }}
              >
                • {it}
              </div>
            ))}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: W / 2,
          top: H / 2,
          transform: `translate(-50%, -50%) scale(${hub})`,
          padding: "18px 28px",
          borderRadius: 20,
          background: color,
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: 32,
          color: "white",
          whiteSpace: "nowrap",
          boxShadow: `0 0 50px ${color}88`,
        }}
      >
        {c.hub}
      </div>
    </div>
  );
};
