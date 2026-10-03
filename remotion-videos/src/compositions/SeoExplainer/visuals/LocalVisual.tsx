import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { Pill } from "../../../components";

const W = 800;
const H = 620;

const Pin: React.FC<{
  color: string;
  delay: number;
  x: number;
  y: number;
  size: number;
}> = ({ color, delay, x, y, size }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drop = springIn({ frame, fps, delay, config: springs.bouncy });
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 40 52"
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size * 1.3,
        opacity: Math.min(1, drop * 2),
        transform: `translateY(${mix(drop, -220, 0)}px)`,
        filter: `drop-shadow(0 12px 18px rgba(0,0,0,0.5))`,
      }}
    >
      <path
        d="M20 52 C20 52 0 30 0 20 A20 20 0 0 1 40 20 C40 30 20 52 20 52 Z"
        fill={color}
      />
      <circle cx={20} cy={20} r={8} fill={colors.background} />
    </svg>
  );
};

/** Stylised map: pins drop in, the main pin pulses, and local queries appear. */
export const LocalVisual: React.FC<{
  queries: readonly string[];
  color: string;
}> = ({ queries, color }) => {
  const frame = useCurrentFrame();
  const cx = W / 2;
  const cy = H / 2 + 40;
  const pulse = (offset: number) => ((frame - 30 + offset) % 45) / 45;

  return (
    <div
      style={{
        width: W,
        height: H,
        position: "relative",
        borderRadius: 32,
        overflow: "hidden",
        background: "#0E1430",
        border: `1px solid ${colors.border}`,
        boxShadow: "0 40px 100px rgba(0,0,0,0.45)",
      }}
    >
      {/* Streets */}
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        {[90, 230, 410, 540].map((y, i) => (
          <rect
            key={`h${i}`}
            x={0}
            y={y}
            width={W}
            height={i % 2 ? 10 : 22}
            fill="rgba(255,255,255,0.07)"
          />
        ))}
        {[120, 300, 520, 690].map((x, i) => (
          <rect
            key={`v${i}`}
            x={x}
            y={0}
            width={i % 2 ? 22 : 10}
            height={H}
            fill="rgba(255,255,255,0.07)"
          />
        ))}
        <path
          d="M0 470 C 200 420, 320 520, 800 360"
          stroke="rgba(0,209,255,0.18)"
          strokeWidth={30}
          fill="none"
        />
        <rect
          x={560}
          y={120}
          width={110}
          height={90}
          rx={16}
          fill="rgba(40,200,64,0.12)"
        />
        {frame >= 30
          ? [0, 22].map((o) => (
              <circle
                key={o}
                cx={cx}
                cy={cy}
                r={20 + pulse(o) * 140}
                fill="none"
                stroke={color}
                strokeWidth={4}
                opacity={(1 - pulse(o)) * progress(frame, 30, 40)}
              />
            ))
          : null}
      </svg>

      <Pin color={colors.textMuted} delay={14} x={180} y={200} size={34} />
      <Pin color={colors.textMuted} delay={18} x={640} y={470} size={34} />
      <Pin color={color} delay={24} x={cx} y={cy} size={64} />

      <div
        style={{
          position: "absolute",
          left: 32,
          top: 28,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          alignItems: "flex-start",
        }}
      >
        {queries.map((q, i) => (
          <Pill
            key={q}
            color={color}
            delay={40 + i * 16}
            fontSize={28}
            style={{ background: "rgba(7,11,26,0.85)" }}
          >
            <svg width={22} height={22} viewBox="0 0 24 24">
              <circle
                cx={10}
                cy={10}
                r={7}
                fill="none"
                stroke={colors.text}
                strokeWidth={2.5}
              />
              <path
                d="M15 15 L21 21"
                stroke={colors.text}
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            </svg>
            {q}
          </Pill>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          right: 28,
          bottom: 28,
          fontFamily: fonts.body,
          fontSize: 22,
          color: colors.textMuted,
          opacity: progress(frame, 70, 85),
        }}
      >
        Map pack · Google Business Profile
      </div>
    </div>
  );
};
