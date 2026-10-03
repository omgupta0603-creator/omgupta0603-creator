import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { eases } from "../utils/animation";

/**
 * Lays out children on a fixed design canvas (default 1920x1080) and scales it
 * to fit the actual composition size. Write scenes in 1080p pixel values and
 * they stay correct when you change the resolution (720p, 1440p, 4K...).
 * For a different aspect ratio (e.g. 1080x1920 vertical), pass matching
 * designWidth/designHeight and lay the scene out for that shape.
 *
 * `exitAt` (frame) animates the content out (fade + scale + blur) over
 * `exitFrames`, so text clears before the next scene's transition covers it.
 */
export const Stage: React.FC<{
  children: React.ReactNode;
  designWidth?: number;
  designHeight?: number;
  exitAt?: number;
  exitFrames?: number;
  style?: React.CSSProperties;
}> = ({
  children,
  designWidth = 1920,
  designHeight = 1080,
  exitAt,
  exitFrames = 12,
  style,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const scale = Math.min(width / designWidth, height / designHeight);
  const exit =
    exitAt === undefined
      ? 0
      : interpolate(frame, [exitAt, exitAt + exitFrames], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: eases.in,
        });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: designWidth,
          height: designHeight,
          flexShrink: 0,
          position: "relative",
          transform: `scale(${scale * (1 - exit * 0.06)})`,
          opacity: 1 - exit,
          filter: exit > 0 ? `blur(${exit * 10}px)` : undefined,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
