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
import type { OnPageExplainerProps } from "./schema";
import { DefinitionScene } from "./scenes/DefinitionScene";
import { OtherElementsScene } from "./scenes/OtherElementsScene";
import { SimpleWordsScene } from "./scenes/SimpleWordsScene";
import { getOnPageTiming } from "./timing";
import { ContentVisual } from "./visuals/ContentVisual";
import { HeadingsVisual } from "./visuals/HeadingsVisual";
import { KeywordVisual } from "./visuals/KeywordVisual";
import { LinkingVisual } from "./visuals/LinkingVisual";
import { MetaVisual } from "./visuals/MetaVisual";
import { TitleTagVisual } from "./visuals/TitleTagVisual";

export const OnPageExplainer: React.FC<OnPageExplainerProps> = (props) => {
  const { fps, durationInFrames } = useVideoConfig();
  const { scenes, transitionFrames } = getOnPageTiming(props, fps);
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
          name="In simple words"
          durationInFrames={scenes.simple}
          premountFor={fps}
        >
          {/* The element list appears about 60% in, when the narration introduces it. */}
          <SimpleWordsScene
            exitAt={exitAt(scenes.simple)}
            elementsAt={Math.round(scenes.simple * 0.6)}
          />
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="01 Keywords"
          durationInFrames={scenes.keyword}
          premountFor={fps}
        >
          <TopicLayout
            {...content.keyword}
            color={colors.warm}
            exitAt={exitAt(scenes.keyword)}
          >
            <KeywordVisual color={colors.warm} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="02 Title tag"
          durationInFrames={scenes.titleTag}
          premountFor={fps}
        >
          <TopicLayout
            {...content.titleTag}
            color={colors.primary}
            exitAt={exitAt(scenes.titleTag)}
          >
            <TitleTagVisual color={colors.primary} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="03 Meta description"
          durationInFrames={scenes.meta}
          premountFor={fps}
        >
          <TopicLayout
            {...content.meta}
            color={colors.secondary}
            exitAt={exitAt(scenes.meta)}
          >
            <MetaVisual color={colors.secondary} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="04 Headings"
          durationInFrames={scenes.headings}
          premountFor={fps}
        >
          <TopicLayout
            {...content.headings}
            color={colors.accent}
            exitAt={exitAt(scenes.headings)}
          >
            <HeadingsVisual />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="05 Content"
          durationInFrames={scenes.content}
          premountFor={fps}
        >
          <TopicLayout
            {...content.content}
            color={colors.success}
            exitAt={exitAt(scenes.content)}
          >
            <ContentVisual color={colors.success} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="06 Internal links"
          durationInFrames={scenes.linking}
          premountFor={fps}
        >
          <TopicLayout
            {...content.linking}
            color={colors.primary}
            exitAt={exitAt(scenes.linking)}
          >
            <LinkingVisual color={colors.primary} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {wipeT}
        <TransitionSeries.Sequence
          name="Other elements"
          durationInFrames={scenes.other}
          premountFor={fps}
        >
          <OtherElementsScene exitAt={exitAt(scenes.other)} />
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
