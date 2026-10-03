import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background, Card, FadeIn, Stage } from "../../../components";
import { colors, fonts, typeScale } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";
import { COUNTRY_COLORS, CountryBadge } from "../visuals/CountryBadge";

/** Three markets side by side: different searches, language and currency. */
export const ExampleScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.example;
  const rowAt = (r: number) => 60 + r * 26;

  return (
    <AbsoluteFill>
      <Background intensity={0.4} />
      <Stage exitAt={exitAt}>
        <FadeIn distance={20}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.caption,
              letterSpacing: 6,
              color: colors.textMuted,
              marginBottom: 40,
            }}
          >
            {c.label.toUpperCase()}
          </div>
        </FadeIn>
        <div style={{ display: "flex", gap: 36 }}>
          {c.markets.map((m, i) => {
            const t = springIn({
              frame,
              fps,
              delay: 12 + i * 10,
              config: springs.snappy,
            });
            const col = COUNTRY_COLORS[m.code];
            const values = [m.search, m.language, m.currency];
            return (
              <Card
                key={m.code}
                style={{
                  width: 500,
                  padding: 34,
                  display: "flex",
                  flexDirection: "column",
                  gap: 22,
                  borderColor: col,
                  opacity: t,
                  transform: `translateY(${mix(t, 50, 0)}px)`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <CountryBadge code={m.code} size={70} />
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: 36,
                      color: colors.text,
                    }}
                  >
                    {m.name}
                  </div>
                </div>
                {c.rows.map((r, j) => {
                  const o = progress(
                    frame,
                    rowAt(j) + i * 4,
                    rowAt(j) + i * 4 + 10,
                  );
                  return (
                    <div
                      key={r}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        opacity: o,
                        transform: `translateX(${mix(o, 20, 0)}px)`,
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
                        {r.toUpperCase()}
                      </div>
                      <div
                        style={{
                          fontFamily: j === 0 ? "monospace" : fonts.body,
                          fontWeight: j === 0 ? 400 : 700,
                          fontSize: j === 0 ? 30 : 32,
                          color: j === 0 ? col : colors.text,
                        }}
                      >
                        {j === 0 ? `"${values[j]}"` : values[j]}
                      </div>
                    </div>
                  );
                })}
              </Card>
            );
          })}
        </div>
        <FadeIn delay={rowAt(3) + 10} style={{ marginTop: 44 }}>
          <div
            style={{
              padding: "14px 32px",
              borderRadius: 999,
              background: `${colors.success}22`,
              border: `2px solid ${colors.success}`,
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: 30,
              color: colors.text,
            }}
          >
            ✓ {c.footer}
          </div>
        </FadeIn>
      </Stage>
    </AbsoluteFill>
  );
};
