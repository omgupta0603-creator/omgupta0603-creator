import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SearchBar } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const ROW_GAP = 150;

/** Each local search is typed, then an arrow connects it to the page built for it. */
export const LocalKeywordVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pairs = content.keywords.pairs;
  const rowStart = (i: number) => 14 + i * ROW_GAP;

  return (
    <div
      style={{ width: 860, display: "flex", flexDirection: "column", gap: 40 }}
    >
      {pairs.map((p, i) => {
        const s = rowStart(i);
        // Typewriter: characters revealed at 0.8 per frame from frame s.
        const chars = Math.max(
          0,
          Math.min(p.query.length, Math.floor((frame - s) * 0.8)),
        );
        const typed = {
          visible: p.query.slice(0, chars),
          done: chars >= p.query.length,
        };
        const typedEnd = s + p.query.length / 0.8;
        const arrow = progress(frame, typedEnd + 4, typedEnd + 16);
        const page = springIn({
          frame,
          fps,
          delay: typedEnd + 10,
          config: springs.snappy,
        });
        const hl = progress(frame, typedEnd + 22, typedEnd + 36);
        return (
          <div
            key={p.query}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              opacity: progress(frame, s - 8, s),
            }}
          >
            <SearchBar
              text={typed.visible}
              cursor={!typed.done && frame >= s}
              width={560}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                marginLeft: 40,
              }}
            >
              <svg width={80} height={60} style={{ flexShrink: 0 }}>
                <path
                  d="M6 0 V34 Q6 46 18 46 H70"
                  fill="none"
                  stroke={color}
                  strokeWidth={4}
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1 - arrow}
                />
                <path
                  d="M62 38 L72 46 L62 54"
                  fill="none"
                  stroke={color}
                  strokeWidth={4}
                  strokeLinecap="round"
                  opacity={arrow > 0.95 ? 1 : 0}
                />
              </svg>
              <div
                style={{
                  flex: 1,
                  padding: "18px 24px",
                  borderRadius: 20,
                  background: colors.backgroundAlt,
                  border: `2px solid ${color}`,
                  opacity: page,
                  transform: `translateX(${mix(page, 40, 0)}px)`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 20,
                      letterSpacing: 3,
                      color,
                    }}
                  >
                    {p.type.toUpperCase()}
                  </div>
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: 20,
                      color: colors.textMuted,
                    }}
                  >
                    {p.url}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 36,
                    color: colors.text,
                  }}
                >
                  <span
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${colors.warm}, ${colors.warm})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "0 100%",
                      backgroundSize: `${hl * 100}% 14%`,
                      paddingBottom: 4,
                    }}
                  >
                    {p.h1}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
