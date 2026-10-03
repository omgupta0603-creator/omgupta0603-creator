import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const W = 860;

/** Duplicate URLs point to one preferred version; the canonical tag explains how. */
export const CanonicalVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.canonical;
  const dupAt = 14;
  const arrowsAt = 52;
  const prefAt = 66;
  const pref = springIn({ frame, fps, delay: prefAt, config: springs.bouncy });
  const tagAt = 90;
  const ys = [60, 170, 280];

  return (
    <div
      style={{ width: W, display: "flex", flexDirection: "column", gap: 30 }}
    >
      <div style={{ position: "relative", height: 340 }}>
        <svg width={W} height={340} style={{ position: "absolute", inset: 0 }}>
          {ys.map((y, i) => {
            const d = progress(frame, arrowsAt + i * 5, arrowsAt + i * 5 + 16);
            return (
              <path
                key={i}
                d={`M 360 ${y} C 470 ${y}, 480 170, 560 170`}
                fill="none"
                stroke={color}
                strokeWidth={4}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - d}
              />
            );
          })}
        </svg>
        {c.duplicates.map((u, i) => {
          const t = springIn({
            frame,
            fps,
            delay: dupAt + i * 7,
            config: springs.snappy,
          });
          const dim = progress(frame, prefAt, prefAt + 14);
          return (
            <div
              key={u}
              style={{
                position: "absolute",
                left: 0,
                top: ys[i] - 34,
                width: 350,
                height: 68,
                borderRadius: 16,
                background: colors.surface,
                border: `1px dashed ${colors.textMuted}`,
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                fontFamily: "monospace",
                fontSize: 23,
                color: colors.text,
                opacity: t * mix(dim, 1, 0.55),
                transform: `translateX(${mix(t, -40, 0)}px)`,
              }}
            >
              {u}
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            left: 570,
            top: 170 - 80,
            width: 290,
            height: 160,
            borderRadius: 22,
            background: colors.backgroundAlt,
            border: `3px solid ${color}`,
            boxShadow: `0 0 ${pref * 60}px ${color}66`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            transform: `scale(${pref})`,
          }}
        >
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 18,
              letterSpacing: 3,
              color,
            }}
          >
            PREFERRED VERSION
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: 34,
              color: colors.text,
            }}
          >
            {c.preferred}
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: 20,
              color: colors.success,
            }}
          >
            ✓ Canonical
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "18px 24px",
          borderRadius: 16,
          background: "#0B1024",
          border: `1px solid ${colors.border}`,
          fontFamily: "monospace",
          fontSize: 21,
          color: colors.text,
          opacity: progress(frame, tagAt, tagAt + 12),
          transform: `translateY(${mix(progress(frame, tagAt, tagAt + 12), 20, 0)}px)`,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: colors.secondary }}>&lt;link</span>{" "}
        <span style={{ color: colors.warm }}>rel</span>=&quot;canonical&quot;{" "}
        <span style={{ color: colors.warm }}>href</span>
        =&quot;https://yourwebsite.com{c.preferred}&quot;
        <span style={{ color: colors.secondary }}>&gt;</span>
      </div>
    </div>
  );
};
