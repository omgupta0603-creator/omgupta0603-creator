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
import type { OffPageExplainerProps } from "./schema";
import { CompareScene } from "./scenes/CompareScene";
import { DefinitionScene } from "./scenes/DefinitionScene";
import { MoreScene } from "./scenes/MoreScene";
import { ObjectiveScene } from "./scenes/ObjectiveScene";
import { QualityScene } from "./scenes/QualityScene";
import { getOffPageTiming } from "./timing";
import { BacklinkVisual } from "./visuals/BacklinkVisual";
import { LocalCitationsVisual } from "./visuals/LocalCitationsVisual";
import { PrVisual } from "./visuals/PrVisual";

export const OffPageExplainer: React.FC<OffPageExplainerProps> = (props) => {
  const { fps, durationInFrames } = useVideoConfig();
  const { scenes, transitionFrames } = getOffPageTiming(props, fps);
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
          name="On-Page vs Off-Page"
          durationInFrames={scenes.compare}
          premountFor={fps}
        >
          <CompareScene exitAt={exitAt(scenes.compare)} />
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="01 Link building"
          durationInFrames={scenes.links}
          premountFor={fps}
        >
          <TopicLayout
            {...content.links}
            color={colors.accent}
            exitAt={exitAt(scenes.links)}
          >
            <BacklinkVisual color={colors.accent} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="Quality over quantity"
          durationInFrames={scenes.quality}
          premountFor={fps}
        >
          <QualityScene exitAt={exitAt(scenes.quality)} />
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="02 Digital PR"
          durationInFrames={scenes.pr}
          premountFor={fps}
        >
          <TopicLayout
            {...content.pr}
            color={colors.secondary}
            exitAt={exitAt(scenes.pr)}
          >
            <PrVisual color={colors.secondary} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="More activities"
          durationInFrames={scenes.more}
          premountFor={fps}
        >
          <MoreScene exitAt={exitAt(scenes.more)} />
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="03 Local SEO"
          durationInFrames={scenes.local}
          premountFor={fps}
        >
          <TopicLayout
            {...content.local}
            color={colors.warm}
            exitAt={exitAt(scenes.local)}
          >
            <LocalCitationsVisual color={colors.warm} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {wipeT}
        <TransitionSeries.Sequence
          name="Objective"
          durationInFrames={scenes.objective}
          premountFor={fps}
        >
          <ObjectiveScene exitAt={exitAt(scenes.objective)} />
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
