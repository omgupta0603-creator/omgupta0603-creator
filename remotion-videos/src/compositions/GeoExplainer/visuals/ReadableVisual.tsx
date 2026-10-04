import React from "react";
import { useCurrentFrame } from "remotion";
import { Card, Check } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { progress } from "../../../utils/animation";
import { content } from "../content";

const ROWS = 5;
const ROW_H = 74;

/** A scan line moves down a well-structured page; each element is "understood". */
export const ReadableVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const items = content.readable.elements;
  const start = 18;
  const per = 14;
  const scanY = Math.min(ROWS, Math.max(0, (frame - start) / per)) * ROW_H;
  const done = (i: number) => frame >= start + (i + 1) * per;

  const Block: React.FC<{ i: number }> = ({ i }) => {
    const lit = done(i);
    const base: React.CSSProperties = {
      height: ROW_H - 14,
      borderRadius: 10,
      padding: "8px 12px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 6,
      background: lit ? `${color}22` : "rgba(255,255,255,0.04)",
      border: `1px solid ${lit ? color : colors.border}`,
    };
    if (i === 0)
      return (
        <div style={base}>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 24,
              color: colors.text,
            }}
          >
            H2 · What is route optimization?
          </div>
        </div>
      );
    if (i === 1)
      return (
        <div style={base}>
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: 18,
              color: colors.text,
            }}
          >
            Route optimization finds the fastest delivery sequence.
          </div>
        </div>
      );
    if (i === 2)
      return (
        <div
          style={{
            ...base,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          {["Stops", "Time", "Cost"].map((t) => (
            <div
              key={t}
              style={{
                flex: 1,
                padding: "4px 8px",
                borderRadius: 6,
                background: "rgba(255,255,255,0.08)",
                fontFamily: fonts.body,
                fontSize: 16,
                color: colors.text,
                textAlign: "center",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      );
    if (i === 3)
      return (
        <div style={base}>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 24,
              color: colors.warm,
            }}
          >
            Up to 30% fewer miles*
          </div>
        </div>
      );
    return (
      <div style={base}>
        <div
          style={{ fontFamily: fonts.body, fontSize: 18, color: colors.text }}
        >
          FAQ · Does it work for small fleets? +
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: 880, display: "flex", gap: 24 }}>
      <Card
        style={{
          position: "relative",
          width: 500,
          padding: "18px 20px",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {items.map((_, i) => (
            <Block key={i} i={i} />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 18 + scanY,
            height: 4,
            background: color,
            boxShadow: `0 0 24px ${color}`,
            opacity: frame >= start && frame <= start + ROWS * per + 6 ? 1 : 0,
          }}
        />
      </Card>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 20,
            letterSpacing: 3,
            color: colors.textMuted,
          }}
        >
          ✦ AI UNDERSTANDS
        </div>
        {items.map((it, i) => (
          <div
            key={it}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: done(i) ? 1 : 0.25,
            }}
          >
            <Check
              delay={start + (i + 1) * per}
              color={colors.success}
              size={36}
            />
            <div
              style={{
                fontFamily: fonts.body,
                fontWeight: 500,
                fontSize: 26,
                color: colors.text,
              }}
            >
              {it}
            </div>
          </div>
        ))}
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 16,
            color: colors.textMuted,
            opacity: progress(
              frame,
              start + ROWS * per,
              start + ROWS * per + 10,
            ),
          }}
        >
          * illustrative statistic
        </div>
      </div>
    </div>
  );
};
