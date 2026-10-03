import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";
import { SerpResult, useTyped } from "../../../components";

/** The description writes itself under the result, then a cursor clicks it and CTR rises. */
export const MetaVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.meta;
  const resultIn = springIn({ frame, fps, delay: 8, config: springs.smooth });
  const descStart = 24;
  const desc = useTyped(c.description, descStart, 2.6);
  const descEnd = descStart + c.description.length / 2.6;
  const labelIn = progress(frame, descStart, descStart + 12);

  const moveStart = descEnd + 6;
  const clickAt = moveStart + 22;
  const move = progress(frame, moveStart, clickAt);
  const click = springIn({
    frame,
    fps,
    delay: clickAt,
    config: springs.bouncy,
  });
  const press = interpolate(
    frame,
    [clickAt, clickAt + 4, clickAt + 10],
    [1, 0.85, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const ctr = mix(progress(frame, clickAt, clickAt + 40), 1.8, 5.6);

  return (
    <div
      style={{
        position: "relative",
        width: 840,
        height: 560,
        display: "flex",
        flexDirection: "column",
        gap: 30,
        justifyContent: "center",
      }}
    >
      <SerpResult
        url={c.url}
        title={c.titleText}
        description={desc.visible}
        descriptionStyle={{
          borderRadius: 12,
          padding: "8px 12px",
          margin: "4px -12px 0",
          outline: `3px solid rgba(0,209,255,${labelIn})`,
          background: `rgba(0,209,255,${labelIn * 0.08})`,
        }}
        style={{
          opacity: resultIn,
          transform: `translateY(${mix(resultIn, 30, 0)}px) scale(${mix(click, 1, 1.02)})`,
          boxShadow: `0 30px 80px rgba(0,0,0,0.45), 0 0 0 ${click * 6}px ${color}88`,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: labelIn,
        }}
      >
        <div
          style={{
            padding: "10px 22px",
            borderRadius: 999,
            border: `2px solid ${color}`,
            background: `${color}26`,
            fontFamily: fonts.body,
            fontWeight: 500,
            fontSize: 26,
            color: colors.text,
          }}
        >
          Meta description
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 28,
            color: colors.textMuted,
            opacity: click,
          }}
        >
          Click-through rate{" "}
          <span
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 44,
              color: colors.success,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {ctr.toFixed(1)}%
          </span>
        </div>
      </div>
      {/* Mouse cursor */}
      <svg
        width={44}
        height={56}
        viewBox="0 0 22 28"
        style={{
          position: "absolute",
          left: mix(move, 760, 420),
          top: mix(move, 520, 150),
          opacity: progress(frame, moveStart - 4, moveStart + 4),
          transform: `scale(${press})`,
          filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.5))",
        }}
      >
        <path
          d="M1 1 L1 22 L7 17 L11 26 L15 24 L11 15 L19 15 Z"
          fill="white"
          stroke="#202124"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
