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
import {
  getOnPageTiming,
  OnPageExplainer,
  onPageExplainerSchema,
} from "./compositions/OnPageExplainer";
import {
  getOffPageTiming,
  OffPageExplainer,
  offPageExplainerSchema,
} from "./compositions/OffPageExplainer";
import {
  getLocalTiming,
  LocalExplainer,
  localExplainerSchema,
} from "./compositions/LocalExplainer";
import {
  getTechnicalTiming,
  TechnicalExplainer,
  technicalExplainerSchema,
} from "./compositions/TechnicalExplainer";
import {
  getInternationalTiming,
  InternationalExplainer,
  internationalExplainerSchema,
} from "./compositions/InternationalExplainer";
import {
  EcommerceExplainer,
  ecommerceExplainerSchema,
  getEcommerceTiming,
} from "./compositions/EcommerceExplainer";
import {
  getStrategyTiming,
  StrategyExplainer,
  strategyExplainerSchema,
} from "./compositions/StrategyExplainer";
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
        <Composition
          id="OnPageExplainer"
          component={OnPageExplainer}
          schema={onPageExplainerSchema}
          defaultProps={{
            sceneSeconds: {
              title: 6.5,
              definition: 8,
              simple: 8.5,
              keyword: 9,
              titleTag: 8,
              meta: 8.5,
              headings: 9,
              content: 7.5,
              linking: 8.5,
              other: 7,
              summary: 10.5,
              thanks: 4.5,
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
            durationInFrames: getOnPageTiming(props, VIDEO.fps).total,
          })}
        />
        <Composition
          id="OffPageExplainer"
          component={OffPageExplainer}
          schema={offPageExplainerSchema}
          defaultProps={{
            sceneSeconds: {
              title: 6.5,
              definition: 8.5,
              compare: 8,
              links: 13,
              quality: 10.5,
              pr: 9,
              more: 8,
              local: 8,
              objective: 7,
              summary: 8,
              thanks: 4.5,
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
            durationInFrames: getOffPageTiming(props, VIDEO.fps).total,
          })}
        />
        <Composition
          id="LocalExplainer"
          component={LocalExplainer}
          schema={localExplainerSchema}
          defaultProps={{
            sceneSeconds: {
              title: 6.5,
              definition: 8.5,
              example: 11.5,
              gbp: 13.5,
              keywords: 10.5,
              reviews: 8,
              citations: 8.5,
              other: 7,
              summary: 9.5,
              strategy: 7,
              thanks: 4.5,
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
            durationInFrames: getLocalTiming(props, VIDEO.fps).total,
          })}
        />
        <Composition
          id="TechnicalExplainer"
          component={TechnicalExplainer}
          schema={technicalExplainerSchema}
          defaultProps={{
            sceneSeconds: {
              title: 6.5,
              definition: 11,
              simple: 8.5,
              crawl: 11,
              robots: 8.5,
              sitemap: 7,
              canonical: 10,
              speed: 8,
              mobile: 7.5,
              other: 7.5,
              example: 9,
              summary: 7.5,
              thanks: 4.5,
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
            durationInFrames: getTechnicalTiming(props, VIDEO.fps).total,
          })}
        />
        <Composition
          id="InternationalExplainer"
          component={InternationalExplainer}
          schema={internationalExplainerSchema}
          defaultProps={{
            sceneSeconds: {
              title: 6.5,
              definition: 10,
              example: 14,
              targeting: 10,
              hreflang: 8,
              keywords: 11.5,
              urls: 9,
              localization: 9,
              other: 6.5,
              summary: 7.5,
              thanks: 4.5,
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
            durationInFrames: getInternationalTiming(props, VIDEO.fps).total,
          })}
        />
        <Composition
          id="EcommerceExplainer"
          component={EcommerceExplainer}
          schema={ecommerceExplainerSchema}
          defaultProps={{
            sceneSeconds: {
              title: 6.5,
              definition: 10.5,
              example: 9.5,
              keywords: 8,
              category: 8.5,
              product: 8,
              technical: 10.5,
              linking: 7,
              schema: 8.5,
              ux: 8,
              summary: 9,
              thanks: 4.5,
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
            durationInFrames: getEcommerceTiming(props, VIDEO.fps).total,
          })}
        />
        <Composition
          id="StrategyExplainer"
          component={StrategyExplainer}
          schema={strategyExplainerSchema}
          defaultProps={{
            sceneSeconds: {
              title: 5,
              roadmap: 6,
              audit: 6,
              keywords: 6.5,
              competitors: 6.5,
              onpage: 6.5,
              technical: 6.5,
              content: 7,
              offpage: 7.5,
              measure: 8.5,
              recap: 6,
              thanks: 4,
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
            durationInFrames: getStrategyTiming(props, VIDEO.fps).total,
          })}
        />
      </Folder>
      {/* @new-compositions (used by `npm run new`, keep this line) */}
    </>
  );
};
