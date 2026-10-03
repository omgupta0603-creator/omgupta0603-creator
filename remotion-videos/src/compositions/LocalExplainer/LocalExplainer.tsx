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
import type { LocalExplainerProps } from "./schema";
import { DefinitionScene } from "./scenes/DefinitionScene";
import { ExampleScene } from "./scenes/ExampleScene";
import { OtherScene } from "./scenes/OtherScene";
import { StrategyScene } from "./scenes/StrategyScene";
import { getLocalTiming } from "./timing";
import { CitationsVisual } from "./visuals/CitationsVisual";
import { GbpVisual } from "./visuals/GbpVisual";
import { LocalKeywordVisual } from "./visuals/LocalKeywordVisual";
import { ReviewsVisual } from "./visuals/ReviewsVisual";

export const LocalExplainer: React.FC<LocalExplainerProps> = (props) => {
  const { fps, durationInFrames } = useVideoConfig();
  const { scenes, transitionFrames } = getLocalTiming(props, fps);
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
          name="Local search example"
          durationInFrames={scenes.example}
          premountFor={fps}
        >
          <ExampleScene exitAt={exitAt(scenes.example)} />
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="01 Google Business Profile"
          durationInFrames={scenes.gbp}
          premountFor={fps}
        >
          <TopicLayout
            {...content.gbp}
            color={colors.primary}
            exitAt={exitAt(scenes.gbp)}
          >
            <GbpVisual color={colors.primary} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="02 Local keywords"
          durationInFrames={scenes.keywords}
          premountFor={fps}
        >
          <TopicLayout
            {...content.keywords}
            color={colors.secondary}
            exitAt={exitAt(scenes.keywords)}
          >
            <LocalKeywordVisual color={colors.secondary} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="03 Reviews"
          durationInFrames={scenes.reviews}
          premountFor={fps}
        >
          <TopicLayout
            {...content.reviews}
            color={colors.warm}
            exitAt={exitAt(scenes.reviews)}
          >
            <ReviewsVisual color={colors.warm} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="04 Citations"
          durationInFrames={scenes.citations}
          premountFor={fps}
        >
          <TopicLayout
            {...content.citations}
            color={colors.accent}
            exitAt={exitAt(scenes.citations)}
          >
            <CitationsVisual color={colors.accent} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {wipeT}
        <TransitionSeries.Sequence
          name="Other activities"
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
          name="Strategy"
          durationInFrames={scenes.strategy}
          premountFor={fps}
        >
          <StrategyScene exitAt={exitAt(scenes.strategy)} />
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
