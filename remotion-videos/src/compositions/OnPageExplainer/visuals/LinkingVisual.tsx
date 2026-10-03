import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const W = 820;
const H = 600;

// Node positions (match content.linking.pages order).
const POS = [
  { x: 410, y: 80 }, // Home
  { x: 170, y: 250 }, // Blog
  { x: 650, y: 250 }, // On-Page SEO
  { x: 170, y: 460 }, // Technical SEO
  { x: 650, y: 460 }, // Services
  { x: 410, y: 540 }, // Contact
];
// Links in the order they are drawn; the crawler walks this same path.
const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 4],
  [1, 3],
  [3, 2],
  [4, 5],
];

/** Pages connect with internal links, then a crawler dot follows the links. */
export const LinkingVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pages = content.linking.pages;
  const edgeStart = 30;
  const edgeStep = 10;
  const crawlStart = edgeStart + EDGES.length * edgeStep + 12;
  const perEdge = 14;

  // Crawler position along the edge path.
  const crawlT = (frame - crawlStart) / perEdge;
  const edgeIdx = Math.min(EDGES.length - 1, Math.max(0, Math.floor(crawlT)));
  const local = Math.min(1, Math.max(0, crawlT - edgeIdx));
  const [a, b] = EDGES[edgeIdx];
  const crawler = {
    x: mix(local, POS[a].x, POS[b].x),
    y: mix(local, POS[a].y, POS[b].y),
  };
  const visited = (i: number) =>
    frame >= crawlStart &&
    EDGES.some(
      ([from, to], k) =>
        (k < crawlT && to === i) || (k <= crawlT && from === i),
    );

  return (
    <div style={{ position: "relative", width: W, height: H }}>
      <svg
        width={W}
        height={H}
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        {EDGES.map(([from, to], k) => {
          const len = Math.hypot(
            POS[to].x - POS[from].x,
            POS[to].y - POS[from].y,
          );
          const d = edgeStart + k * edgeStep;
          const draw = progress(frame, d, d + 14);
          return (
            <line
              key={k}
              x1={POS[from].x}
              y1={POS[from].y}
              x2={POS[to].x}
              y2={POS[to].y}
              stroke={color}
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray={len}
              strokeDashoffset={len * (1 - draw)}
              opacity={0.75}
            />
          );
        })}
        {frame >= crawlStart ? (
          <>
            <circle
              cx={crawler.x}
              cy={crawler.y}
              r={26}
              fill={`${colors.warm}44`}
            />
            <circle cx={crawler.x} cy={crawler.y} r={13} fill={colors.warm} />
          </>
        ) : null}
      </svg>
      {pages.map((p, i) => {
        const t = springIn({
          frame,
          fps,
          delay: 6 + i * 5,
          config: springs.snappy,
        });
        const lit = visited(i);
        return (
          <div
            key={p}
            style={{
              position: "absolute",
              left: POS[i].x,
              top: POS[i].y,
              transform: `translate(-50%, -50%) scale(${t})`,
              padding: "16px 26px",
              borderRadius: 18,
              background: colors.backgroundAlt,
              border: `2px solid ${lit ? colors.warm : color}`,
              boxShadow: lit
                ? `0 0 40px ${colors.warm}66`
                : "0 20px 50px rgba(0,0,0,0.4)",
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: 28,
              color: colors.text,
              whiteSpace: "nowrap",
            }}
          >
            {p}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 150,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: fonts.body,
          fontSize: 22,
          color: colors.textMuted,
          opacity: progress(frame, crawlStart, crawlStart + 10),
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            background: colors.warm,
          }}
        />
        Search engine crawler
      </div>
    </div>
  );
};
