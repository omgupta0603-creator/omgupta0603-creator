import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText, FadeIn, Highlight, Pill } from "../../../components";
import {
  colors,
  fonts,
  gradients,
  radii,
  typeScale,
} from "../../../theme/theme";
import { mix, springIn, springs } from "../../../utils/animation";
import { content } from "../content";
import {
  ChatComposer,
  ClipShell,
  Heading,
  IconTile,
  type IconName,
} from "../parts";

/** Claude's 4 strengths, revealed one by one as they are named. */
export const Strengths: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.strengths;
  const icons: IconName[] = ["pen", "doc", "table", "folder"];
  const palette = [
    colors.warm,
    colors.secondary,
    colors.success,
    colors.accent,
  ];
  return (
    <ClipShell>
      <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
        <AnimatedText
          text={c.title}
          fontSize={typeScale.h1 - 8}
          gradient={gradients.hot}
          staggerFrames={3}
        />
        <FadeIn delay={14}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.h3 - 8,
              color: colors.textMuted,
            }}
          >
            {c.subtitle}
          </div>
        </FadeIn>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 760px)",
          gap: 34,
          marginTop: 64,
        }}
      >
        {c.items.map((s, i) => {
          const delay = 30 + i * 60;
          const t = springIn({ frame, fps, delay, config: springs.snappy });
          return (
            <div
              key={s.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                padding: "34px 38px",
                borderRadius: radii.md,
                background: colors.surface,
                border: `2px solid ${palette[i]}66`,
                boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
                opacity: t,
                transform: `scale(${mix(t, 0.85, 1)}) translateY(${mix(t, 40, 0)}px)`,
              }}
            >
              <IconTile name={icons[i]} color={palette[i]} size={104} />
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 52,
                    color: colors.text,
                  }}
                >
                  {s.name}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 30,
                    color: colors.textMuted,
                  }}
                >
                  {s.line}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ClipShell>
  );
};

const UC_COLORS = [
  colors.secondary,
  colors.accent,
  colors.warm,
  colors.success,
  colors.primary,
];

/** "Use Case N" title card with the prompt typing into a chat box. */
export const UseCase: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const c = content.useCases[index];
  const color = UC_COLORS[index];
  const hasProject = "project" in c;
  const promptStart = hasProject ? 90 : 46;
  return (
    <ClipShell>
      <Heading
        eyebrow={`Use Case ${c.n}`}
        title={c.title}
        color={color}
        size={typeScale.h1}
      />
      {hasProject ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: 50,
          }}
        >
          <Pill color={color} delay={30} fontSize={30}>
            {c.project}
          </Pill>
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: 40,
              color: colors.textMuted,
              opacity: frame > 36 ? 1 : 0,
            }}
          >
            +
          </div>
          {c.knowledge.map((k, i) => (
            <Pill
              key={k}
              color={colors.border}
              delay={40 + i * 7}
              fontSize={26}
            >
              {k}
            </Pill>
          ))}
        </div>
      ) : null}
      <div style={{ marginTop: hasProject ? 40 : 64 }}>
        <ChatComposer
          prompt={c.prompt}
          start={promptStart}
          color={color}
          attachment={c.attachment || undefined}
          label={hasProject ? "Project chat" : "Prompt"}
        />
      </div>
    </ClipShell>
  );
};

export const makeUseCase = (index: number): React.FC => {
  const Clip: React.FC = () => <UseCase index={index} />;
  Clip.displayName = `UseCase${index + 1}`;
  return Clip;
};

/** Pro tip after use case 1. */
export const ProTip: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.proTip;
  const pop = springIn({ frame, fps, delay: 0, config: springs.bouncy });
  return (
    <ClipShell>
      <div style={{ transform: `scale(${pop})`, marginBottom: 36 }}>
        <IconTile name="alert" color={colors.warm} size={130} />
      </div>
      <Heading
        eyebrow={c.label}
        title={c.line}
        color={colors.warm}
        size={typeScale.h1 - 12}
        delay={4}
      />
      <FadeIn delay={44} style={{ marginTop: 40 }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: typeScale.h3,
            color: colors.text,
          }}
        >
          <Highlight start={60}>{c.subHighlight}</Highlight>
          {c.subRest}
        </div>
      </FadeIn>
    </ClipShell>
  );
};
