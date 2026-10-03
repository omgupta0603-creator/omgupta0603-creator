import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

/**
 * Listings on several directories. One shows a wrong phone number (red), then
 * it is corrected so every listing matches (green).
 */
export const CitationsVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.citations;
  const BAD = 2;
  const start = 18;
  const step = 10;
  const fixAt = start + c.rows.length * step + 30;
  const fixed = progress(frame, fixAt, fixAt + 12);
  const badgeIn = springIn({
    frame,
    fps,
    delay: fixAt + 16,
    config: springs.bouncy,
  });
  const shake =
    frame > fixAt - 22 && frame < fixAt ? Math.sin(frame * 1.6) * 5 : 0;

  return (
    <div
      style={{ width: 940, display: "flex", flexDirection: "column", gap: 16 }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "270px 190px 160px 1fr",
          gap: 12,
          padding: "0 22px",
          fontFamily: fonts.body,
          fontSize: 18,
          letterSpacing: 3,
          color: colors.textMuted,
        }}
      >
        <div>LISTING</div>
        <div>NAME</div>
        <div>ADDRESS</div>
        <div>PHONE</div>
      </div>
      {c.rows.map((r, i) => {
        const t = springIn({
          frame,
          fps,
          delay: start + i * step,
          config: springs.snappy,
        });
        const isBad = i === BAD;
        const ok = !isBad || fixed > 0.5;
        const state = isBad ? interpolate(fixed, [0, 1], [0, 1]) : 1;
        const border =
          isBad && fixed < 1 && frame > start + i * step + 20
            ? colors.danger
            : `${colors.success}88`;
        return (
          <div
            key={r}
            style={{
              display: "grid",
              gridTemplateColumns: "270px 190px 160px 1fr",
              gap: 12,
              alignItems: "center",
              padding: "18px 22px",
              borderRadius: 18,
              background: colors.surface,
              border: `2px solid ${border}`,
              opacity: t,
              transform: `translateX(${mix(t, 60, 0) + (isBad ? shake : 0)}px)`,
              fontFamily: fonts.body,
              fontSize: 20,
              color: colors.text,
            }}
          >
            <div style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{r}</div>
            <div style={{ whiteSpace: "nowrap" }}>{c.name}</div>
            <div style={{ whiteSpace: "nowrap" }}>{c.address}</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  color: ok ? colors.text : colors.danger,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {ok ? c.phone : c.wrongPhone}
              </span>
              <span
                style={{
                  color: ok ? colors.success : colors.danger,
                  fontWeight: 700,
                  opacity: isBad ? 1 : state,
                }}
              >
                {ok ? "✓" : "✕"}
              </span>
            </div>
          </div>
        );
      })}
      <div
        style={{
          alignSelf: "flex-start",
          marginTop: 10,
          padding: "12px 26px",
          borderRadius: 999,
          background: `${color}26`,
          border: `2px solid ${color}`,
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 28,
          color: colors.text,
          transform: `scale(${badgeIn})`,
        }}
      >
        {c.badge}
      </div>
    </div>
  );
};
