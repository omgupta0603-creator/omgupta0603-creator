import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Card, Check } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

/** "Last updated" flips to now, the same brand facts match everywhere, sources are cited. */
export const FreshVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.fresh;
  const flip = progress(frame, 18, 30);
  const rowsAt = 40;
  const srcAt = rowsAt + c.profiles.length * 10 + 10;
  const src = springIn({ frame, fps, delay: srcAt, config: springs.bouncy });

  return (
    <div
      style={{ width: 860, display: "flex", flexDirection: "column", gap: 20 }}
    >
      <Card
        style={{
          padding: "20px 26px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
          Route Planning Guide
        </div>
        <div style={{ position: "relative", width: 260, height: 44 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              border: `2px solid ${colors.danger}`,
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: 20,
              color: colors.textMuted,
              opacity: 1 - flip,
              transform: `rotateX(${flip * 90}deg)`,
            }}
          >
            {c.updatedFrom}
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              background: `${colors.success}22`,
              border: `2px solid ${colors.success}`,
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: 20,
              color: colors.text,
              opacity: flip,
              transform: `rotateX(${(1 - flip) * -90}deg)`,
            }}
          >
            ✓ {c.updatedTo}
          </div>
        </div>
      </Card>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 20,
          letterSpacing: 3,
          color: colors.textMuted,
          opacity: progress(frame, rowsAt - 6, rowsAt),
        }}
      >
        CONSISTENT BRAND INFORMATION
      </div>
      {c.profiles.map((p, i) => {
        const d = rowsAt + i * 10;
        const t = springIn({ frame, fps, delay: d, config: springs.snappy });
        return (
          <div
            key={p}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "14px 20px",
              borderRadius: 16,
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              opacity: t,
              transform: `translateX(${mix(t, 40, 0)}px)`,
            }}
          >
            <div
              style={{
                width: 210,
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: 24,
                color,
              }}
            >
              {p}
            </div>
            <div
              style={{
                flex: 1,
                fontFamily: fonts.body,
                fontSize: 22,
                color: colors.text,
              }}
            >
              {c.field}
            </div>
            <Check delay={d + 6} color={colors.success} size={34} />
          </div>
        );
      })}
      <div
        style={{
          alignSelf: "flex-start",
          padding: "10px 22px",
          borderRadius: 999,
          background: `${color}22`,
          border: `2px solid ${color}`,
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 24,
          color: colors.text,
          transform: `scale(${src})`,
        }}
      >
        ✓ {c.sources}
      </div>
    </div>
  );
};
