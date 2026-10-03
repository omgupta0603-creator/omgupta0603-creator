import React from "react";
import { colors } from "../../../theme/theme";

/** Row of five stars; `filled` can be fractional-free (0–5). */
export const Stars: React.FC<{ filled: number; size?: number }> = ({
  filled,
  size = 28,
}) => (
  <div style={{ display: "flex", gap: size * 0.15 }}>
    {[0, 1, 2, 3, 4].map((s) => (
      <svg key={s} width={size} height={size} viewBox="0 0 24 24">
        <path
          d="M12 2 L14.9 8.6 L22 9.3 L16.6 14 L18.2 21 L12 17.3 L5.8 21 L7.4 14 L2 9.3 L9.1 8.6 Z"
          fill={filled > s ? colors.warm : "transparent"}
          stroke={colors.warm}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </svg>
    ))}
  </div>
);
