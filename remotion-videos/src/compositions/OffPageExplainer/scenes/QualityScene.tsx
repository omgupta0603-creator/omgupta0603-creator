import React from "react";
import {
  AbsoluteFill,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  AnimatedText,
  Background,
  Card,
  FadeIn,
  Pill,
  Stage,
} from "../../../components";
import { colors, fonts, typeScale } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const DOTS = 70;

/** Lots of weak links (crossed out) vs a few relevant ones (ticked), then the 3 factors. */
export const QualityScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.quality;
  const manyIn = progress(frame, 16, 46);
  const cross = springIn({ frame, fps, delay: 60, config: springs.bouncy });
  const fewAt = 74;
  const tick = springIn({
    frame,
    fps,
    delay: fewAt + 30,
    config: springs.bouncy,
  });

  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
        <AnimatedText
          text={c.heading}
          fontSize={typeScale.h1}
          staggerFrames={3}
        />
        <div style={{ display: "flex", gap: 56, marginTop: 60 }}>
          {/* Many low-value links */}
          <Card
            style={{
              width: 640,
              height: 400,
              position: "relative",
              padding: 36,
            }}
          >
            <div
              style={{
                fontFamily: fonts.body,
                fontWeight: 500,
                fontSize: 30,
                color: colors.textMuted,
              }}
            >
              {c.many.title}
            </div>
            <div style={{ position: "relative", height: 250, marginTop: 20 }}>
              {new Array(DOTS).fill(0).map((_, i) => {
                const show = manyIn * DOTS > i;
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: random(`x${i}`) * 540,
                      top: random(`y${i}`) * 220,
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.3)",
                      opacity: show ? 1 : 0,
                    }}
                  />
                );
              })}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${cross})`,
                }}
              >
                <div
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 75,
                    background: colors.danger,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 90,
                    color: "white",
                    fontFamily: fonts.display,
                    fontWeight: 700,
                  }}
                >
                  ✕
                </div>
              </div>
            </div>
          </Card>
          {/* Few relevant links */}
          <FadeIn delay={fewAt} from="right" distance={60}>
            <Card
              style={{
                width: 640,
                height: 400,
                position: "relative",
                padding: 36,
                borderColor: colors.success,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 500,
                  fontSize: 30,
                  color: colors.text,
                }}
              >
                {c.few.title}
              </div>
              <div
                style={{
                  position: "relative",
                  height: 250,
                  marginTop: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 46,
                }}
              >
                {[0, 1, 2].map((i) => {
                  const t = springIn({
                    frame,
                    fps,
                    delay: fewAt + 8 + i * 6,
                    config: springs.bouncy,
                  });
                  return (
                    <div
                      key={i}
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: 45,
                        background: colors.success,
                        transform: `scale(${t})`,
                        boxShadow: `0 0 40px ${colors.success}88`,
                      }}
                    />
                  );
                })}
                <div
                  style={{
                    position: "absolute",
                    right: 10,
                    bottom: 0,
                    width: 90,
                    height: 90,
                    borderRadius: 45,
                    background: colors.success,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 54,
                    color: colors.background,
                    fontWeight: 700,
                    transform: `scale(${tick})`,
                  }}
                >
                  ✓
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 50,
            alignItems: "center",
          }}
        >
          {c.factors.map((f, i) => (
            <Pill
              key={f}
              color={[colors.primary, colors.secondary, colors.warm][i]}
              delay={fewAt + 44 + i * 8}
              fontSize={34}
            >
              {f}
            </Pill>
          ))}
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 30,
              color: colors.textMuted,
              marginLeft: 10,
              opacity: progress(frame, fewAt + 70, fewAt + 82),
              transform: `translateX(${mix(progress(frame, fewAt + 70, fewAt + 82), 20, 0)}px)`,
            }}
          >
            matter more than the number of links
          </div>
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
