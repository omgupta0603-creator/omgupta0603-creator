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
import { ThankYou, TitleCard } from "../../scenes";
import { colors } from "../../theme/theme";
import { fadeVolume } from "../../utils/audio";
import { content } from "./content";
import type { StrategyExplainerProps } from "./schema";
import { RoadmapScene } from "./scenes/RoadmapScene";
import { getStrategyTiming } from "./timing";
import { AuditVisual } from "./visuals/AuditVisual";
import { CompetitorsVisual } from "./visuals/CompetitorsVisual";
import { ContentVisual } from "./visuals/ContentVisual";
import { KeywordsVisual } from "./visuals/KeywordsVisual";
import { MeasureVisual } from "./visuals/MeasureVisual";
import { OffPageVisual } from "./visuals/OffPageVisual";
import { OnPageVisual } from "./visuals/OnPageVisual";
import { TechnicalVisual } from "./visuals/TechnicalVisual";

const STEP_KEYS = [
  "audit",
  "keywords",
  "competitors",
  "onpage",
  "technical",
  "content",
  "offpage",
  "measure",
] as const;
const STEP_COLORS = [
  colors.secondary,
  colors.warm,
  colors.accent,
  colors.primary,
  colors.secondary,
  colors.success,
  colors.accent,
  colors.primary,
];

export const StrategyExplainer: React.FC<StrategyExplainerProps> = (props) => {
  const { fps, durationInFrames } = useVideoConfig();
  const { scenes, transitionFrames } = getStrategyTiming(props, fps);
  const exitAt = (n: number) => Math.max(0, n - transitionFrames - 6);

  const fadeT = (key: string) => (
    <TransitionSeries.Transition
      key={key}
      presentation={fade()}
      timing={linearTiming({ durationInFrames: transitionFrames })}
    />
  );
  const slideT = (key: string) => (
    <TransitionSeries.Transition
      key={key}
      presentation={slide({ direction: "from-right" })}
      timing={springTiming({
        config: { damping: 200 },
        durationInFrames: transitionFrames,
      })}
    />
  );
  const wipeT = (key: string) => (
    <TransitionSeries.Transition
      key={key}
      presentation={wipe({ direction: "from-left" })}
      timing={linearTiming({ durationInFrames: transitionFrames })}
    />
  );

  const visuals: Record<(typeof STEP_KEYS)[number], React.ReactNode> = {
    audit: <AuditVisual />,
    keywords: <KeywordsVisual />,
    competitors: <CompetitorsVisual />,
    onpage: <OnPageVisual color={colors.primary} />,
    technical: <TechnicalVisual />,
    content: <ContentVisual color={colors.success} />,
    offpage: <OffPageVisual />,
    measure: <MeasureVisual />,
  };

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
        {fadeT("t0")}
        <TransitionSeries.Sequence
          name="Roadmap"
          durationInFrames={scenes.roadmap}
          premountFor={fps}
        >
          <RoadmapScene exitAt={exitAt(scenes.roadmap)} />
        </TransitionSeries.Sequence>
        {STEP_KEYS.flatMap((key, i) => {
          const step = content.steps[i];
          return [
            slideT(`t${key}`),
            <TransitionSeries.Sequence
              key={key}
              name={`${step.number} ${step.title}`}
              durationInFrames={scenes[key]}
              premountFor={fps}
            >
              <TopicLayout
                number={step.number}
                title={step.title}
                body={step.body}
                titleSize={
                  step.title.length > 20
                    ? 70
                    : step.title.length > 18
                      ? 80
                      : undefined
                }
                color={STEP_COLORS[i]}
                exitAt={exitAt(scenes[key])}
              >
                {visuals[key]}
              </TopicLayout>
            </TransitionSeries.Sequence>,
          ];
        })}
        {wipeT("trecap")}
        <TransitionSeries.Sequence
          name="Recap"
          durationInFrames={scenes.recap}
          premountFor={fps}
        >
          <RoadmapScene recap exitAt={exitAt(scenes.recap)} />
        </TransitionSeries.Sequence>
        {fadeT("tthanks")}
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
