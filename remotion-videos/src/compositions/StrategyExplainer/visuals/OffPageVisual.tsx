import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const W = 860;
const H = 520;
const T = { x: 660, y: H / 2 };
const COLS = [colors.primary, colors.secondary, colors.warm, colors.success];

/** Four activity sources feed links into your site while its authority ring fills. */
export const OffPageVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.offpage;
  const ys = [80, 200, 320, 440];
  const auth = progress(frame, 30, 90);
  const tgt = springIn({ frame, fps, delay: 8, config: springs.bouncy });
  const R = 110;
  const CIRC = 2 * Math.PI * R;

  return (
    <div style={{ position: "relative", width: W, height: H }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        {ys.map((y, i) => {
          const d = progress(frame, 26 + i * 8, 44 + i * 8);
          return (
            <path
              key={i}
              d={`M 300 ${y} C 420 ${y}, 440 ${T.y}, ${T.x - 130} ${T.y}`}
              fill="none"
              stroke={COLS[i]}
              strokeWidth={4}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - d}
            />
          );
        })}
        <circle
          cx={T.x}
          cy={T.y}
          r={R}
          fill="none"
          stroke={colors.border}
          strokeWidth={14}
        />
        <circle
          cx={T.x}
          cy={T.y}
          r={R}
          fill="none"
          stroke={colors.accent}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - auth * 0.85)}
          transform={`rotate(-90 ${T.x} ${T.y})`}
          opacity={tgt}
        />
      </svg>
      {c.sources.map((s, i) => {
        const t = springIn({
          frame,
          fps,
          delay: 14 + i * 6,
          config: springs.snappy,
        });
        return (
          <div
            key={s}
            style={{
              position: "absolute",
              left: 0,
              top: ys[i] - 32,
              width: 300,
              height: 64,
              borderRadius: 16,
              background: `${COLS[i]}22`,
              border: `2px solid ${COLS[i]}`,
              display: "flex",
              alignItems: "center",
              paddingLeft: 20,
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: 25,
              color: colors.text,
              opacity: t,
              transform: `translateX(${mix(t, -40, 0)}px)`,
            }}
          >
            {s}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: T.x,
          top: T.y,
          transform: `translate(-50%, -50%) scale(${tgt})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 30,
            color: colors.text,
          }}
        >
          {c.target}
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 52,
            color: colors.text,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {Math.round(mix(auth, 20, 68))}
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 18,
            letterSpacing: 3,
            color: colors.accent,
          }}
        >
          AUTHORITY
        </div>
      </div>
    </div>
  );
};
