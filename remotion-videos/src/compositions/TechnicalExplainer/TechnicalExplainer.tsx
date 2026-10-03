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
import { ElementsIntro, QuoteSummary, ThankYou, TitleCard } from "../../scenes";
import { colors } from "../../theme/theme";
import { fadeVolume } from "../../utils/audio";
import { content } from "./content";
import type { TechnicalExplainerProps } from "./schema";
import { DefinitionScene } from "./scenes/DefinitionScene";
import { ExampleScene } from "./scenes/ExampleScene";
import { OtherScene } from "./scenes/OtherScene";
import { getTechnicalTiming } from "./timing";
import { CanonicalVisual } from "./visuals/CanonicalVisual";
import { CrawlVisual } from "./visuals/CrawlVisual";
import { MobileVisual } from "./visuals/MobileVisual";
import { RobotsVisual } from "./visuals/RobotsVisual";
import { SitemapVisual } from "./visuals/SitemapVisual";
import { SpeedVisual } from "./visuals/SpeedVisual";

export const TechnicalExplainer: React.FC<TechnicalExplainerProps> = (
  props,
) => {
  const { fps, durationInFrames } = useVideoConfig();
  const { scenes, transitionFrames } = getTechnicalTiming(props, fps);
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
          <ElementsIntro
            {...content.simple}
            exitAt={exitAt(scenes.simple)}
            elementsAt={Math.round(scenes.simple * 0.55)}
          />
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="01 Crawling & indexing"
          durationInFrames={scenes.crawl}
          premountFor={fps}
        >
          <TopicLayout
            {...content.crawl}
            color={colors.primary}
            exitAt={exitAt(scenes.crawl)}
          >
            <CrawlVisual color={colors.primary} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="02 Robots.txt"
          durationInFrames={scenes.robots}
          premountFor={fps}
        >
          <TopicLayout
            {...content.robots}
            color={colors.secondary}
            exitAt={exitAt(scenes.robots)}
          >
            <RobotsVisual />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="03 XML sitemap"
          durationInFrames={scenes.sitemap}
          premountFor={fps}
        >
          <TopicLayout
            {...content.sitemap}
            color={colors.warm}
            exitAt={exitAt(scenes.sitemap)}
          >
            <SitemapVisual color={colors.warm} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="04 Canonicalization"
          durationInFrames={scenes.canonical}
          premountFor={fps}
        >
          <TopicLayout
            {...content.canonical}
            titleSize={76}
            color={colors.accent}
            exitAt={exitAt(scenes.canonical)}
          >
            <CanonicalVisual color={colors.accent} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="05 Speed & CWV"
          durationInFrames={scenes.speed}
          premountFor={fps}
        >
          <TopicLayout
            {...content.speed}
            color={colors.success}
            exitAt={exitAt(scenes.speed)}
          >
            <SpeedVisual />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="06 Mobile"
          durationInFrames={scenes.mobile}
          premountFor={fps}
        >
          <TopicLayout
            {...content.mobile}
            color={colors.primary}
            exitAt={exitAt(scenes.mobile)}
          >
            <MobileVisual color={colors.primary} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {wipeT}
        <TransitionSeries.Sequence
          name="Other areas"
          durationInFrames={scenes.other}
          premountFor={fps}
        >
          <OtherScene exitAt={exitAt(scenes.other)} />
        </TransitionSeries.Sequence>
        {fadeT}
        <TransitionSeries.Sequence
          name="Example"
          durationInFrames={scenes.example}
          premountFor={fps}
        >
          <ExampleScene exitAt={exitAt(scenes.example)} />
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
