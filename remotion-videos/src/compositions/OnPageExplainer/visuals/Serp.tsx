import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { fonts } from "../../../theme/theme";

/** Number of characters of `text` visible for a typewriter effect. */
export const useTyped = (text: string, start: number, charsPerFrame = 1) => {
  const frame = useCurrentFrame();
  const n = Math.floor(
    interpolate(
      frame,
      [start, start + text.length / charsPerFrame],
      [0, text.length],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    ),
  );
  return { visible: text.slice(0, n), done: n >= text.length, count: n };
};

export const SearchBar: React.FC<{
  text: string;
  width?: number;
  cursor?: boolean;
}> = ({ text, width = 820, cursor = false }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        width,
        height: 76,
        borderRadius: 38,
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "0 30px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
      }}
    >
      <svg width={30} height={30} viewBox="0 0 24 24">
        <circle
          cx={10}
          cy={10}
          r={7}
          fill="none"
          stroke="#5F6368"
          strokeWidth={2.5}
        />
        <path
          d="M15 15 L21 21"
          stroke="#5F6368"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      </svg>
      <div style={{ fontFamily: fonts.body, fontSize: 32, color: "#202124" }}>
        {text}
        {cursor ? (
          <span
            style={{
              opacity: Math.floor(frame / 12) % 2 === 0 ? 1 : 0,
              color: "#6C5CFF",
            }}
          >
            |
          </span>
        ) : null}
      </div>
    </div>
  );
};

/** A Google-style search result, light theme. */
export const SerpResult: React.FC<{
  url: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  width?: number;
  style?: React.CSSProperties;
  descriptionStyle?: React.CSSProperties;
}> = ({ url, title, description, width = 820, style, descriptionStyle }) => (
  <div
    style={{
      width,
      borderRadius: 24,
      background: "#FFFFFF",
      padding: "28px 34px",
      boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      ...style,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 17,
          background: "linear-gradient(135deg,#6C5CFF,#00D1FF)",
        }}
      />
      <div style={{ fontFamily: fonts.body, fontSize: 22, color: "#4D5156" }}>
        {url}
      </div>
    </div>
    <div
      style={{
        fontFamily: fonts.body,
        fontSize: 34,
        lineHeight: 1.25,
        color: "#1A0DAB",
        minHeight: 44,
      }}
    >
      {title}
    </div>
    {description !== undefined ? (
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 24,
          lineHeight: 1.5,
          color: "#4D5156",
          minHeight: 108,
          ...descriptionStyle,
        }}
      >
        {description}
      </div>
    ) : null}
  </div>
);
