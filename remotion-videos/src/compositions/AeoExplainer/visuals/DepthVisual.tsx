import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const W = 860;
const H = 580;
const C = { x: W / 2, y: H / 2 - 20 };

/** A topic hub with related questions around it, and an authority meter filling up. */
export const DepthVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.depth;
  const n = c.related.length;
  const pos = c.related.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return { x: C.x + Math.cos(a) * 300, y: C.y + Math.sin(a) * 200 };
  });
  const hub = springIn({ frame, fps, delay: 8, config: springs.bouncy });
  const auth = progress(frame, 24, 24 + n * 9 + 16);

  return (
    <div style={{ position: "relative", width: W, height: H }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        {pos.map((p, i) => (
          <line
            key={i}
            x1={C.x}
            y1={C.y}
            x2={p.x}
            y2={p.y}
            stroke={color}
            strokeWidth={3}
            opacity={0.6}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - progress(frame, 20 + i * 9, 32 + i * 9)}
          />
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          left: C.x,
          top: C.y,
          transform: `translate(-50%, -50%) scale(${hub})`,
          padding: "20px 30px",
          borderRadius: 22,
          background: color,
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: 34,
          color: "white",
          whiteSpace: "nowrap",
          boxShadow: `0 0 ${mix(auth, 0, 80)}px ${color}`,
        }}
      >
        {c.hub}
      </div>
      {c.related.map((q, i) => {
        const t = springIn({
          frame,
          fps,
          delay: 26 + i * 9,
          config: springs.snappy,
        });
        return (
          <div
            key={q}
            style={{
              position: "absolute",
              left: pos[i].x,
              top: pos[i].y,
              transform: `translate(-50%, -50%) scale(${t})`,
              padding: "10px 16px",
              borderRadius: 14,
              background: colors.backgroundAlt,
              border: `2px solid ${colors.border}`,
              fontFamily: fonts.body,
              fontSize: 21,
              color: colors.text,
              whiteSpace: "nowrap",
            }}
          >
            {q}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 20,
            letterSpacing: 3,
            color: colors.textMuted,
          }}
        >
          AUTHORITY
        </div>
        <div
          style={{
            flex: 1,
            height: 14,
            borderRadius: 7,
            background: colors.border,
          }}
        >
          <div
            style={{
              width: `${auth * 100}%`,
              height: "100%",
              borderRadius: 7,
              background: `linear-gradient(90deg, ${color}, ${colors.success})`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
