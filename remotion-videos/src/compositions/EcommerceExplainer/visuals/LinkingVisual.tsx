import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const W = 860;
const H = 560;
const C = { x: W / 2, y: H / 2 };

/** A category hub links out to products and related categories; a crawler dot follows the links. */
export const LinkingVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.linking;
  const n = c.nodes.length;
  const pos = c.nodes.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return { x: C.x + Math.cos(a) * 320, y: C.y + Math.sin(a) * 210 };
  });
  const hub = springIn({ frame, fps, delay: 8, config: springs.bouncy });
  const edgeStart = 24;
  const crawlStart = edgeStart + n * 7 + 10;
  const ct = Math.max(0, (frame - crawlStart) / 16);
  const target = Math.floor(ct) % n;
  const half = ct - Math.floor(ct);
  // Out to a node in the first half, back to the hub in the second.
  const k = half < 0.5 ? half * 2 : (1 - half) * 2;
  const dot = {
    x: C.x + (pos[target].x - C.x) * k,
    y: C.y + (pos[target].y - C.y) * k,
  };

  return (
    <div style={{ position: "relative", width: W, height: H }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        {pos.map((p, i) => {
          const d = progress(frame, edgeStart + i * 7, edgeStart + i * 7 + 14);
          return (
            <line
              key={i}
              x1={C.x}
              y1={C.y}
              x2={p.x}
              y2={p.y}
              stroke={i >= 3 ? colors.secondary : color}
              strokeWidth={4}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - d}
              opacity={0.8}
            />
          );
        })}
        {frame >= crawlStart ? (
          <>
            <circle cx={dot.x} cy={dot.y} r={22} fill={`${colors.warm}44`} />
            <circle cx={dot.x} cy={dot.y} r={11} fill={colors.warm} />
          </>
        ) : null}
      </svg>
      <div
        style={{
          position: "absolute",
          left: C.x,
          top: C.y,
          transform: `translate(-50%, -50%) scale(${hub})`,
          padding: "22px 30px",
          borderRadius: 22,
          background: color,
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: 32,
          color: "white",
          whiteSpace: "nowrap",
          boxShadow: `0 0 60px ${color}66`,
        }}
      >
        {c.hub}
      </div>
      {c.nodes.map((name, i) => {
        const t = springIn({
          frame,
          fps,
          delay: edgeStart + i * 7 + 8,
          config: springs.snappy,
        });
        const isCat = i >= 3;
        return (
          <div
            key={name}
            style={{
              position: "absolute",
              left: pos[i].x,
              top: pos[i].y,
              transform: `translate(-50%, -50%) scale(${t})`,
              padding: "12px 20px",
              borderRadius: 16,
              background: colors.backgroundAlt,
              border: `2px solid ${isCat ? colors.secondary : color}`,
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: 24,
              color: colors.text,
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: -6,
          display: "flex",
          gap: 22,
          fontFamily: fonts.body,
          fontSize: 20,
          color: colors.textMuted,
          opacity: progress(frame, crawlStart, crawlStart + 10),
        }}
      >
        <span>
          <span style={{ color }}>■</span> Related products
        </span>
        <span>
          <span style={{ color: colors.secondary }}>■</span> Related categories
        </span>
        <span>
          <span style={{ color: colors.warm }}>●</span> Crawler
        </span>
      </div>
    </div>
  );
};
