import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background, FadeIn, SearchBar, Stage } from "../../../components";
import { colors, fonts, typeScale } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

/** The question is typed; a direct answer appears above the usual list of links. */
export const ExampleScene: React.FC<{
  exitAt?: number;
  durationInFrames: number;
}> = ({ exitAt, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.example;
  const typeEnd = 12 + c.query.length * 1.1;
  const chars = Math.floor(
    interpolate(frame, [12, typeEnd], [0, c.query.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const boxIn = springIn({
    frame,
    fps,
    delay: typeEnd + 8,
    config: springs.snappy,
  });
  const answerChars = Math.floor(
    interpolate(
      frame,
      [typeEnd + 18, typeEnd + 18 + c.answer.length / 3],
      [0, c.answer.length],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    ),
  );
  const linksIn = progress(frame, typeEnd + 30, typeEnd + 44);
  const nextAt = Math.max(typeEnd + 80, durationInFrames - 96);
  const next = springIn({ frame, fps, delay: nextAt, config: springs.bouncy });

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
              marginBottom: 22,
              textAlign: "center",
            }}
          >
            {c.label.toUpperCase()}
          </div>
        </FadeIn>
        <FadeIn delay={4}>
          <SearchBar
            text={c.query.slice(0, chars)}
            cursor={frame < typeEnd + 10}
            width={1100}
          />
        </FadeIn>
        <div
          style={{
            width: 1100,
            marginTop: 26,
            padding: "24px 30px",
            borderRadius: 24,
            background: "#FFFFFF",
            boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
            opacity: boxIn,
            transform: `translateY(${mix(boxIn, 30, 0)}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: 20,
              color: colors.primary,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 14,
                height: 14,
                borderRadius: 7,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              }}
            />
            {c.answerLabel}
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 30,
              lineHeight: 1.45,
              color: "#202124",
              minHeight: 88,
            }}
          >
            {c.answer.slice(0, answerChars)}
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              opacity: progress(
                frame,
                typeEnd + 18 + c.answer.length / 3,
                typeEnd + 30 + c.answer.length / 3,
              ),
            }}
          >
            {c.sources.map((s) => (
              <div
                key={s}
                style={{
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: "#F1F3F4",
                  fontFamily: fonts.body,
                  fontSize: 17,
                  color: "#4D5156",
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            width: 1100,
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            opacity: linksIn * 0.45,
          }}
        >
          {c.links.map((l) => (
            <div
              key={l}
              style={{ fontFamily: fonts.body, fontSize: 22, color: "#8AB4F8" }}
            >
              {l}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 28,
            padding: "12px 28px",
            borderRadius: 999,
            background: `${colors.warm}26`,
            border: `2px solid ${colors.warm}`,
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 32,
            color: colors.text,
            transform: `scale(${next})`,
          }}
        >
          {c.next}
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
