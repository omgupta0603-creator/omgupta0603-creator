import React from "react";
import { AbsoluteFill, Series, useVideoConfig } from "remotion";
import { secondsToFrames } from "../../config/video";
import { CLIPS } from "./clips";
import { ContentProvider, type Lang } from "./content";

/** Every clip back to back, to review the whole pack in one file. */
export const ClaudeMarketingReel: React.FC<{ lang: Lang }> = ({ lang }) => {
  const { fps } = useVideoConfig();
  return (
    <ContentProvider lang={lang}>
      <AbsoluteFill style={{ backgroundColor: "black" }}>
        <Series>
          {CLIPS.map((c) => (
            <Series.Sequence
              key={c.id}
              name={c.id}
              durationInFrames={secondsToFrames(c.seconds, fps)}
              premountFor={fps}
            >
              <c.component />
            </Series.Sequence>
          ))}
        </Series>
      </AbsoluteFill>
    </ContentProvider>
  );
};

export const reelSeconds = CLIPS.reduce((sum, c) => sum + c.seconds, 0);
