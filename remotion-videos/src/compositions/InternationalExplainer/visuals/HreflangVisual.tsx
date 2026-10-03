import React from "react";
import { useCurrentFrame } from "remotion";
import { CodeCard, Pill } from "../../../components";
import { colors } from "../../../theme/theme";
import { content } from "../content";

const colorize = (text: string) => {
  // Highlight the hreflang value inside the typed text.
  const m = text.match(/^(.*hreflang=")([^"]*)(".*)?$/);
  if (!m) return <span style={{ color: colors.textMuted }}>{text}</span>;
  return (
    <>
      <span style={{ color: colors.secondary }}>{m[1]}</span>
      <span style={{ color: colors.warm, fontWeight: 700 }}>{m[2]}</span>
      <span style={{ color: colors.secondary }}>{m[3] ?? ""}</span>
    </>
  );
};

/** hreflang tags type in, then labels show what each one tells search engines. */
export const HreflangVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const c = content.hreflang;
  const cpf = 4;
  const chars = c.lines.reduce((a, l) => a + Math.max(1, l.length), 0);
  const doneAt = 12 + chars / cpf;

  return (
    <div
      style={{ width: 860, display: "flex", flexDirection: "column", gap: 24 }}
    >
      <CodeCard
        filename="<head> of each page version"
        lines={c.lines}
        start={12}
        charsPerFrame={cpf}
        fontSize={21}
        width={860}
        renderLine={(t) => colorize(t)}
      />
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          opacity: frame >= doneAt - 4 ? 1 : 0,
        }}
      >
        {c.understood.map((u, i) => (
          <Pill
            key={u}
            color={
              [colors.warm, colors.primary, colors.secondary, colors.textMuted][
                i
              ]
            }
            delay={doneAt + i * 6}
            fontSize={24}
          >
            ✓ {u}
          </Pill>
        ))}
      </div>
    </div>
  );
};
