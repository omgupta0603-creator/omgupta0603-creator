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
import { AcronymScene, QuoteSummary, ThankYou, TitleCard } from "../../scenes";
import { colors, fonts, typeScale } from "../../theme/theme";
import { fadeVolume } from "../../utils/audio";
import { content } from "./content";
import type { AeoExplainerProps } from "./schema";
import { CompareScene } from "./scenes/CompareScene";
import { ExampleScene } from "./scenes/ExampleScene";
import { FutureScene } from "./scenes/FutureScene";
import { getAeoTiming } from "./timing";
import { AnswersVisual } from "./visuals/AnswersVisual";
import { DepthVisual } from "./visuals/DepthVisual";
import { IntentVisual } from "./visuals/IntentVisual";
import { SchemaVisual } from "./visuals/SchemaVisual";
import { StructureVisual } from "./visuals/StructureVisual";
import { TrustVisual } from "./visuals/TrustVisual";

export const AeoExplainer: React.FC<AeoExplainerProps> = (props) => {
  const { fps, durationInFrames } = useVideoConfig();
  const { scenes, transitionFrames } = getAeoTiming(props, fps);
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
                      →
                    </div>
                  ) : null}
                  <Pill
                    color={[colors.secondary, colors.primary, colors.accent][i]}
                    delay={80 + i * 12}
                    fontSize={36}
                  >
                    {f}
                  </Pill>
                </React.Fragment>
              ))}
            </div>
            <FadeIn delay={120} style={{ marginTop: 22 }}>
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
          name="SEO vs AEO"
          durationInFrames={scenes.compare}
          premountFor={fps}
        >
          <CompareScene exitAt={exitAt(scenes.compare)} />
        </TransitionSeries.Sequence>
        {fadeT}
        <TransitionSeries.Sequence
          name="Example"
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
          name="01 Search intent"
          durationInFrames={scenes.intent}
          premountFor={fps}
        >
          <TopicLayout
            {...content.intent}
            titleSize={84}
            color={colors.secondary}
            exitAt={exitAt(scenes.intent)}
          >
            <IntentVisual color={colors.secondary} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="02 Direct answers"
          durationInFrames={scenes.answers}
          premountFor={fps}
        >
          <TopicLayout
            {...content.answers}
            titleSize={84}
            color={colors.primary}
            exitAt={exitAt(scenes.answers)}
          >
            <AnswersVisual color={colors.primary} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="03 Structure"
          durationInFrames={scenes.structure}
          premountFor={fps}
        >
          <TopicLayout
            {...content.structure}
            titleSize={84}
            color={colors.warm}
            exitAt={exitAt(scenes.structure)}
          >
            <StructureVisual color={colors.warm} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="04 Topical depth"
          durationInFrames={scenes.depth}
          premountFor={fps}
        >
          <TopicLayout
            {...content.depth}
            titleSize={84}
            color={colors.accent}
            exitAt={exitAt(scenes.depth)}
          >
            <DepthVisual color={colors.accent} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="05 Trustworthy info"
          durationInFrames={scenes.trust}
          premountFor={fps}
        >
          <TopicLayout
            {...content.trust}
            titleSize={84}
            color={colors.success}
            exitAt={exitAt(scenes.trust)}
          >
            <TrustVisual color={colors.success} />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {slideT}
        <TransitionSeries.Sequence
          name="Structured data"
          durationInFrames={scenes.schema}
          premountFor={fps}
        >
          <TopicLayout
            {...content.schema}
            color={colors.primary}
            exitAt={exitAt(scenes.schema)}
          >
            <SchemaVisual />
          </TopicLayout>
        </TransitionSeries.Sequence>
        {wipeT}
        <TransitionSeries.Sequence
          name="Summary"
          durationInFrames={scenes.summary}
          premountFor={fps}
        >
          <QuoteSummary {...content.summary} exitAt={exitAt(scenes.summary)} />
        </TransitionSeries.Sequence>
        {fadeT}
        <TransitionSeries.Sequence
          name="SEO + AEO"
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
