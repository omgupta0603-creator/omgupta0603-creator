import React from "react";
import { colors, fonts } from "../../../theme/theme";

/** Country codes get a fixed colour so each market reads the same across scenes. */
export const COUNTRY_COLORS: Record<string, string> = {
  IN: colors.warm,
  US: colors.primary,
  UK: colors.secondary,
  DE: colors.accent,
};

export const CountryBadge: React.FC<{ code: string; size?: number }> = ({
  code,
  size = 56,
}) => {
  const c = COUNTRY_COLORS[code] ?? colors.primary;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        background: `${c}2E`,
        border: `3px solid ${c}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.display,
        fontWeight: 700,
        fontSize: size * 0.36,
        color: colors.text,
        flexShrink: 0,
      }}
    >
      {code}
    </div>
  );
};
