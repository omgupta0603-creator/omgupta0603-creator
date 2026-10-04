import React from "react";
import { interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";
import { FadeIn } from "../../../components";
import { colors, fonts, radii, typeScale } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";
import { ClipShell, Heading, Icon } from "../parts";

/** Problem 1: the usual AI words get struck out. */
export const ProblemGeneric: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.problems[0];
  return (
    <ClipShell>
      <Heading
        eyebrow={c.label}
        title={c.title}
        color={colors.danger}
        size={typeScale.h1}
      />
      <div style={{ display: "flex", gap: 30, marginTop: 70 }}>
        {c.words.map((w, i) => {
          const delay = 30 + i * 10;
          const t = springIn({ frame, fps, delay, config: springs.bouncy });
          const strike = progress(frame, delay + 26, delay + 40);
          return (
            <div
              key={w}
              style={{
                position: "relative",
                padding: "20px 40px",
                borderRadius: 999,
                border: `2px solid ${colors.border}`,
                background: colors.surface,
                fontFamily: fonts.display,
                fontWeight: 500,
                fontSize: 52,
                color: interpolateColors(
                  strike,
                  [0, 1],
                  [colors.text, colors.textMuted],
                ),
                opacity: t,
                transform: `scale(${mix(t, 0.5, 1)})`,
              }}
            >
              ‘{w}’
              <div
                style={{
                  position: "absolute",
                  left: 24,
                  right: 24,
                  top: "50%",
                  height: 6,
                  borderRadius: 3,
                  background: colors.danger,
                  transformOrigin: "left center",
                  transform: `scaleX(${strike}) rotate(-4deg)`,
                }}
              />
            </div>
          );
        })}
      </div>
      <FadeIn delay={96} style={{ marginTop: 60 }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontStyle: "italic",
            fontSize: typeScale.h3,
            color: colors.textMuted,
          }}
        >
          Client: <span style={{ color: colors.text }}>{c.quote}</span>
        </div>
      </FadeIn>
    </ClipShell>
  );
};

/** Problem 2: the same context typed into every new chat. */
export const ProblemContext: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.problems[1];
  return (
    <ClipShell>
      <Heading
        eyebrow={c.label}
        title={c.title}
        color={colors.warm}
        size={typeScale.h1}
      />
      <div
        style={{
          display: "flex",
          gap: 30,
          marginTop: 64,
          alignItems: "center",
        }}
      >
        {c.chats.map((name, i) => {
          const delay = 26 + i * 18;
          const t = springIn({ frame, fps, delay, config: springs.snappy });
          return (
            <React.Fragment key={i}>
              {i > 0 ? (
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 52,
                    color: colors.warm,
                    opacity: t,
                  }}
                >
                  ↻
                </div>
              ) : null}
              <div
                style={{
                  width: 440,
                  borderRadius: radii.md,
                  background: "rgba(15, 22, 49, 0.92)",
                  border: `1px solid ${colors.border}`,
                  padding: 26,
                  opacity: t,
                  transform: `translateY(${mix(t, 60, 0)}px)`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontWeight: 700,
                    fontSize: 24,
                    color: colors.textMuted,
                    marginBottom: 4,
                  }}
                >
                  {name} #{i + 1}
                </div>
                {c.context.map((line, j) => {
                  const lt = springIn({
                    frame,
                    fps,
                    delay: delay + 8 + j * 5,
                    config: springs.snappy,
                  });
                  return (
                    <div
                      key={line}
                      style={{
                        alignSelf: "flex-end",
                        padding: "10px 18px",
                        borderRadius: 16,
                        background: `${colors.warm}26`,
                        border: `1px solid ${colors.warm}`,
                        fontFamily: fonts.body,
                        fontSize: 26,
                        color: colors.text,
                        opacity: lt,
                        transform: `scale(${mix(lt, 0.7, 1)})`,
                      }}
                    >
                      {line}…
                    </div>
                  );
                })}
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <FadeIn delay={100} style={{ marginTop: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Icon
            name="clock"
            size={54}
            color={colors.danger}
            strokeWidth={2.4}
          />
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: typeScale.h3,
              color: colors.danger,
            }}
          >
            {c.footer}
          </div>
        </div>
      </FadeIn>
    </ClipShell>
  );
};

/** Problem 3: big files go in, the analysis stalls halfway. */
export const ProblemFiles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.problems[2];
  const fill = mix(progress(frame, 70, 120), 0, 0.42);
  const stalled = progress(frame, 120, 132);
  const barColor = interpolateColors(
    stalled,
    [0, 1],
    [colors.secondary, colors.danger],
  );
  return (
    <ClipShell>
      <Heading
        eyebrow={c.label}
        title={c.title}
        color={colors.secondary}
        size={typeScale.h1}
      />
      <div
        style={{
          display: "flex",
          gap: 70,
          marginTop: 64,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {c.files.map((f, i) => {
            const t = springIn({
              frame,
              fps,
              delay: 24 + i * 7,
              config: springs.snappy,
            });
            return (
              <div
                key={f.name}
                style={{
                  width: 620,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "16px 24px",
                  borderRadius: 18,
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  opacity: t,
                  transform: `translateX(${mix(t, -60, 0)}px)`,
                }}
              >
                <Icon
                  name={i === 0 ? "table" : "doc"}
                  size={40}
                  color={i === 0 ? colors.success : colors.secondary}
                />
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontWeight: 500,
                    fontSize: 28,
                    color: colors.text,
                    flex: 1,
                  }}
                >
                  {f.name}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 22,
                    color: colors.textMuted,
                  }}
                >
                  {f.meta}
                </div>
              </div>
            );
          })}
        </div>
        <FadeIn delay={60} from="right">
          <div
            style={{
              width: 560,
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: fonts.body,
                fontSize: 28,
                color: colors.textMuted,
              }}
            >
              <span>Analysing…</span>
              <span
                style={{
                  fontVariantNumeric: "tabular-nums",
                  color: barColor,
                  fontWeight: 700,
                }}
              >
                {Math.round(fill * 100)}%
              </span>
            </div>
            <div
              style={{
                height: 30,
                borderRadius: 15,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${fill * 100}%`,
                  height: "100%",
                  borderRadius: 15,
                  background: barColor,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                opacity: stalled,
                transform: `translateY(${mix(stalled, 16, 0)}px)`,
              }}
            >
              <Icon
                name="alert"
                size={44}
                color={colors.danger}
                strokeWidth={2.4}
              />
              <div
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: 44,
                  color: colors.danger,
                }}
              >
                {c.status}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </ClipShell>
  );
};
