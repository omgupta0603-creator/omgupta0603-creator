import React from "react";
import { Circle, Polygon, Rect, Star, Triangle } from "@remotion/shapes";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { float, mix, springIn, springs } from "../utils/animation";

export type ShapeKind = "circle" | "triangle" | "square" | "star" | "hexagon";

/**
 * An SVG shape (from @remotion/shapes) that pops in with a bouncy spring,
 * rotates into place, then floats gently.
 */
export const ShapeBadge: React.FC<{
  shape: ShapeKind;
  size?: number;
  color: string;
  delay?: number;
  idle?: boolean;
}> = ({ shape, size = 160, color, delay = 0, idle = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = springIn({ frame, fps, delay, config: springs.bouncy });
  const rotation = mix(t, -120, 0) + (idle ? float(frame, 150, 6, delay) : 0);
  const y = idle ? float(frame, 120, 10, delay * 3) : 0;
  const r = size / 2;

  const common = { fill: color };
  const el = {
    circle: <Circle radius={r} {...common} />,
    triangle: (
      <Triangle length={size} direction="up" cornerRadius={10} {...common} />
    ),
    square: (
      <Rect
        width={size * 0.9}
        height={size * 0.9}
        cornerRadius={24}
        {...common}
      />
    ),
    star: (
      <Star
        points={5}
        innerRadius={r * 0.48}
        outerRadius={r}
        cornerRadius={6}
        {...common}
      />
    ),
    hexagon: <Polygon points={6} radius={r} cornerRadius={14} {...common} />,
  }[shape];

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateY(${y}px) scale(${t}) rotate(${rotation}deg)`,
        filter: `drop-shadow(0 20px 40px ${color}66)`,
      }}
    >
      {el}
    </div>
  );
};
