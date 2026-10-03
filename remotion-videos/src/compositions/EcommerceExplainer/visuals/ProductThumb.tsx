import React from "react";
import { colors, fonts } from "../../../theme/theme";

const TINTS = [
  colors.primary,
  colors.secondary,
  colors.accent,
  colors.warm,
  colors.success,
];

/** Small product card: gradient "photo", name and optional price. */
export const ProductThumb: React.FC<{
  name: string;
  index: number;
  price?: string;
  width?: number;
  light?: boolean;
}> = ({ name, index, price, width = 150, light = false }) => (
  <div
    style={{
      width,
      borderRadius: 14,
      overflow: "hidden",
      background: light ? "#FFFFFF" : colors.backgroundAlt,
      border: light ? "1px solid #E5E7EB" : `1px solid ${colors.border}`,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        height: width * 0.62,
        background: `linear-gradient(135deg, ${TINTS[index % TINTS.length]}, ${colors.primary}66)`,
      }}
    />
    <div
      style={{
        padding: "8px 10px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <div
        style={{
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 18,
          color: light ? "#111827" : colors.text,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {name}
      </div>
      {price ? (
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 16,
            color: light ? "#4B5563" : colors.textMuted,
          }}
        >
          {price}
        </div>
      ) : null}
    </div>
  </div>
);
