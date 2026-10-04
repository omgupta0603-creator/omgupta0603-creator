import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText, Background, FadeIn, Stage } from "../../components";
import { colors, fonts, radii, typeScale } from "../../theme/theme";
import { mix, progress, springIn, springs } from "../../utils/animation";

/** Frames before the end of a clip at which its content animates out. */
export const EXIT_FRAMES = 14;

/**
 * Full-frame wrapper for one clip of the pack: animated background, the 1080p
 * design stage, and an exit just before the clip ends so a hard cut back to
 * the talking head lands on a clean background.
 */
export const ClipShell: React.FC<{
  children: React.ReactNode;
  exit?: boolean;
  intensity?: number;
}> = ({ children, exit = true, intensity }) => {
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Background intensity={intensity} />
      <Stage exitAt={exit ? durationInFrames - EXIT_FRAMES : undefined}>
        {children}
      </Stage>
    </AbsoluteFill>
  );
};

/** Small uppercase label chip above a heading. */
export const Eyebrow: React.FC<{
  children: React.ReactNode;
  color?: string;
  delay?: number;
}> = ({ children, color = colors.warm, delay = 0 }) => (
  <FadeIn delay={delay} from="top" distance={20}>
    <div
      style={{
        fontFamily: fonts.body,
        fontWeight: 700,
        fontSize: typeScale.caption,
        letterSpacing: 6,
        textTransform: "uppercase",
        color,
        padding: "12px 28px",
        borderRadius: 999,
        border: `2px solid ${color}`,
        background: `${color}1F`,
      }}
    >
      {children}
    </div>
  </FadeIn>
);

/** Eyebrow + kinetic heading, centred. */
export const Heading: React.FC<{
  eyebrow?: string;
  title: string;
  color?: string;
  size?: number;
  gradient?: string;
  delay?: number;
  style?: React.CSSProperties;
}> = ({
  eyebrow,
  title,
  color,
  size = typeScale.h2,
  gradient,
  delay = 0,
  style,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 28,
      ...style,
    }}
  >
    {eyebrow ? (
      <Eyebrow color={color} delay={delay}>
        {eyebrow}
      </Eyebrow>
    ) : null}
    <AnimatedText
      text={title}
      delay={delay + (eyebrow ? 6 : 0)}
      fontSize={size}
      gradient={gradient}
      staggerFrames={3}
    />
  </div>
);

/** Blinking text caret (frame-driven). */
export const Caret: React.FC<{ color?: string; on?: boolean }> = ({
  color = colors.warm,
  on = true,
}) => {
  const frame = useCurrentFrame();
  if (!on) return null;
  return (
    <span
      style={{
        display: "inline-block",
        width: 3,
        height: "1em",
        marginLeft: 4,
        verticalAlign: "-0.15em",
        background: color,
        opacity: Math.floor(frame / 12) % 2 === 0 ? 1 : 0,
      }}
    />
  );
};

/** Characters of `text` visible, typed from `start` at `cps` chars per frame. */
export const typedCount = (
  frame: number,
  text: string,
  start: number,
  cps: number,
) => Math.max(0, Math.min(text.length, Math.floor((frame - start) * cps)));

/**
 * A generic AI chat composer: optional attachment chip, the prompt typing in,
 * and a send button that pops when typing finishes. No product branding.
 */
export const ChatComposer: React.FC<{
  prompt: string;
  start: number;
  cps?: number;
  width?: number;
  attachment?: string;
  label?: string;
  color?: string;
  fontSize?: number;
}> = ({
  prompt,
  start,
  cps = 2.4,
  width = 1300,
  attachment,
  label = "Prompt",
  color = colors.warm,
  fontSize = 36,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inT = springIn({
    frame,
    fps,
    delay: start - 14,
    config: springs.smooth,
  });
  const n = typedCount(frame, prompt, start, cps);
  const typingDone = n >= prompt.length;
  const doneAt = start + Math.ceil(prompt.length / cps);
  const send = springIn({
    frame,
    fps,
    delay: doneAt + 6,
    config: springs.bouncy,
  });
  const attachT = springIn({
    frame,
    fps,
    delay: start - 6,
    config: springs.snappy,
  });

  return (
    <div
      style={{
        width,
        borderRadius: radii.md,
        background: "rgba(15, 22, 49, 0.92)",
        border: `2px solid ${typingDone ? color : colors.border}`,
        boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 0 ${send * 8}px ${color}22`,
        padding: "30px 36px 26px",
        opacity: inT,
        transform: `translateY(${mix(inT, 40, 0)}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color,
          }}
        >
          {label}
        </div>
        {attachment ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 16px",
              borderRadius: 12,
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              fontFamily: fonts.body,
              fontSize: 22,
              color: colors.text,
              opacity: attachT,
              transform: `scale(${mix(attachT, 0.7, 1)})`,
            }}
          >
            <Icon name="table" size={24} color={colors.success} />
            {attachment}
          </div>
        ) : null}
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize,
          lineHeight: 1.45,
          color: colors.text,
          minHeight: fontSize * 1.45 * 2,
        }}
      >
        “{prompt.slice(0, n)}
        {typingDone ? "”" : null}
        <Caret color={color} on={!typingDone} />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 18,
            background: typingDone ? color : colors.surface,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${1 + send * 0.12 - progress(frame, doneAt + 14, doneAt + 24) * 0.12})`,
          }}
        >
          <svg width={30} height={30} viewBox="0 0 24 24">
            <path
              d="M12 19 V5 M5 12 L12 5 L19 12"
              fill="none"
              stroke={typingDone ? colors.background : colors.textMuted}
              strokeWidth={2.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export type IconName =
  | "pen"
  | "doc"
  | "table"
  | "folder"
  | "clock"
  | "alert"
  | "bug"
  | "tools"
  | "user"
  | "spark"
  | "heart"
  | "search";

/** Simple stroke icons drawn in SVG (24×24 grid). */
export const Icon: React.FC<{
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({ name, size = 48, color = colors.text, strokeWidth = 2 }) => {
  const p = {
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths: Record<IconName, React.ReactNode> = {
    pen: (
      <>
        <path d="M4 20 L8 19 L19 8 L16 5 L5 16 Z" {...p} />
        <path d="M14 7 L17 10" {...p} />
      </>
    ),
    doc: (
      <>
        <path d="M6 3 H14 L19 8 V21 H6 Z" {...p} />
        <path d="M14 3 V8 H19 M9 12 H16 M9 15.5 H16 M9 19 H13" {...p} />
      </>
    ),
    table: (
      <>
        <rect x={3.5} y={4.5} width={17} height={15} rx={2} {...p} />
        <path d="M3.5 9.5 H20.5 M3.5 14.5 H20.5 M9.5 4.5 V19.5" {...p} />
      </>
    ),
    folder: (
      <path
        d="M3 7 V18 A1.5 1.5 0 0 0 4.5 19.5 H19.5 A1.5 1.5 0 0 0 21 18 V9 A1.5 1.5 0 0 0 19.5 7.5 H11 L9 5 H4.5 A1.5 1.5 0 0 0 3 6.5 Z"
        {...p}
      />
    ),
    clock: (
      <>
        <circle cx={12} cy={12} r={8.5} {...p} />
        <path d="M12 7.5 V12 L15 14" {...p} />
      </>
    ),
    alert: (
      <>
        <path d="M12 3.5 L21 19.5 H3 Z" {...p} />
        <path d="M12 10 V14 M12 17 V17.1" {...p} />
      </>
    ),
    bug: (
      <>
        <circle cx={12} cy={12} r={8.5} {...p} />
        <path d="M12 7 V13 M12 16.5 V16.6" {...p} />
      </>
    ),
    tools: (
      <>
        <rect x={4} y={3.5} width={16} height={17} rx={2} {...p} />
        <path
          d="M7.5 7.5 H16.5 M8 12 H8.1 M12 12 H12.1 M16 12 H16.1 M8 16 H8.1 M12 16 H12.1 M16 16 H16.1"
          {...p}
        />
      </>
    ),
    user: (
      <>
        <circle cx={12} cy={8.5} r={3.5} {...p} />
        <path d="M5 20 C5 15.5 8 13.5 12 13.5 C16 13.5 19 15.5 19 20" {...p} />
      </>
    ),
    spark: (
      <path
        d="M12 3 L13.8 10.2 L21 12 L13.8 13.8 L12 21 L10.2 13.8 L3 12 L10.2 10.2 Z"
        {...p}
      />
    ),
    heart: (
      <path
        d="M12 20 C5 15 3 11.5 3 8.5 A4.5 4.5 0 0 1 12 6.5 A4.5 4.5 0 0 1 21 8.5 C21 11.5 19 15 12 20 Z"
        {...p}
      />
    ),
    search: (
      <>
        <circle cx={10.5} cy={10.5} r={6.5} {...p} />
        <path d="M15.5 15.5 L20.5 20.5" {...p} />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ flexShrink: 0 }}
    >
      {paths[name]}
    </svg>
  );
};

/** Rounded icon tile used in lists and grids. */
export const IconTile: React.FC<{
  name: IconName;
  color: string;
  size?: number;
}> = ({ name, color, size = 92 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.28,
      background: `${color}22`,
      border: `2px solid ${color}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <Icon name={name} size={size * 0.52} color={color} strokeWidth={2.2} />
  </div>
);
