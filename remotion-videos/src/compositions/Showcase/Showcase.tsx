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
import { fadeVolume } from "../../utils/audio";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { IntroScene } from "./scenes/IntroScene";
import { OutroScene } from "./scenes/OutroScene";
import { StatsScene } from "./scenes/StatsScene";
import type { ShowcaseProps } from "./schema";
import { getShowcaseTiming } from "./timing";

export const Showcase: React.FC<ShowcaseProps> = (props) => {
  const { fps, durationInFrames } = useVideoConfig();
  const { scenes, transitionFrames } = getShowcaseTiming(props, fps);
  // Each scene's content animates out just before the next scene arrives.
  const exitAt = (sceneFrames: number) =>
    Math.max(0, sceneFrames - transitionFrames - 6);

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={scenes.intro} name="Intro">
          <IntroScene
            eyebrow={props.eyebrow}
            title={props.title}
            highlight={props.highlight}
            subtitle={props.subtitle}
            exitAt={exitAt(scenes.intro)}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionFrames })}
        />
        <TransitionSeries.Sequence
          durationInFrames={scenes.features}
          name="Features"
        >
          <FeaturesScene
            features={props.features}
            exitAt={exitAt(scenes.features)}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: transitionFrames,
          })}
        />
        <TransitionSeries.Sequence durationInFrames={scenes.stats} name="Stats">
          <StatsScene exitAt={exitAt(scenes.stats)} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: transitionFrames })}
        />
        <TransitionSeries.Sequence durationInFrames={scenes.outro} name="Outro">
          <OutroScene title={props.outroTitle} cta={props.cta} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {props.musicVolume > 0 ? (
        <Audio
          src={staticFile("audio/ambient-pad.mp3")}
          loop
          volume={(f) =>
            fadeVolume(f, durationInFrames, 20, 30, props.musicVolume)
          }
        />
      ) : null}
    </AbsoluteFill>
  );
};
