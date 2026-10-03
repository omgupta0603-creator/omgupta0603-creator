import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";

const SIZE = 760;
const C = SIZE / 2;
const R = 290;

/** Outside sources link into the site, and its authority grows. */
export const OffPageVisual: React.FC<{
  sources: readonly string[];
  color: string;
}> = ({ sources, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const nodes = sources.map((label, i) => {
    const a = -Math.PI / 2 + Math.PI / 4 + (i * Math.PI * 2) / sources.length;
    return {
      label,
      x: C + Math.cos(a) * R,
      y: C + Math.sin(a) * R,
      delay: 20 + i * 12,
    };
  });
  const lastLink = nodes[nodes.length - 1].delay + 18;
  const authority = progress(frame, 24, lastLink + 6);
  const centerPop = springIn({ frame, fps, delay: 4, config: springs.bouncy });

  return (
    <div style={{ width: SIZE, height: SIZE, position: "relative" }}>
      <svg
        width={SIZE}
        height={SIZE}
        style={{ position: "absolute", inset: 0 }}
      >
        {nodes.map((n) => {
          const len = Math.hypot(n.x - C, n.y - C);
          const draw = progress(frame, n.delay + 6, n.delay + 20);
          return (
            <line
              key={n.label}
              x1={n.x}
              y1={n.y}
              x2={C}
              y2={C}
              stroke={color}
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray={len}
              strokeDashoffset={len * (1 - draw)}
              opacity={0.85}
            />
          );
        })}
        {/* Authority ring around the site */}
        <circle
          cx={C}
          cy={C}
          r={150}
          fill="none"
          stroke={colors.border}
          strokeWidth={14}
        />
        <circle
          cx={C}
          cy={C}
          r={150}
          fill="none"
          stroke={color}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 150}
          strokeDashoffset={2 * Math.PI * 150 * (1 - authority)}
          transform={`rotate(-90 ${C} ${C})`}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left: C - 125,
          top: C - 125,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: colors.backgroundAlt,
          border: `1px solid ${colors.border}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${centerPop * mix(authority, 1, 1.06)})`,
          boxShadow: `0 0 ${mix(authority, 0, 90)}px ${color}88`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 24,
            color: colors.textMuted,
          }}
        >
          your site
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 68,
            color: colors.text,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {Math.round(mix(authority, 12, 64))}
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 20,
            letterSpacing: 3,
            color,
          }}
        >
          AUTHORITY
        </div>
      </div>

      {nodes.map((n) => {
        const t = springIn({
          frame,
          fps,
          delay: n.delay,
          config: springs.snappy,
        });
        return (
          <div
            key={n.label}
            style={{
              position: "absolute",
              left: n.x,
              top: n.y,
              transform: `translate(-50%, -50%) scale(${t})`,
              padding: "16px 26px",
              borderRadius: 20,
              background: colors.backgroundAlt,
              border: `2px solid ${color}`,
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: 28,
              color: colors.text,
              whiteSpace: "nowrap",
              boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            }}
          >
            {n.label}
          </div>
        );
      })}
    </div>
  );
};
