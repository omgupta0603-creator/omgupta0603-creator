import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Card } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const COLS = [colors.primary, colors.secondary, colors.warm];

/** Three ways to structure international URLs, with the country part highlighted. */
export const UrlVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opts = content.urls.options;

  return (
    <div
      style={{ width: 860, display: "flex", flexDirection: "column", gap: 24 }}
    >
      {opts.map((o, i) => {
        const d = 14 + i * 18;
        const t = springIn({ frame, fps, delay: d, config: springs.snappy });
        const hl = progress(frame, d + 14, d + 26);
        return (
          <Card
            key={o.name}
            style={{
              padding: "24px 30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: t,
              transform: `translateX(${mix(t, 60, 0)}px)`,
              borderColor: COLS[i],
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
              {o.name}
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 34,
                color: colors.textMuted,
                whiteSpace: "nowrap",
              }}
            >
              {o.before}
              <span
                style={{
                  color: colors.text,
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: 8,
                  background: `rgba(255,255,255,${hl * 0.06})`,
                  boxShadow: `inset 0 -${Math.round(hl * 6)}px 0 ${COLS[i]}`,
                }}
              >
                {o.part}
              </span>
              {o.after}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
