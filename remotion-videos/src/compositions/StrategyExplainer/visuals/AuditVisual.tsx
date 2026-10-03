import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Card } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const COLS = [colors.secondary, colors.primary, colors.accent];
const R = 64;
const C = 2 * Math.PI * R;

/** An audit report: a score ring and an issue count per area. */
export const AuditVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const areas = content.audit.areas;
  const scan = progress(frame, 10, 40);

  return (
    <Card
      style={{
        width: 860,
        padding: "30px 34px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 22,
            letterSpacing: 4,
            color: colors.textMuted,
          }}
        >
          SEO AUDIT REPORT
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 20,
            color: scan >= 1 ? colors.success : colors.textMuted,
          }}
        >
          {scan >= 1
            ? "✓ Scan complete"
            : `Scanning… ${Math.round(scan * 100)}%`}
        </div>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: colors.border }}>
        <div
          style={{
            width: `${scan * 100}%`,
            height: "100%",
            borderRadius: 4,
            background: colors.secondary,
          }}
        />
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        {areas.map((a, i) => {
          const d = 40 + i * 12;
          const t = progress(frame, d, d + 24);
          const pop = springIn({
            frame,
            fps,
            delay: d + 20,
            config: springs.bouncy,
          });
          return (
            <div
              key={a.name}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ position: "relative", width: 150, height: 150 }}>
                <svg width={150} height={150}>
                  <circle
                    cx={75}
                    cy={75}
                    r={R}
                    fill="none"
                    stroke={colors.border}
                    strokeWidth={12}
                  />
                  <circle
                    cx={75}
                    cy={75}
                    r={R}
                    fill="none"
                    stroke={COLS[i]}
                    strokeWidth={12}
                    strokeLinecap="round"
                    strokeDasharray={C}
                    strokeDashoffset={C * (1 - (a.score / 100) * t)}
                    transform="rotate(-90 75 75)"
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 40,
                    color: colors.text,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {Math.round(a.score * t)}
                </div>
              </div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: 30,
                  color: colors.text,
                }}
              >
                {a.name}
              </div>
              <div
                style={{
                  padding: "6px 16px",
                  borderRadius: 999,
                  background: `${colors.danger}22`,
                  border: `2px solid ${colors.danger}`,
                  fontFamily: fonts.body,
                  fontWeight: 700,
                  fontSize: 20,
                  color: colors.text,
                  transform: `scale(${pop})`,
                  opacity: mix(pop, 0, 1),
                }}
              >
                {a.issues} issues
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
