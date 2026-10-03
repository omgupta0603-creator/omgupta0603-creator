import React from "react";
import { useCurrentFrame } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { progress } from "../../../utils/animation";
import { Pill } from "../../../components";

const W = 820;
const H = 560;

/** Browser wireframe; each on-page element lights up with its label in turn. */
export const OnPageVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  // Order of the script: keywords, title tags, headings, content, URLs, images, internal links
  const at = (i: number) => 24 + i * 12;
  const glow = (i: number) => progress(frame, at(i), at(i) + 10);
  const box = (i: number): React.CSSProperties => ({
    borderRadius: 10,
    background: `rgba(255,255,255,${0.08 + glow(i) * 0.06})`,
    outline: `3px solid ${color}`,
    outlineOffset: 4,
    outlineColor: `rgba(108,92,255,${glow(i)})`,
  });

  return (
    <div
      style={{
        width: W,
        height: H,
        position: "relative",
        borderRadius: 28,
        background: colors.backgroundAlt,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 40px 100px rgba(0,0,0,0.45)",
        overflow: "visible",
      }}
    >
      {/* Browser chrome: tab (title tag) + address bar (URL) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "20px 24px 0",
        }}
      >
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
          <div
            key={c}
            style={{ width: 14, height: 14, borderRadius: 7, background: c }}
          />
        ))}
        <div
          style={{
            ...box(1),
            marginLeft: 16,
            padding: "8px 18px",
            fontFamily: fonts.body,
            fontSize: 20,
            color: colors.text,
          }}
        >
          SEO Services in Delhi | Brand
        </div>
      </div>
      <div
        style={{
          ...box(4),
          margin: "14px 24px",
          padding: "10px 18px",
          fontFamily: "monospace",
          fontSize: 20,
          color: colors.textMuted,
        }}
      >
        yourbusiness.com/seo-services-delhi
      </div>

      <div
        style={{
          padding: "16px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {/* H1 */}
        <div
          style={{
            ...box(2),
            padding: "12px 18px",
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 38,
            color: colors.text,
            width: 560,
          }}
        >
          Expert SEO Services
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {/* Content with keyword */}
          <div
            style={{
              ...box(3),
              flex: 1,
              padding: 18,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {[1, 0.92, 0.97, 0.7].map((w, i) => (
              <div
                key={i}
                style={{
                  height: 14,
                  width: `${w * 100}%`,
                  borderRadius: 7,
                  background: "rgba(255,255,255,0.18)",
                }}
              />
            ))}
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                fontFamily: fonts.body,
                fontSize: 20,
                color: colors.textMuted,
              }}
            >
              Grow with
              <span
                style={{
                  padding: "2px 10px",
                  borderRadius: 6,
                  color: colors.text,
                  background: `rgba(255,181,71,${0.15 + glow(0) * 0.6})`,
                }}
              >
                SEO services
              </span>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              {["Local SEO →", "Pricing →"].map((l) => (
                <div
                  key={l}
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 18,
                    color: colors.secondary,
                    textDecoration: "underline",
                    opacity: 0.5 + glow(6) * 0.5,
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
          </div>
          {/* Image */}
          <div
            style={{
              ...box(5),
              width: 220,
              height: 210,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, ${color}55, ${colors.secondary}33)`,
            }}
          >
            <svg width={90} height={70} viewBox="0 0 90 70">
              <circle cx={24} cy={20} r={10} fill="rgba(255,255,255,0.7)" />
              <path
                d="M0 70 L30 36 L50 54 L66 40 L90 70 Z"
                fill="rgba(255,255,255,0.7)"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Labels, in script order */}
      <Pill
        color={colors.warm}
        delay={at(0)}
        style={{ position: "absolute", left: 40, bottom: 60 }}
      >
        Keywords
      </Pill>
      <Pill
        color={color}
        delay={at(1)}
        style={{ position: "absolute", right: -30, top: 4 }}
      >
        Title tag
      </Pill>
      <Pill
        color={color}
        delay={at(2)}
        style={{ position: "absolute", left: 630, top: 156 }}
      >
        Heading (H1)
      </Pill>
      <Pill
        color={color}
        delay={at(3)}
        style={{ position: "absolute", left: -40, top: 300 }}
      >
        Content
      </Pill>
      <Pill
        color={color}
        delay={at(4)}
        style={{ position: "absolute", right: -30, top: 76 }}
      >
        URL
      </Pill>
      <Pill
        color={color}
        delay={at(5)}
        style={{ position: "absolute", right: -40, bottom: 50 }}
      >
        Image alt text
      </Pill>
      <Pill
        color={colors.secondary}
        delay={at(6)}
        style={{ position: "absolute", left: 220, bottom: -26 }}
      >
        Internal links
      </Pill>
    </div>
  );
};
