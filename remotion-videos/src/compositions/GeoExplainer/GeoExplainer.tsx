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
import { FadeIn, Pill, TopicLayout } from "../../components";
import { AcronymScene, ThankYou, TitleCard } from "../../scenes";
import { colors, fonts, typeScale } from "../../theme/theme";
import { fadeVolume } from "../../utils/audio";
import { content } from "./content";
import type { GeoExplainerProps } from "./schema";
import { ExampleScene } from "./scenes/ExampleScene";
import { FutureScene } from "./scenes/FutureScene";
import { SummaryScene } from "./scenes/SummaryScene";
import { getGeoTiming } from "./timing";
import { BrandVisual } from "./visuals/BrandVisual";
import { FreshVisual } from "./visuals/FreshVisual";
import { QualityVisual } from "./visuals/QualityVisual";
import { ReadableVisual } from "./visuals/ReadableVisual";
import { TopicalVisual } from "./visuals/TopicalVisual";

export const GeoExplainer: React.FC<GeoExplainerProps> = (props) => {
  const { fps, durationInFrames } = useVideoConfig();
  const { scenes, transitionFrames } = getGeoTiming(props, fps);
  const exitAt = (n: number) => Math.max(0, n - transitionFrames - 6);
  const d = content.definition;

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
          <AcronymScene words={d.words} exitAt={exitAt(scenes.definition)}>
            <FadeIn delay={64} style={{ marginTop: 60 }}>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: typeScale.h3 - 6,
                  color: colors.textMuted,
                  textAlign: "center",
                }}
              >
                {d.lead}
              </div>
            </FadeIn>
            <div
              style={{
                display: "flex",
                gap: 18,
                alignItems: "center",
                marginTop: 22,
              }}
            >
              {d.flow.map((f, i) => (
                <React.Fragment key={f}>
                  {i > 0 ? (
                    <div
                      style={{
                        fontFamily: fonts.display,
                        fontSize: 40,
                        color: colors.textMuted,
                      }}
                    >
                      ·
                    </div>
                  ) : null}
                  <Pill
                    color={
                      [colors.secondary, colors.primary, colors.success][i]
                    }
                    delay={84 + i * 14}
                    fontSize={36}
                  >
                    {f}
                  </Pill>
                </React.Fragment>
              ))}
            </div>
            <FadeIn delay={130} style={{ marginTop: 22 }}>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: typeScale.body,
                  color: colors.text,
                  textAlign: "center",
                }}
              >
                {d.by}
              </div>
            </FadeIn>
          </AcronymScene>
        </TransitionSeries.Sequence>
        {fadeT}
        <TransitionSeries.Sequence
          name="AI answer example"
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
          name="01 Quality content"
          durationInFrames={scenes.quality}
          premountFor={fps}
        >
          <TopicLayout
            {...content.quality}
            titleSize={76}
            color={colors.secondary}
            exitAt={exitAt(scenes.quality)}
          >
            <QualityVisual color={colors.secondary} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="02 Topical authority"
          durationInFrames={scenes.topical}
          premountFor={fps}
        >
          <TopicLayout
            {...content.topical}
            color={colors.primary}
            exitAt={exitAt(scenes.topical)}
          >
            <TopicalVisual color={colors.primary} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="03 Easy for AI"
          durationInFrames={scenes.readable}
          premountFor={fps}
        >
          <TopicLayout
            {...content.readable}
            titleSize={84}
            color={colors.warm}
            exitAt={exitAt(scenes.readable)}
          >
            <ReadableVisual color={colors.warm} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="04 Brand mentions"
          durationInFrames={scenes.brand}
          premountFor={fps}
        >
          <TopicLayout
            {...content.brand}
            titleSize={84}
            color={colors.accent}
            exitAt={exitAt(scenes.brand)}
          >
            <BrandVisual color={colors.accent} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="05 Fresh info"
          durationInFrames={scenes.fresh}
          premountFor={fps}
        >
          <TopicLayout
            {...content.fresh}
            titleSize={84}
            color={colors.success}
            exitAt={exitAt(scenes.fresh)}
          >
            <FreshVisual color={colors.success} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {wipeT}
        <TransitionSeries.Sequence
          name="SEO · AEO · GEO"
          durationInFrames={scenes.summary}
          premountFor={fps}
        >
          <SummaryScene exitAt={exitAt(scenes.summary)} />
        </TransitionSeries.Sequence>
        {fadeT}
        <TransitionSeries.Sequence
          name="Together"
          durationInFrames={scenes.future}
          premountFor={fps}
        >
          <FutureScene exitAt={exitAt(scenes.future)} />
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
