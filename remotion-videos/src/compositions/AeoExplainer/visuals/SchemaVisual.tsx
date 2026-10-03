import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { CodeCard } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const colorize = (t: string) =>
  t.split(/("[^"]*")/g).map((p, i) =>
    p.startsWith('"') ? (
      <span
        key={i}
        style={{
          color:
            p.includes("@type") || p.endsWith(':"')
              ? colors.secondary
              : colors.warm,
        }}
      >
        {p}
      </span>
    ) : (
      <span key={i} style={{ color: colors.textMuted }}>
        {p}
      </span>
    ),
  );

/** FAQPage JSON-LD types in; then two notes: it helps, but it's not a guarantee. */
export const SchemaVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.schema;
  const cpf = 4;
  const chars = c.lines.reduce((a, l) => a + Math.max(1, l.length), 0);
  const notesAt = 10 + chars / cpf + 4;

  const Note: React.FC<{ text: string; good: boolean; delay: number }> = ({
    text,
    good,
    delay,
  }) => {
    const t = springIn({ frame, fps, delay, config: springs.snappy });
    const col = good ? colors.success : colors.warm;
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 18px",
          borderRadius: 16,
          background: `${col}1F`,
          border: `2px solid ${col}`,
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 24,
          color: colors.text,
          opacity: t,
          transform: `translateY(${mix(t, 20, 0)}px)`,
        }}
      >
        <span style={{ color: col }}>{good ? "✓" : "!"}</span>
        {text}
      </div>
    );
  };

  return (
    <div
      style={{ width: 860, display: "flex", flexDirection: "column", gap: 20 }}
    >
      <CodeCard
        filename="FAQPage structured data (JSON-LD)"
        lines={c.lines}
        start={10}
        charsPerFrame={cpf}
        fontSize={21}
        width={860}
        renderLine={(t) => colorize(t)}
      />
      <div style={{ display: "flex", gap: 16 }}>
        <Note text={c.helps} good delay={notesAt} />
        <Note text={c.caveat} good={false} delay={notesAt + 12} />
      </div>
    </div>
  );
};
