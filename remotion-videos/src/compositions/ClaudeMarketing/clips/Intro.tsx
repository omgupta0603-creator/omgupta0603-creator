import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText, FadeIn, Highlight } from "../../../components";
import {
  colors,
  fonts,
  gradients,
  radii,
  typeScale,
} from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { useContent } from "../content";
import { ClipShell, Heading } from "../parts";

const PostCard: React.FC<{
  author: string;
  rest: string;
  delay: number;
  tilt: number;
}> = ({ author, rest, delay, tilt }) => {
  const frame = useCurrentFrame();
  const content = useContent();
  const { fps } = useVideoConfig();
  const t = springIn({ frame, fps, delay, config: springs.snappy });
  return (
    <div
      style={{
        width: 500,
        borderRadius: radii.md,
        background: "#FFFFFF",
        padding: "28px 30px",
        boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        opacity: t,
        transform: `translateY(${mix(t, 120, 0)}px) rotate(${mix(t, tilt * 4, tilt)}deg)`,
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#D7DCEB",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: 22,
              color: "#1D2433",
            }}
          >
            {author}
          </div>
          <div
            style={{
              width: 160,
              height: 10,
              borderRadius: 5,
              background: "#E6E9F2",
            }}
          />
        </div>
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 26,
          lineHeight: 1.45,
          color: "#3A4256",
        }}
      >
        <span style={{ fontWeight: 700 }}>
          <Highlight start={delay + 30} color="#111827" thickness={36}>
            {content.hook.opener}
          </Highlight>
        </span>{" "}
        {rest}
      </div>
    </div>
  );
};

/** Hook: three posts with the same opener, then the question. */
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const c = useContent().hook;
  const shrink = progress(frame, 70, 95);
  return (
    <ClipShell>
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "flex-start",
          transform: `scale(${mix(shrink, 1, 0.86)}) translateY(${mix(shrink, 80, -10)}px)`,
          opacity: mix(shrink, 1, 0.55),
        }}
      >
        {c.authors.map((a, i) => (
          <PostCard
            key={a}
            author={a}
            rest={c.rest[i]}
            delay={4 + i * 8}
            tilt={[-2.5, 0, 2.5][i]}
          />
        ))}
      </div>
      <div style={{ marginTop: 56 }}>
        <AnimatedText
          text={c.question}
          delay={84}
          fontSize={typeScale.h1}
          staggerFrames={4}
          gradient={gradients.hot}
        />
      </div>
    </ClipShell>
  );
};

/** 3-second channel sting. */
export const Sting: React.FC = () => {
  const frame = useCurrentFrame();
  const content = useContent();
  const ring = progress(frame, 0, 30);
  return (
    <ClipShell>
      {/* A rounded frame that draws itself around the channel name. */}
      <svg
        width={1500}
        height={360}
        viewBox="0 0 1500 360"
        style={{ position: "absolute" }}
      >
        <rect
          x={4}
          y={4}
          width={1492}
          height={352}
          rx={60}
          fill="none"
          stroke="url(#stingGrad)"
          strokeWidth={5}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - ring}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="stingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={colors.warm} />
            <stop offset="100%" stopColor={colors.accent} />
          </linearGradient>
        </defs>
      </svg>
      <AnimatedText
        text={content.channel}
        splitBy="char"
        delay={8}
        staggerFrames={1}
        fontSize={120}
        gradient={gradients.hot}
      />
      <FadeIn delay={30} style={{ marginTop: 26 }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: typeScale.body,
            color: colors.textMuted,
            letterSpacing: 2,
          }}
        >
          {content.sting.tagline}
        </div>
      </FadeIn>
    </ClipShell>
  );
};

/** Aaj ka agenda: five numbered items. */
export const Agenda: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = useContent().agenda;
  const palette = [
    colors.accent,
    colors.warm,
    colors.secondary,
    colors.success,
    colors.primary,
  ];
  return (
    <ClipShell>
      <Heading title={c.title} size={typeScale.h1} gradient={gradients.hot} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 22,
          marginTop: 56,
          width: 1100,
        }}
      >
        {c.items.map((item, i) => {
          const delay = 24 + i * 22;
          const t = springIn({ frame, fps, delay, config: springs.snappy });
          return (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                padding: "18px 28px",
                borderRadius: radii.md,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                opacity: t,
                transform: `translateX(${mix(t, -80, 0)}px)`,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  background: palette[i],
                  color: colors.background,
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 500,
                  fontSize: 42,
                  color: colors.text,
                }}
              >
                {item}
              </div>
            </div>
          );
        })}
      </div>
    </ClipShell>
  );
};
