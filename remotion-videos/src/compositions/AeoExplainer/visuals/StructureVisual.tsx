import React from "react";
import { useCurrentFrame } from "remotion";
import { Pill } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress } from "../../../utils/animation";
import { content } from "../content";

/** A well-structured page builds up block by block, each with a label. */
export const StructureVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const labels = content.structure.labels;
  const at = (i: number) => 14 + i * 14;
  const show = (i: number) => progress(frame, at(i), at(i) + 10);
  const block = (i: number): React.CSSProperties => ({
    opacity: show(i),
    transform: `translateY(${mix(show(i), 16, 0)}px)`,
  });

  return (
    <div style={{ width: 860, display: "flex", gap: 20 }}>
      <div
        style={{
          flex: 1,
          borderRadius: 24,
          background: colors.backgroundAlt,
          border: `1px solid ${colors.border}`,
          padding: "24px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxShadow: "0 40px 100px rgba(0,0,0,0.45)",
        }}
      >
        <div
          style={{
            ...block(0),
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 30,
            color: colors.text,
          }}
        >
          H2 · How to speed up your website
        </div>
        <div
          style={{
            ...block(1),
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {[1, 0.8].map((w, i) => (
            <div
              key={i}
              style={{
                height: 10,
                width: `${w * 100}%`,
                borderRadius: 5,
                background: "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
        <div
          style={{
            ...block(2),
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {["Compress images", "Enable caching", "Reduce scripts"].map((b) => (
            <div
              key={b}
              style={{
                fontFamily: fonts.body,
                fontSize: 22,
                color: colors.text,
              }}
            >
              <span style={{ color }}>•</span> {b}
            </div>
          ))}
        </div>
        <div
          style={{
            ...block(3),
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            borderRadius: 10,
            overflow: "hidden",
            border: `1px solid ${colors.border}`,
          }}
        >
          {["Fix", "Impact", "Images", "High", "Caching", "Medium"].map(
            (t, i) => (
              <div
                key={i}
                style={{
                  padding: "8px 12px",
                  fontFamily: fonts.body,
                  fontSize: 19,
                  fontWeight: i < 2 ? 700 : 400,
                  color: colors.text,
                  background: i < 2 ? `${color}33` : "transparent",
                  borderTop: i >= 2 ? `1px solid ${colors.border}` : undefined,
                }}
              >
                {t}
              </div>
            ),
          )}
        </div>
        <div
          style={{
            ...block(4),
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {["Does page speed affect SEO?", "What is a good load time?"].map(
            (f, i) => (
              <div
                key={f}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.06)",
                  fontFamily: fonts.body,
                  fontSize: 20,
                  color: colors.text,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {f}{" "}
                <span style={{ color: colors.textMuted }}>
                  {i === 0 ? "−" : "+"}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
      <div
        style={{
          width: 225,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        {labels.map((l, i) => (
          <Pill
            key={l}
            color={
              [
                colors.primary,
                colors.secondary,
                colors.warm,
                colors.accent,
                colors.success,
              ][i]
            }
            delay={at(i) + 4}
            fontSize={19}
          >
            ← {l}
          </Pill>
        ))}
      </div>
    </div>
  );
};
