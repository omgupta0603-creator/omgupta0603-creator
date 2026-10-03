import React from "react";
import { colors, radii } from "../theme/theme";

/** Frosted-glass surface for grouping content. */
export const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: radii.lg,
      padding: 48,
      boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
      ...style,
    }}
  >
    {children}
  </div>
);
