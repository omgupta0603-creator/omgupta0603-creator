import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";
import { SearchBar, SerpResult, useTyped } from "./Serp";

/** Query typed → result title typed in → length meter + "matches the query" check. */
export const TitleTagVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.titleTag;
  const query = useTyped(c.query, 10, 0.9);
  const titleStart = 10 + c.query.length / 0.9 + 12;
  const title = useTyped(c.titleText, titleStart, 1.4);
  const resultIn = springIn({
    frame,
    fps,
    delay: titleStart - 8,
    config: springs.smooth,
  });
  const matchAt = titleStart + c.titleText.length / 1.4 + 8;
  const match = progress(frame, matchAt, matchAt + 14);
  const ratio = title.count / c.maxChars;
  // The part of the title that answers the query gets a marker once typed.
  const matchText = "What is On-Page SEO?";
  const shown = title.visible;
  const head = shown.slice(0, Math.min(shown.length, matchText.length));
  const tail = shown.slice(head.length);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 28, width: 840 }}
    >
      <SearchBar text={query.visible} cursor={!query.done} />
      <SerpResult
        url={c.url}
        title={
          <>
            <span
              style={{
                backgroundImage: `linear-gradient(90deg, ${colors.warm}AA, ${colors.warm}AA)`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 100%",
                backgroundSize: `${match * 100}% 30%`,
              }}
            >
              {head}
            </span>
            {tail}
            {!title.done && frame >= titleStart ? (
              <span style={{ color: color }}>|</span>
            ) : null}
          </>
        }
        style={{
          opacity: resultIn,
          transform: `translateY(${mix(resultIn, 30, 0)}px)`,
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity: resultIn,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 14,
            borderRadius: 7,
            background: colors.border,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${Math.min(1, ratio) * 100}%`,
              height: "100%",
              borderRadius: 7,
              background: colors.success,
            }}
          />
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 26,
            color: colors.text,
            fontVariantNumeric: "tabular-nums",
            width: 230,
          }}
        >
          {title.count}/{c.maxChars} characters
        </div>
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 28,
          fontWeight: 500,
          color: colors.success,
          opacity: match,
          transform: `translateY(${mix(match, 16, 0)}px)`,
        }}
      >
        ✓ Describes the page · ✓ Matches the search query
      </div>
    </div>
  );
};
