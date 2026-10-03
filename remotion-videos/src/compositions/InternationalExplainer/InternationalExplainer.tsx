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
import { TopicLayout } from "../../components";
import { QuoteSummary, ThankYou, TitleCard } from "../../scenes";
import { colors } from "../../theme/theme";
import { fadeVolume } from "../../utils/audio";
import { content } from "./content";
import type { InternationalExplainerProps } from "./schema";
import { DefinitionScene } from "./scenes/DefinitionScene";
import { ExampleScene } from "./scenes/ExampleScene";
import { OtherScene } from "./scenes/OtherScene";
import { getInternationalTiming } from "./timing";
import { HreflangVisual } from "./visuals/HreflangVisual";
import { KeywordsVisual } from "./visuals/KeywordsVisual";
import { LocalizationVisual } from "./visuals/LocalizationVisual";
import { TargetingVisual } from "./visuals/TargetingVisual";
import { UrlVisual } from "./visuals/UrlVisual";

export const InternationalExplainer: React.FC<InternationalExplainerProps> = (
  props,
) => {
  const { fps, durationInFrames } = useVideoConfig();
  const { scenes, transitionFrames } = getInternationalTiming(props, fps);
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
          <TitleCard {...content.title} exitAt={exitAt(scenes.title)} />
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
          name="Market example"
          durationInFrames={scenes.example}
          premountFor={fps}
        >
          <ExampleScene exitAt={exitAt(scenes.example)} />
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="01 Targeting"
          durationInFrames={scenes.targeting}
          premountFor={fps}
        >
          <TopicLayout
            {...content.targeting}
            titleSize={84}
            color={colors.primary}
            exitAt={exitAt(scenes.targeting)}
          >
            <TargetingVisual />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="02 Hreflang"
          durationInFrames={scenes.hreflang}
          premountFor={fps}
        >
          <TopicLayout
            {...content.hreflang}
            color={colors.secondary}
            exitAt={exitAt(scenes.hreflang)}
          >
            <HreflangVisual />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="03 Keyword research"
          durationInFrames={scenes.keywords}
          premountFor={fps}
        >
          <TopicLayout
            {...content.keywords}
            titleSize={84}
            color={colors.warm}
            exitAt={exitAt(scenes.keywords)}
          >
            <KeywordsVisual />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="04 URL structure"
          durationInFrames={scenes.urls}
          premountFor={fps}
        >
          <TopicLayout
            {...content.urls}
            color={colors.accent}
            exitAt={exitAt(scenes.urls)}
          >
            <UrlVisual />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="05 Localization"
          durationInFrames={scenes.localization}
          premountFor={fps}
        >
          <TopicLayout
            {...content.localization}
            color={colors.success}
            exitAt={exitAt(scenes.localization)}
          >
            <LocalizationVisual />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {wipeT}
        <TransitionSeries.Sequence
          name="Other considerations"
          durationInFrames={scenes.other}
          premountFor={fps}
        >
          <OtherScene exitAt={exitAt(scenes.other)} />
        </TransitionSeries.Sequence>
        {fadeT}
        <TransitionSeries.Sequence
          name="Summary"
          durationInFrames={scenes.summary}
          premountFor={fps}
        >
          <QuoteSummary {...content.summary} exitAt={exitAt(scenes.summary)} />
        </TransitionSeries.Sequence>
        {fadeT}
        <TransitionSeries.Sequence
          name="Thank you"
          durationInFrames={scenes.thanks}
          premountFor={fps}
        >
          <ThankYou {...content.thanks} durationInFrames={scenes.thanks} />
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
