import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText, Check, DrawLine, FadeIn } from "../../../components";
import {
  colors,
  fonts,
  gradients,
  radii,
  typeScale,
} from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";
import {
  Caret,
  ClipShell,
  Heading,
  Icon,
  IconTile,
  typedCount,
  type IconName,
} from "../parts";

/** 3 cheezein dhyan rakho: honest limitations. */
export const Limitations: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.limitations;
  const icons: IconName[] = ["clock", "alert", "tools"];
  const palette = [colors.warm, colors.danger, colors.secondary];
  return (
    <ClipShell>
      <Heading title={c.title} size={typeScale.h1} gradient={gradients.hot} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 26,
          marginTop: 60,
          width: 1260,
        }}
      >
        {c.items.map((item, i) => {
          const t = springIn({
            frame,
            fps,
            delay: 30 + i * 50,
            config: springs.snappy,
          });
          return (
            <div
              key={item.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 32,
                padding: "26px 34px",
                borderRadius: radii.md,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                opacity: t,
                transform: `translateX(${mix(t, 80, 0)}px)`,
              }}
            >
              <IconTile name={icons[i]} color={palette[i]} size={88} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 48,
                    color: colors.text,
                  }}
                >
                  {item.name}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 30,
                    color: colors.textMuted,
                  }}
                >
                  {item.line}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ClipShell>
  );
};

/** AI = Draft. Aap = Decision. */
export const DraftDecision: React.FC = () => {
  const c = content.draftDecision;
  return (
    <ClipShell>
      <AnimatedText
        text={c.a}
        delay={4}
        fontSize={typeScale.hero}
        staggerFrames={5}
      />
      <AnimatedText
        text={c.b}
        delay={26}
        fontSize={typeScale.hero}
        staggerFrames={5}
        gradient={gradients.hot}
        style={{ marginTop: 10 }}
      />
      <DrawLine
        start={50}
        duration={22}
        width={520}
        height={12}
        style={{ marginTop: 44 }}
      />
    </ClipShell>
  );
};

/** R-C-T-F formula: four parts appear one by one. */
export const Rctf: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.rctf;
  const palette = [
    colors.accent,
    colors.warm,
    colors.secondary,
    colors.success,
  ];
  return (
    <ClipShell>
      <Heading
        title={c.title}
        size={typeScale.h2 + 8}
        gradient={gradients.hot}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 22,
          marginTop: 50,
          width: 1620,
        }}
      >
        {c.rows.map((r, i) => {
          const delay = 40 + i * 75;
          const t = springIn({ frame, fps, delay, config: springs.snappy });
          const ex = progress(frame, delay + 10, delay + 26);
          return (
            <div
              key={r.letter}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 34,
                padding: "20px 30px",
                borderRadius: radii.md,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                opacity: t,
                transform: `translateY(${mix(t, 50, 0)}px)`,
              }}
            >
              <div
                style={{
                  width: 104,
                  height: 104,
                  borderRadius: 28,
                  background: palette[i],
                  color: colors.background,
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: 68,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transform: `scale(${mix(springIn({ frame, fps, delay, config: springs.bouncy }), 0.4, 1)})`,
                }}
              >
                {r.letter}
              </div>
              <div
                style={{
                  width: 230,
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: 50,
                  color: palette[i],
                  flexShrink: 0,
                }}
              >
                {r.meaning}
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 34,
                  lineHeight: 1.35,
                  color: colors.text,
                  opacity: ex,
                  transform: `translateX(${mix(ex, 30, 0)}px)`,
                }}
              >
                {r.example}
              </div>
            </div>
          );
        })}
      </div>
      <FadeIn delay={360} style={{ marginTop: 44 }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: typeScale.body + 2,
            color: colors.textMuted,
          }}
        >
          {c.footer}
        </div>
      </FadeIn>
    </ClipShell>
  );
};

const PromptPanel: React.FC<{
  label: string;
  prompt: string;
  output: readonly string[];
  good: boolean;
  delay: number;
}> = ({ label, prompt, output, good, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const color = good ? colors.success : colors.danger;
  const t = springIn({ frame, fps, delay, config: springs.smooth });
  const n = typedCount(frame, prompt, delay + 10, good ? 4 : 1.6);
  const outStart = delay + 10 + Math.ceil(prompt.length / (good ? 4 : 1.6)) + 8;
  return (
    <div
      style={{
        width: 820,
        height: 640,
        borderRadius: radii.md,
        background: "rgba(15, 22, 49, 0.92)",
        border: `2px solid ${color}88`,
        boxShadow: "0 40px 100px rgba(0,0,0,0.45)",
        padding: 34,
        display: "flex",
        flexDirection: "column",
        gap: 22,
        opacity: t,
        transform: `translateY(${mix(t, 50, 0)}px)`,
      }}
    >
      <div
        style={{
          alignSelf: "flex-start",
          padding: "8px 20px",
          borderRadius: 999,
          background: `${color}26`,
          border: `2px solid ${color}`,
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 24,
          letterSpacing: 3,
          textTransform: "uppercase",
          color,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: good ? 26 : 34,
          lineHeight: 1.4,
          color: colors.text,
          minHeight: good ? 110 : 50,
          padding: "16px 20px",
          borderRadius: 16,
          background: colors.surface,
        }}
      >
        {prompt.slice(0, n)}
        <Caret color={color} on={n < prompt.length} />
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 22,
          letterSpacing: 3,
          color: colors.textMuted,
          textTransform: "uppercase",
        }}
      >
        Output
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {output.map((line, i) => {
          const lt = springIn({
            frame,
            fps,
            delay: outStart + i * 6,
            config: springs.snappy,
          });
          return (
            <div
              key={line}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "14px 20px",
                borderRadius: 14,
                border: `1px solid ${colors.border}`,
                background: good ? `${colors.success}12` : "transparent",
                opacity: lt,
                transform: `translateX(${mix(lt, 30, 0)}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: good ? 25 : 30,
                  color: good ? colors.text : colors.textMuted,
                }}
              >
                {line}
              </div>
              {good ? (
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 24,
                    color: colors.success,
                    fontVariantNumeric: "tabular-nums",
                    flexShrink: 0,
                  }}
                >
                  {line.length}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Side by side: a vague prompt vs an R-C-T-F prompt and what each returns. */
export const VagueVsRctf: React.FC = () => {
  const c = content.vague;
  return (
    <ClipShell>
      <div style={{ display: "flex", gap: 60 }}>
        <PromptPanel
          label={c.vagueLabel}
          prompt={c.vaguePrompt}
          output={c.vagueOutput}
          good={false}
          delay={6}
        />
        <PromptPanel
          label={c.rctfLabel}
          prompt={c.rctfPrompt}
          output={c.rctfOutput}
          good
          delay={80}
        />
      </div>
      <div style={{ marginTop: 50 }}>
        <AnimatedText
          text={c.footer}
          delay={230}
          fontSize={typeScale.h2}
          gradient={gradients.hot}
          staggerFrames={3}
        />
      </div>
    </ClipShell>
  );
};

/** Quick recap of the 5 use cases. */
export const Recap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.recap;
  const palette = [
    colors.secondary,
    colors.accent,
    colors.warm,
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
          gap: 20,
          marginTop: 50,
          width: 980,
        }}
      >
        {c.items.map((item, i) => {
          const delay = 24 + i * 20;
          const t = springIn({ frame, fps, delay, config: springs.snappy });
          return (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 26,
                padding: "16px 28px",
                borderRadius: radii.md,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                opacity: t,
                transform: `translateX(${mix(t, -60, 0)}px)`,
              }}
            >
              <Check delay={delay + 6} color={palette[i]} size={56} />
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
      <FadeIn delay={140} style={{ marginTop: 44 }}>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: typeScale.h3,
            color: colors.warm,
          }}
        >
          {c.footer}
        </div>
      </FadeIn>
    </ClipShell>
  );
};

/** Comment CTA: the question, then "PROMPTS" typed into a comment box. */
export const CommentCta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.comment;
  const typeStart = 76;
  const n = typedCount(frame, c.reply, typeStart, 0.5);
  const doneAt = typeStart + c.reply.length / 0.5;
  const posted = springIn({
    frame,
    fps,
    delay: doneAt + 10,
    config: springs.bouncy,
  });
  const heart = springIn({
    frame,
    fps,
    delay: doneAt + 30,
    config: springs.bouncy,
  });
  return (
    <ClipShell>
      <AnimatedText
        text={c.title}
        fontSize={typeScale.h2}
        staggerFrames={3}
        style={{ maxWidth: 1500 }}
      />
      <FadeIn delay={40} style={{ marginTop: 50 }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: typeScale.body,
            color: colors.textMuted,
            textAlign: "center",
          }}
        >
          {c.hint}
        </div>
      </FadeIn>
      <FadeIn delay={54} style={{ marginTop: 28 }}>
        <div
          style={{
            width: 1100,
            display: "flex",
            alignItems: "center",
            gap: 26,
            padding: "26px 32px",
            borderRadius: radii.md,
            background: colors.surface,
            border: `2px solid ${posted > 0.5 ? colors.warm : colors.border}`,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: gradients.hot,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon
              name="user"
              size={40}
              color={colors.background}
              strokeWidth={2.4}
            />
          </div>
          <div
            style={{
              flex: 1,
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 52,
              color: n > 0 ? colors.text : colors.textMuted,
            }}
          >
            {n > 0 ? (
              c.reply.slice(0, n)
            ) : (
              <span
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 400,
                  fontSize: 34,
                }}
              >
                {c.placeholder}
              </span>
            )}
            <Caret on={posted < 0.1} />
          </div>
          <div style={{ transform: `scale(${mix(heart, 0, 1)})` }}>
            <svg width={52} height={52} viewBox="0 0 24 24">
              <path
                d="M12 20 C5 15 3 11.5 3 8.5 A4.5 4.5 0 0 1 12 6.5 A4.5 4.5 0 0 1 21 8.5 C21 11.5 19 15 12 20 Z"
                fill={colors.accent}
              />
            </svg>
          </div>
          <div
            style={{
              padding: "14px 28px",
              borderRadius: 999,
              background: n >= c.reply.length ? colors.warm : colors.surface,
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: 26,
              color: n >= c.reply.length ? colors.background : colors.textMuted,
              transform: `scale(${1 - progress(frame, doneAt + 6, doneAt + 10) * 0.08 + progress(frame, doneAt + 10, doneAt + 16) * 0.08})`,
            }}
          >
            Comment
          </div>
        </div>
      </FadeIn>
    </ClipShell>
  );
};

/** 20-second end screen with spaces for YouTube's video and subscribe elements. */
export const EndScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.endScreen;
  const boxes = springIn({ frame, fps, delay: 30, config: springs.smooth });
  const dash = {
    border: `3px dashed ${colors.border}`,
    background: "rgba(255,255,255,0.03)",
  };
  return (
    <ClipShell exit={false}>
      <div
        style={{
          position: "absolute",
          top: 110,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <FadeIn>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.body + 4,
              color: colors.textMuted,
            }}
          >
            {c.line}
          </div>
        </FadeIn>
        <AnimatedText
          text={c.big}
          delay={10}
          fontSize={typeScale.h1}
          gradient={gradients.hot}
          staggerFrames={4}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 420,
          display: "flex",
          alignItems: "center",
          gap: 120,
          opacity: boxes,
          transform: `translateY(${mix(boxes, 40, 0)}px)`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              width: 832,
              height: 468,
              borderRadius: 24,
              ...dash,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: 24,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: colors.warm,
              }}
            >
              {c.nextLabel}
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 52,
                color: colors.text,
                textAlign: "center",
                maxWidth: 680,
              }}
            >
              {c.nextTitle}
            </div>
          </div>
        </div>
        <div
          style={{
            width: 380,
            height: 380,
            borderRadius: "50%",
            ...dash,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              padding: "18px 40px",
              borderRadius: 999,
              background: colors.danger,
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: 34,
              color: "#FFFFFF",
              transform: `scale(${1 + Math.max(0, Math.sin((frame - 60) / 14)) * 0.05 * progress(frame, 60, 70)})`,
            }}
          >
            {c.subscribe}
          </div>
        </div>
      </div>
    </ClipShell>
  );
};
