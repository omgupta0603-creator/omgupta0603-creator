import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Background,
  FadeIn,
  SearchBar,
  SerpResult,
  Stage,
} from "../../../components";
import { colors, fonts, typeScale } from "../../../theme/theme";
import { mix, springIn, springs } from "../../../utils/animation";
import { content } from "../content";
import { ProductThumb } from "../visuals/ProductThumb";

/** Two product searches are typed in turn; the store's category page appears for each. */
export const ExampleScene: React.FC<{
  exitAt?: number;
  durationInFrames: number;
}> = ({ exitAt, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.example;
  const per = Math.floor((durationInFrames - 30) / c.queries.length);
  const qi = Math.min(
    c.queries.length - 1,
    Math.max(0, Math.floor((frame - 12) / per)),
  );
  const local = frame - 12 - qi * per;
  const q = c.queries[qi];
  const isLast = qi === c.queries.length - 1;
  const typeEnd = q.q.length * 0.9;
  const chars = Math.floor(
    interpolate(
      local,
      [0, typeEnd, per - 10, per],
      [0, q.q.length, q.q.length, isLast ? q.q.length : 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    ),
  );
  const resIn = springIn({
    frame: local,
    fps,
    delay: typeEnd + 6,
    config: springs.snappy,
  });
  const resOut = isLast
    ? 1
    : interpolate(local, [per - 14, per - 4], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

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
            text={q.q.slice(0, Math.max(0, chars))}
            cursor
            width={1100}
          />
        </FadeIn>
        <div
          style={{
            marginTop: 34,
            opacity: resIn * resOut,
            transform: `translateY(${mix(resIn, 30, 0)}px)`,
          }}
        >
          <SerpResult
            url={q.url}
            title={q.title}
            width={1100}
            description={
              <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
                {q.products.map((p, i) => (
                  <ProductThumb
                    key={p}
                    name={p}
                    index={i + qi}
                    price="from $29"
                    width={180}
                    light
                  />
                ))}
              </div>
            }
            descriptionStyle={{ minHeight: 0 }}
          />
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
