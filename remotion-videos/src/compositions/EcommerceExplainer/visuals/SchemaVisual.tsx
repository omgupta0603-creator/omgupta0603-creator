import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { CodeCard, SerpResult } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { mix, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const colorize = (t: string) => {
  // Keys in one colour, string values in another.
  const parts = t.split(/("[^"]*")/g);
  let keyNext = true;
  return parts.map((p, i) => {
    if (!p.startsWith('"')) {
      if (p.includes(":")) keyNext = false;
      if (p.includes(",") || p.includes("{")) keyNext = true;
      return (
        <span key={i} style={{ color: colors.textMuted }}>
          {p}
        </span>
      );
    }
    const isKey = keyNext;
    keyNext = !isKey;
    return (
      <span key={i} style={{ color: isKey ? colors.secondary : colors.warm }}>
        {p}
      </span>
    );
  });
};

/** JSON-LD Product schema types in, then the search result gains price, stock and stars. */
export const SchemaVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.schema;
  const cpf = 4;
  const chars = c.lines.reduce((a, l) => a + Math.max(1, l.length), 0);
  const richAt = 10 + chars / cpf + 6;
  const rich = springIn({ frame, fps, delay: richAt, config: springs.snappy });

  return (
    <div
      style={{ width: 860, display: "flex", flexDirection: "column", gap: 20 }}
    >
      <CodeCard
        filename="product schema (JSON-LD)"
        lines={c.lines}
        start={10}
        charsPerFrame={cpf}
        fontSize={20}
        width={860}
        renderLine={(t) => colorize(t)}
      />
      <SerpResult
        url={c.url}
        title={c.resultTitle}
        width={860}
        style={{
          opacity: rich,
          transform: `translateY(${mix(rich, 30, 0)}px)`,
          padding: "20px 28px",
        }}
        description={
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
            }}
          >
            <span style={{ color: "#E37400" }}>★★★★★</span>
            <span>
              {c.rating} · {c.reviews} ·{" "}
              <b style={{ color: "#202124" }}>{c.price}</b> ·{" "}
              <span style={{ color: "#188038", fontFamily: fonts.body }}>
                {c.stock}
              </span>
            </span>
          </span>
        }
        descriptionStyle={{ minHeight: 0 }}
      />
    </div>
  );
};
