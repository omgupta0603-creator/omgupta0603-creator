import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Background,
  Card,
  FadeIn,
  Pill,
  SearchBar,
  Stage,
} from "../../../components";
import { colors, fonts, typeScale } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";
import { Stars } from "../visuals/Stars";

const PER_QUERY = 52; // frames each query stays on screen

/** Three local searches are typed in turn; a map and local results respond. */
export const ExampleScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.example;
  const qStart = 14;
  const qi = Math.min(
    c.queries.length - 1,
    Math.max(0, Math.floor((frame - qStart) / PER_QUERY)),
  );
  const local = frame - qStart - qi * PER_QUERY;
  const q = c.queries[qi];
  const isLast = qi === c.queries.length - 1;
  // Type in, hold, then delete (except the last query, which stays).
  const chars = Math.floor(
    interpolate(
      local,
      [0, q.length * 0.9, PER_QUERY - 10, PER_QUERY],
      [0, q.length, q.length, isLast ? q.length : 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    ),
  );
  const resultsAt = qStart + 26;
  const factorsAt = qStart + PER_QUERY * c.queries.length + 6;

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
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            {c.label.toUpperCase()}
          </div>
        </FadeIn>
        <FadeIn delay={4}>
          <SearchBar
            text={q.slice(0, Math.max(0, chars))}
            cursor
            width={1100}
          />
        </FadeIn>
        <div style={{ display: "flex", gap: 40, marginTop: 40 }}>
          {/* Map */}
          <FadeIn delay={resultsAt - 6} from="left" distance={60}>
            <div
              style={{
                position: "relative",
                width: 560,
                height: 430,
                borderRadius: 28,
                overflow: "hidden",
                background: "#0E1430",
                border: `1px solid ${colors.border}`,
              }}
            >
              <svg
                width={560}
                height={430}
                style={{ position: "absolute", inset: 0 }}
              >
                {[70, 190, 320].map((y, i) => (
                  <rect
                    key={`h${i}`}
                    x={0}
                    y={y}
                    width={560}
                    height={i % 2 ? 10 : 20}
                    fill="rgba(255,255,255,0.07)"
                  />
                ))}
                {[110, 280, 450].map((x, i) => (
                  <rect
                    key={`v${i}`}
                    x={x}
                    y={0}
                    width={i % 2 ? 20 : 10}
                    height={430}
                    fill="rgba(255,255,255,0.07)"
                  />
                ))}
                {/* User location */}
                <circle
                  cx={280}
                  cy={250}
                  r={18 + ((frame % 40) / 40) * 40}
                  fill="none"
                  stroke={colors.secondary}
                  strokeWidth={3}
                  opacity={1 - (frame % 40) / 40}
                />
                <circle
                  cx={280}
                  cy={250}
                  r={14}
                  fill={colors.secondary}
                  stroke="white"
                  strokeWidth={4}
                />
              </svg>
              {[
                { x: 190, y: 160 },
                { x: 400, y: 140 },
                { x: 360, y: 350 },
              ].map((p, i) => {
                const d = springIn({
                  frame,
                  fps,
                  delay: resultsAt + i * 8,
                  config: springs.bouncy,
                });
                return (
                  <svg
                    key={i}
                    width={40}
                    height={52}
                    viewBox="0 0 40 52"
                    style={{
                      position: "absolute",
                      left: p.x - 20,
                      top: p.y - 52,
                      opacity: Math.min(1, d * 2),
                      transform: `translateY(${mix(d, -120, 0)}px)`,
                    }}
                  >
                    <path
                      d="M20 52 C20 52 0 30 0 20 A20 20 0 0 1 40 20 C40 30 20 52 20 52 Z"
                      fill={i === 0 ? colors.accent : colors.warm}
                    />
                    <text
                      x={20}
                      y={26}
                      textAnchor="middle"
                      fontFamily={fonts.body}
                      fontWeight={700}
                      fontSize={18}
                      fill={colors.background}
                    >
                      {i + 1}
                    </text>
                  </svg>
                );
              })}
              <div
                style={{
                  position: "absolute",
                  left: 300,
                  top: 206,
                  fontFamily: fonts.body,
                  fontSize: 18,
                  color: colors.secondary,
                  opacity: progress(frame, resultsAt, resultsAt + 10),
                }}
              >
                You are here
              </div>
            </div>
          </FadeIn>
          {/* Local results */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {c.results.map((r, i) => {
              const t = springIn({
                frame,
                fps,
                delay: resultsAt + 6 + i * 8,
                config: springs.snappy,
              });
              return (
                <Card
                  key={r.name}
                  style={{
                    width: 500,
                    padding: "20px 26px",
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    opacity: t,
                    transform: `translateX(${mix(t, 50, 0)}px)`,
                    borderColor: i === 0 ? colors.accent : colors.border,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      background: i === 0 ? colors.accent : colors.warm,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: 24,
                      color: colors.background,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <div
                      style={{
                        fontFamily: fonts.body,
                        fontWeight: 700,
                        fontSize: 26,
                        color: colors.text,
                      }}
                    >
                      {r.name}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontFamily: fonts.body,
                        fontSize: 20,
                        color: colors.textMuted,
                      }}
                    >
                      {r.rating} <Stars filled={5} size={18} /> · {r.distance}
                    </div>
                  </div>
                </Card>
              );
            })}
            <div
              style={{
                display: "flex",
                gap: 14,
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 22,
                  color: colors.textMuted,
                  opacity: progress(frame, factorsAt, factorsAt + 10),
                }}
              >
                Relevant to
              </div>
              {c.factors.map((f, i) => (
                <Pill
                  key={f}
                  color={[colors.secondary, colors.primary][i]}
                  delay={factorsAt + 4 + i * 8}
                  fontSize={24}
                >
                  {f}
                </Pill>
              ))}
            </div>
          </div>
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
