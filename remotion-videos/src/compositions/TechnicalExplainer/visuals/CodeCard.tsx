import React from "react";
import { useCurrentFrame } from "remotion";
import { colors, fonts } from "../../../theme/theme";

/**
 * Editor-style file card. Lines type in one after another from `start`
 * at `charsPerFrame`; `renderLine` can colour each fully or partially typed line.
 */
export const CodeCard: React.FC<{
  filename: string;
  lines: readonly string[];
  start: number;
  charsPerFrame?: number;
  width?: number;
  fontSize?: number;
  renderLine?: (text: string, index: number) => React.ReactNode;
  children?: React.ReactNode;
}> = ({
  filename,
  lines,
  start,
  charsPerFrame = 2.2,
  width = 840,
  fontSize = 26,
  renderLine,
  children,
}) => {
  const frame = useCurrentFrame();
  const typedTotal = Math.max(0, Math.floor((frame - start) * charsPerFrame));
  let remaining = typedTotal;

  return (
    <div
      style={{
        width,
        borderRadius: 22,
        background: "#0B1024",
        border: `1px solid ${colors.border}`,
        boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 20px",
          background: "rgba(255,255,255,0.05)",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
          <div
            key={c}
            style={{ width: 12, height: 12, borderRadius: 6, background: c }}
          />
        ))}
        <div
          style={{
            marginLeft: 12,
            fontFamily: fonts.body,
            fontSize: 20,
            color: colors.textMuted,
          }}
        >
          {filename}
        </div>
      </div>
      <div
        style={{
          padding: "22px 28px",
          fontFamily: "monospace",
          fontSize,
          lineHeight: 1.6,
        }}
      >
        {lines.map((line, i) => {
          // An empty line still costs one "character" so pacing stays natural.
          const cost = Math.max(1, line.length);
          const shown = Math.max(0, Math.min(line.length, remaining));
          const started = remaining > 0;
          remaining -= cost;
          const text = line.slice(0, shown);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 22,
                minHeight: fontSize * 1.6,
                opacity: started ? 1 : 0,
              }}
            >
              <span
                style={{
                  color: "rgba(255,255,255,0.25)",
                  width: 26,
                  textAlign: "right",
                }}
              >
                {i + 1}
              </span>
              <span style={{ color: colors.text, whiteSpace: "pre" }}>
                {renderLine ? renderLine(text, i) : text}
              </span>
            </div>
          );
        })}
        {children}
      </div>
    </div>
  );
};
