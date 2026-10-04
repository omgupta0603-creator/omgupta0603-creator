import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const W = 880;
const H = 560;
const C = { x: W / 2, y: H / 2 };
const COLS = [
  colors.primary,
  colors.secondary,
  colors.warm,
  colors.accent,
  colors.success,
];

/** Trusted sources around the brand send "mentions" in; the brand grows and the count rises. */
export const BrandVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.brand;
  const n = c.sources.length;
  const pos = c.sources.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return { x: C.x + Math.cos(a) * 330, y: C.y + Math.sin(a) * 215 };
  });
  const grow = progress(frame, 30, 100);
  const hub = springIn({ frame, fps, delay: 6, config: springs.bouncy });

  return (
    <div style={{ position: "relative", width: W, height: H }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        {pos.map((p, i) => {
          const d = 22 + i * 8;
          const t = ((frame - d - 10) % 36) / 36;
          const active = frame > d + 10;
          return (
            <g key={i}>
              <line
                x1={p.x}
                y1={p.y}
                x2={C.x}
                y2={C.y}
                stroke={COLS[i]}
                strokeWidth={3}
                opacity={0.5}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - progress(frame, d, d + 12)}
              />
              {active ? (
                <circle
                  cx={mix(t, p.x, C.x)}
                  cy={mix(t, p.y, C.y)}
                  r={8}
                  fill={COLS[i]}
                />
              ) : null}
            </g>
          );
        })}
      </svg>
      {c.sources.map((s, i) => {
        const t = springIn({
          frame,
          fps,
          delay: 14 + i * 8,
          config: springs.snappy,
        });
        return (
          <div
            key={s}
            style={{
              position: "absolute",
              left: pos[i].x,
              top: pos[i].y,
              transform: `translate(-50%, -50%) scale(${t})`,
              padding: "12px 20px",
              borderRadius: 16,
              background: colors.backgroundAlt,
              border: `2px solid ${COLS[i]}`,
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: 24,
              color: colors.text,
              whiteSpace: "nowrap",
            }}
          >
            {s}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: C.x,
          top: C.y,
          transform: `translate(-50%, -50%) scale(${hub * mix(grow, 0.9, 1.12)})`,
          width: 230,
          height: 230,
          borderRadius: 115,
          background: colors.backgroundAlt,
          border: `4px solid ${color}`,
          boxShadow: `0 0 ${mix(grow, 10, 80)}px ${color}AA`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 32,
            color: colors.text,
          }}
        >
          {c.brand}
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 48,
            color,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {Math.round(c.mentions * grow)}
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 17,
            letterSpacing: 3,
            color: colors.textMuted,
          }}
        >
          MENTIONS
        </div>
      </div>
    </div>
  );
};
