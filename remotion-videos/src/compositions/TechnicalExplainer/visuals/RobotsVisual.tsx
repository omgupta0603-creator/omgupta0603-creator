import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { mix, springIn, springs } from "../../../utils/animation";
import { content } from "../content";
import { CodeCard } from "./CodeCard";

const colorize = (text: string) => {
  const m = text.match(/^(User-agent|Disallow|Allow|Sitemap)(:?)(.*)$/);
  if (!m) return text;
  const key = {
    "User-agent": colors.secondary,
    Disallow: colors.danger,
    Allow: colors.success,
    Sitemap: colors.warm,
  }[m[1] as "User-agent"];
  return (
    <>
      <span style={{ color: key }}>{m[1]}</span>
      {m[2]}
      <span style={{ color: colors.text }}>{m[3]}</span>
    </>
  );
};

/** robots.txt types itself, then a bot checks two paths: one allowed, one blocked. */
export const RobotsVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.robots;
  const typedChars = c.lines.reduce((a, l) => a + Math.max(1, l.length), 0);
  const checksAt = 14 + typedChars / 2.4 + 10;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 26, width: 840 }}
    >
      <CodeCard
        filename="yourwebsite.com/robots.txt"
        lines={c.lines}
        start={14}
        charsPerFrame={2.4}
        renderLine={(t) => colorize(t)}
        fontSize={25}
      />
      <div style={{ display: "flex", gap: 22 }}>
        {c.checks.map((ch, i) => {
          const t = springIn({
            frame,
            fps,
            delay: checksAt + i * 14,
            config: springs.snappy,
          });
          const col = ch.allowed ? colors.success : colors.danger;
          return (
            <div
              key={ch.path}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 22px",
                borderRadius: 18,
                background: `${col}1F`,
                border: `2px solid ${col}`,
                opacity: t,
                transform: `translateY(${mix(t, 30, 0)}px)`,
              }}
            >
              {/* bot */}
              <svg width={40} height={40} viewBox="0 0 24 24">
                <rect
                  x={4}
                  y={7}
                  width={16}
                  height={12}
                  rx={3}
                  fill="none"
                  stroke={colors.text}
                  strokeWidth={1.8}
                />
                <circle cx={9} cy={13} r={1.6} fill={colors.text} />
                <circle cx={15} cy={13} r={1.6} fill={colors.text} />
                <path d="M12 7 V3" stroke={colors.text} strokeWidth={1.8} />
              </svg>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 24,
                  color: colors.text,
                }}
              >
                {ch.path}
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  fontFamily: fonts.body,
                  fontWeight: 700,
                  fontSize: 22,
                  color: col,
                }}
              >
                {ch.allowed ? "✓ May access" : "✕ Not allowed"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
