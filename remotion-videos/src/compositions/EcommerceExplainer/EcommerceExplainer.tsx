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
import type { EcommerceExplainerProps } from "./schema";
import { DefinitionScene } from "./scenes/DefinitionScene";
import { ExampleScene } from "./scenes/ExampleScene";
import { UxScene } from "./scenes/UxScene";
import { getEcommerceTiming } from "./timing";
import { CategoryVisual } from "./visuals/CategoryVisual";
import { KeywordsVisual } from "./visuals/KeywordsVisual";
import { LinkingVisual } from "./visuals/LinkingVisual";
import { ProductVisual } from "./visuals/ProductVisual";
import { SchemaVisual } from "./visuals/SchemaVisual";
import { TechnicalVisual } from "./visuals/TechnicalVisual";

export const EcommerceExplainer: React.FC<EcommerceExplainerProps> = (
  props,
) => {
  const { fps, durationInFrames } = useVideoConfig();
  const { scenes, transitionFrames } = getEcommerceTiming(props, fps);
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
          name="Search example"
          durationInFrames={scenes.example}
          premountFor={fps}
        >
          <ExampleScene
            exitAt={exitAt(scenes.example)}
            durationInFrames={scenes.example}
          />
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="01 Keyword research"
          durationInFrames={scenes.keywords}
          premountFor={fps}
        >
          <TopicLayout
            {...content.keywords}
            color={colors.warm}
            exitAt={exitAt(scenes.keywords)}
          >
            <KeywordsVisual />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="02 Category pages"
          durationInFrames={scenes.category}
          premountFor={fps}
        >
          <TopicLayout
            {...content.category}
            color={colors.primary}
            exitAt={exitAt(scenes.category)}
          >
            <CategoryVisual color={colors.primary} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="03 Product pages"
          durationInFrames={scenes.product}
          premountFor={fps}
        >
          <TopicLayout
            {...content.product}
            color={colors.secondary}
            exitAt={exitAt(scenes.product)}
          >
            <ProductVisual color={colors.secondary} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="04 Technical SEO"
          durationInFrames={scenes.technical}
          premountFor={fps}
        >
          <TopicLayout
            {...content.technical}
            color={colors.accent}
            exitAt={exitAt(scenes.technical)}
          >
            <TechnicalVisual color={colors.accent} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="05 Internal linking"
          durationInFrames={scenes.linking}
          premountFor={fps}
        >
          <TopicLayout
            {...content.linking}
            color={colors.success}
            exitAt={exitAt(scenes.linking)}
          >
            <LinkingVisual color={colors.primary} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="06 Product schema"
          durationInFrames={scenes.schema}
          premountFor={fps}
        >
          <TopicLayout
            {...content.schema}
            color={colors.warm}
            exitAt={exitAt(scenes.schema)}
          >
            <SchemaVisual />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {wipeT}
        <TransitionSeries.Sequence
          name="UX & performance"
          durationInFrames={scenes.ux}
          premountFor={fps}
        >
          <UxScene exitAt={exitAt(scenes.ux)} />
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
