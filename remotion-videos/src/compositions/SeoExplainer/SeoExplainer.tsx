import React from "react";
import { Audio } from "@remotion/media";
import {
  linearTiming,
  springTiming,
  TransitionSeries,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { colors } from "../../theme/theme";
import { fadeVolume } from "../../utils/audio";
import { content } from "./content";
import type { SeoExplainerProps } from "./schema";
import { DefinitionScene } from "./scenes/DefinitionScene";
import { MoreTypesScene } from "./scenes/MoreTypesScene";
import { SearchExampleScene } from "./scenes/SearchExampleScene";
import { SummaryScene } from "./scenes/SummaryScene";
import { ThanksScene } from "./scenes/ThanksScene";
import { TitleScene } from "./scenes/TitleScene";
import { TypeLayout } from "./scenes/TypeLayout";
import { getSeoTiming } from "./timing";
import { LocalVisual } from "./visuals/LocalVisual";
import { OffPageVisual } from "./visuals/OffPageVisual";
import { OnPageVisual } from "./visuals/OnPageVisual";
import { TechnicalVisual } from "./visuals/TechnicalVisual";

export const SeoExplainer: React.FC<SeoExplainerProps> = (props) => {
  const { fps, durationInFrames } = useVideoConfig();
  const { scenes, transitionFrames } = getSeoTiming(props, fps);
  const exitAt = (n: number) => Math.max(0, n - transitionFrames - 6);

  const fadeT = (
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: transitionFrames })}
    />
  );
  const slideT = (
    <TransitionSeries.Transition
      presentation={slide({ direction: "from-right" })}
      timing={springTiming({
        config: { damping: 200 },
        durationInFrames: transitionFrames,
      })}
    />
  );
  const wipeT = (
    <TransitionSeries.Transition
      presentation={wipe({ direction: "from-left" })}
      timing={linearTiming({ durationInFrames: transitionFrames })}
    />
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence
          name="Title"
          durationInFrames={scenes.title}
          premountFor={fps}
        >
          <TitleScene exitAt={exitAt(scenes.title)} />
        </TransitionSeries.Sequence>
        {fadeT}
        <TransitionSeries.Sequence
          name="Definition"
          durationInFrames={scenes.definition}
          premountFor={fps}
        >
          <DefinitionScene exitAt={exitAt(scenes.definition)} />
        </TransitionSeries.Sequence>
        {fadeT}
        <TransitionSeries.Sequence
          name="Search example"
          durationInFrames={scenes.example}
          premountFor={fps}
        >
          <SearchExampleScene exitAt={exitAt(scenes.example)} />
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="01 On-Page"
          durationInFrames={scenes.onPage}
          premountFor={fps}
        >
          <TypeLayout
            {...content.onPage}
            color={colors.primary}
            exitAt={exitAt(scenes.onPage)}
          >
            <OnPageVisual color={colors.primary} />
          </TypeLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="02 Technical"
          durationInFrames={scenes.technical}
          premountFor={fps}
        >
          <TypeLayout
            {...content.technical}
            color={colors.secondary}
            exitAt={exitAt(scenes.technical)}
          >
            <TechnicalVisual
              items={content.technical.items}
              color={colors.secondary}
            />
          </TypeLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="03 Off-Page"
          durationInFrames={scenes.offPage}
          premountFor={fps}
        >
          <TypeLayout
            {...content.offPage}
            color={colors.accent}
            exitAt={exitAt(scenes.offPage)}
          >
            <OffPageVisual
              sources={content.offPage.sources}
              color={colors.accent}
            />
          </TypeLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="04 Local"
          durationInFrames={scenes.local}
          premountFor={fps}
        >
          <TypeLayout
            {...content.local}
            color={colors.warm}
            exitAt={exitAt(scenes.local)}
          >
            <LocalVisual queries={content.local.queries} color={colors.warm} />
          </TypeLayout>
        </TransitionSeries.Sequence>
        {wipeT}
        <TransitionSeries.Sequence
          name="International + E-commerce"
          durationInFrames={scenes.more}
          premountFor={fps}
        >
          <MoreTypesScene exitAt={exitAt(scenes.more)} />
        </TransitionSeries.Sequence>
        {fadeT}
        <TransitionSeries.Sequence
          name="Summary"
          durationInFrames={scenes.summary}
          premountFor={fps}
        >
          <SummaryScene exitAt={exitAt(scenes.summary)} />
        </TransitionSeries.Sequence>
        {fadeT}
        <TransitionSeries.Sequence
          name="Thank you"
          durationInFrames={scenes.thanks}
          premountFor={fps}
        >
          <ThanksScene durationInFrames={scenes.thanks} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {props.voiceoverSrc ? (
        <Audio src={staticFile(props.voiceoverSrc)} />
      ) : null}
      {props.musicVolume > 0 ? (
        <Audio
          src={staticFile("audio/ambient-pad.mp3")}
          loop
          volume={(f) =>
            fadeVolume(f, durationInFrames, 30, 45, props.musicVolume)
          }
        />
      ) : null}
    </AbsoluteFill>
  );
};
