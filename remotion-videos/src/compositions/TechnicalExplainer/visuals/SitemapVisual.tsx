import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Check } from "../../../components";
import { colors, fonts } from "../../../theme/theme";
import { progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";
import { CodeCard } from "../../../components";

/** sitemap.xml lists the important URLs; each one is ticked as "discovered". */
export const SitemapVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const urls = content.sitemap.urls;
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    "<urlset>",
    ...urls.map((u) => `  <url><loc>${u}</loc></url>`),
    "</urlset>",
  ];
  const cpf = 3.2;
  // Frame at which each <loc> line finishes typing.
  const doneAt = (lineIdx: number) => {
    const chars = lines
      .slice(0, lineIdx + 1)
      .reduce((a, l) => a + Math.max(1, l.length), 0);
    return 12 + chars / cpf;
  };
  const allAt = doneAt(lines.length - 1) + 8;
  const badge = springIn({ frame, fps, delay: allAt, config: springs.bouncy });

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 24, width: 860 }}
    >
      <CodeCard
        filename="yourwebsite.com/sitemap.xml"
        lines={lines}
        start={12}
        charsPerFrame={cpf}
        width={860}
        fontSize={19}
        renderLine={(t, i) => {
          const isUrl = i >= 2 && i < 2 + urls.length;
          const lit = isUrl && frame >= doneAt(i);
          return (
            <span
              style={{ display: "inline-flex", alignItems: "center", gap: 14 }}
            >
              <span
                style={{
                  color: t.startsWith("<?")
                    ? colors.textMuted
                    : isUrl
                      ? lit
                        ? colors.text
                        : colors.textMuted
                      : color,
                }}
              >
                {t}
              </span>
              {lit ? (
                <Check delay={doneAt(i)} color={colors.success} size={26} />
              ) : null}
            </span>
          );
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: progress(frame, allAt - 6, allAt),
        }}
      >
        <div
          style={{
            padding: "12px 24px",
            borderRadius: 999,
            background: `${colors.success}22`,
            border: `2px solid ${colors.success}`,
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: 26,
            color: colors.text,
            transform: `scale(${badge})`,
          }}
        >
          ✓ {urls.length} important URLs discovered
        </div>
      </div>
    </div>
  );
};
