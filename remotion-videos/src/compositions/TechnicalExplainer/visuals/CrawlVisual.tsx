import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Card } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const ROW = 70;

/** A crawler moves down the site's pages; important ones get indexed, the rest are kept out. */
export const CrawlVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pages = content.crawl.pages;
  const start = 24;
  const step = 16;
  const pos = Math.min(pages.length - 1, Math.max(0, (frame - start) / step));
  const indexedCount = pages.filter(
    (p, i) => p.indexed && frame >= start + i * step + 6,
  ).length;

  return (
    <div
      style={{ display: "flex", gap: 30, alignItems: "stretch", width: 860 }}
    >
      <Card style={{ flex: 1, padding: "28px 30px", position: "relative" }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 20,
            letterSpacing: 4,
            color: colors.textMuted,
            marginBottom: 16,
          }}
        >
          YOUR WEBSITE
        </div>
        <div style={{ position: "relative" }}>
          {/* Crawler */}
          <div
            style={{
              position: "absolute",
              left: -14,
              top: pos * ROW + ROW / 2 - 14,
              width: 28,
              height: 28,
              borderRadius: 14,
              background: colors.warm,
              boxShadow: `0 0 24px ${colors.warm}`,
              opacity: progress(frame, start - 6, start),
            }}
          />
          {pages.map((p, i) => {
            const at = start + i * step + 6;
            const t = springIn({
              frame,
              fps,
              delay: at,
              config: springs.snappy,
            });
            const seen = frame >= at;
            return (
              <div
                key={p.path}
                style={{
                  height: ROW,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingLeft: 30,
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 24,
                    color: seen ? colors.text : colors.textMuted,
                  }}
                >
                  {p.path}
                </div>
                <div
                  style={{
                    padding: "6px 14px",
                    borderRadius: 999,
                    fontFamily: fonts.body,
                    fontWeight: 700,
                    fontSize: 18,
                    background: p.indexed
                      ? `${colors.success}22`
                      : "rgba(255,255,255,0.08)",
                    border: `2px solid ${p.indexed ? colors.success : colors.textMuted}`,
                    color: p.indexed ? colors.success : colors.textMuted,
                    transform: `scale(${t})`,
                  }}
                >
                  {p.indexed ? "✓ Indexed" : "noindex"}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      <div
        style={{
          width: 230,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 14,
        }}
      >
        <svg width={110} height={110} viewBox="0 0 48 48">
          <ellipse
            cx={24}
            cy={10}
            rx={16}
            ry={5}
            fill="none"
            stroke={color}
            strokeWidth={3}
          />
          <path
            d="M8 10 v28 c0 3 7 5 16 5 s16 -2 16 -5 v-28"
            fill="none"
            stroke={color}
            strokeWidth={3}
          />
          <path
            d="M8 20 c0 3 7 5 16 5 s16 -2 16 -5 M8 29 c0 3 7 5 16 5 s16 -2 16 -5"
            fill="none"
            stroke={color}
            strokeWidth={3}
          />
        </svg>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 22,
            letterSpacing: 3,
            color: colors.textMuted,
          }}
        >
          SEARCH INDEX
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 72,
            color: colors.text,
            transform: `scale(${mix(springIn({ frame, fps, delay: start, config: springs.smooth }), 0.6, 1)})`,
          }}
        >
          {indexedCount}
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 22,
            color: colors.textMuted,
          }}
        >
          pages indexed
        </div>
      </div>
    </div>
  );
};
