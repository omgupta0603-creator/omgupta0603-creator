import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors } from "../theme/theme";
import { float } from "../utils/animation";

type Blob = {
  x: number;
  y: number;
  size: number;
  color: string;
  phase: number;
};

const BLOBS: Blob[] = [
  { x: 18, y: 22, size: 900, color: colors.primary, phase: 0 },
  { x: 82, y: 30, size: 760, color: colors.secondary, phase: 40 },
  { x: 60, y: 92, size: 820, color: colors.accent, phase: 80 },
];

/**
 * Animated gradient backdrop: drifting blurred colour blobs + a subtle grid.
 * Put it first inside a scene so everything else layers on top.
 */
export const Background: React.FC<{
  intensity?: number;
  showGrid?: boolean;
}> = ({ intensity = 0.55, showGrid = true }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{ backgroundColor: colors.background, overflow: "hidden" }}
    >
      {BLOBS.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${b.color} 0%, transparent 65%)`,
            opacity: intensity,
            filter: "blur(40px)",
            transform: `translate(-50%, -50%) translate(${float(frame, 240, 60, b.phase)}px, ${float(frame, 300, 40, b.phase + 60)}px)`,
          }}
        />
      ))}
      {showGrid ? (
        <AbsoluteFill
          style={{
            backgroundImage: `linear-gradient(${colors.border} 1px, transparent 1px), linear-gradient(90deg, ${colors.border} 1px, transparent 1px)`,
            backgroundSize: "96px 96px",
            backgroundPosition: `0px ${(frame * 0.4) % 96}px`,
            opacity: 0.25,
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
