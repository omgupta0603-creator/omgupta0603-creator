import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { mix, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

/** Simple responsive page: header, hero, cards that reflow by width. */
const Page: React.FC<{ cols: number; color: string }> = ({ cols, color }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 8,
      padding: 10,
      height: "100%",
    }}
  >
    <div
      style={{ height: 12, width: "40%", borderRadius: 6, background: color }}
    />
    <div
      style={{
        height: 50,
        borderRadius: 8,
        background: `linear-gradient(135deg, ${color}88, ${colors.primary}55)`,
      }}
    />
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 8,
        flex: 1,
      }}
    >
      {new Array(cols * 2).fill(0).map((_, i) => (
        <div
          key={i}
          style={{ borderRadius: 6, background: "rgba(255,255,255,0.14)" }}
        />
      ))}
    </div>
  </div>
);

const Device: React.FC<{
  w: number;
  h: number;
  radius: number;
  delay: number;
  cols: number;
  color: string;
  label: string;
}> = ({ w, h, radius, delay, cols, color, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = springIn({ frame, fps, delay, config: springs.snappy });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        opacity: t,
        transform: `translateY(${mix(t, 40, 0)}px)`,
      }}
    >
      <div
        style={{
          width: w,
          height: h,
          borderRadius: radius,
          border: `6px solid #2A3155`,
          background: colors.backgroundAlt,
          overflow: "hidden",
        }}
      >
        <Page cols={cols} color={color} />
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 20,
          color: colors.textMuted,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const MobileVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const badge = springIn({ frame, fps, delay: 64, config: springs.bouncy });
  return (
    <div
      style={{
        width: 860,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 34,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: 30 }}>
        <Device
          w={420}
          h={280}
          radius={14}
          delay={12}
          cols={4}
          color={color}
          label="Desktop"
        />
        <Device
          w={200}
          h={270}
          radius={18}
          delay={24}
          cols={2}
          color={color}
          label="Tablet"
        />
        <Device
          w={120}
          h={230}
          radius={22}
          delay={36}
          cols={1}
          color={color}
          label="Mobile"
        />
      </div>
      <div
        style={{
          padding: "12px 26px",
          borderRadius: 999,
          background: `${colors.success}22`,
          border: `2px solid ${colors.success}`,
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 28,
          color: colors.text,
          transform: `scale(${badge})`,
        }}
      >
        ✓ {content.mobile.badge}
      </div>
    </div>
  );
};
