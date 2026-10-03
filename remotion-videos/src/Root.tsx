import React from "react";
import { Composition, Folder } from "remotion";
import { secondsToFrames, VIDEO } from "./config/video";
import {
  getShowcaseTiming,
  Showcase,
  showcaseSchema,
} from "./compositions/Showcase";
import { Template, templateSchema } from "./compositions/_Template";
import {
  getSeoTiming,
  SeoExplainer,
  seoExplainerSchema,
} from "./compositions/SeoExplainer";
// @new-composition-imports (used by `npm run new`, keep this line)

/**
 * defaultProps are written inline (not imported) so that edits made in the
 * Studio "Props" panel can be saved back into this file.
 *
 * Every video is a <Composition>. Its `id` is what you pass to
 * `npx remotion render <id>`. width/height/fps default to src/config/video.ts.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Examples">
        <Composition
          id="Showcase"
          component={Showcase}
          schema={showcaseSchema}
          defaultProps={{
            eyebrow: "REMOTION · MOTION GRAPHICS",
            title: "Motion graphics,",
            highlight: "written in code.",
            subtitle: "React components, rendered frame by frame into video.",
            features: [
              {
                label: "Typography",
                description: "Kinetic, staggered text",
                shape: "circle",
                color: "#6C5CFF",
              },
              {
                label: "Shapes",
                description: "Springy SVG graphics",
                shape: "star",
                color: "#00D1FF",
              },
              {
                label: "Transitions",
                description: "Fades, slides & wipes",
                shape: "hexagon",
                color: "#FF4D8D",
              },
            ],
            outroTitle: "Your turn.",
            cta: "npm run dev",
            sceneSeconds: { intro: 4, features: 4, stats: 4, outro: 3.5 },
            transitionSeconds: 0.6,
            musicVolume: 0.5,
          }}
          width={VIDEO.width}
          height={VIDEO.height}
          fps={VIDEO.fps}
          // Placeholder; the real length is computed from the props below.
          durationInFrames={1}
          calculateMetadata={({ props }) => ({
            durationInFrames: getShowcaseTiming(props, VIDEO.fps).total,
          })}
        />
        <Composition
          id="Template"
          component={Template}
          schema={templateSchema}
          defaultProps={{
            title: "New composition",
            subtitle: "Edit me in src/compositions",
            durationInSeconds: 5,
          }}
          width={VIDEO.width}
          height={VIDEO.height}
          fps={VIDEO.fps}
          durationInFrames={1}
          calculateMetadata={({ props }) => ({
            durationInFrames: secondsToFrames(
              props.durationInSeconds,
              VIDEO.fps,
            ),
          })}
        />
      </Folder>
      <Folder name="Explainers">
        <Composition
          id="SeoExplainer"
          component={SeoExplainer}
          schema={seoExplainerSchema}
          defaultProps={{
            sceneSeconds: {
              title: 5,
              definition: 9,
              example: 9,
              onPage: 9,
              technical: 9,
              offPage: 9,
              local: 8,
              more: 10,
              summary: 8,
              thanks: 5,
            },
            transitionSeconds: 0.6,
            voiceoverSrc: "",
            musicVolume: 0.35,
          }}
          width={VIDEO.width}
          height={VIDEO.height}
          fps={VIDEO.fps}
          durationInFrames={1}
          calculateMetadata={({ props }) => ({
            durationInFrames: getSeoTiming(props, VIDEO.fps).total,
          })}
        />
      </Folder>
      {/* @new-compositions (used by `npm run new`, keep this line) */}
    </>
  );
};
