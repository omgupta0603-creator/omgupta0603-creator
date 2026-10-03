import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText, Background, FadeIn, Stage } from "../../../components";
import { colors, fonts, gradients, typeScale } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const COL = [colors.primary, colors.secondary, colors.warm];
const W = 1500;
const ROOT = { x: W / 2, y: 50 };
const MID_Y = 210;
const LEAF_Y = 360;
const MID_X = [250, 750, 1250];

/** Store → category / product / other pages → example pages, drawn as a tree. */
export const DefinitionScene: React.FC<{ exitAt?: number }> = ({ exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.definition;
  const root = springIn({ frame, fps, delay: 20, config: springs.bouncy });

  const node = (
    label: string,
    x: number,
    y: number,
    delay: number,
    color: string,
    big = false,
  ) => {
    const t = springIn({ frame, fps, delay, config: springs.snappy });
    return (
      <div
        key={`${label}${x}`}
        style={{
          position: "absolute",
          left: x,
          top: y,
          transform: `translate(-50%, -50%) scale(${t})`,
          padding: big ? "16px 26px" : "10px 18px",
          borderRadius: 16,
          background: big ? color : colors.backgroundAlt,
          border: `2px solid ${color}`,
          fontFamily: big ? fonts.display : fonts.body,
          fontWeight: 700,
          fontSize: big ? 30 : 22,
          color: big ? "white" : colors.text,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    );
  };

  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
        <AnimatedText
          text="E-commerce SEO"
          fontSize={typeScale.h2}
          gradient={gradients.brand}
        />
        <FadeIn delay={10} style={{ marginTop: 14 }}>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: typeScale.body + 2,
              color: colors.textMuted,
            }}
          >
            {c.lead}
          </div>
        </FadeIn>
        <div
          style={{ position: "relative", width: W, height: 420, marginTop: 40 }}
        >
          <svg
            width={W}
            height={420}
            style={{ position: "absolute", inset: 0 }}
          >
            {MID_X.map((x, i) => (
              <path
                key={`m${i}`}
                d={`M ${ROOT.x} ${ROOT.y + 24} C ${ROOT.x} 130, ${x} 130, ${x} ${MID_Y - 24}`}
                fill="none"
                stroke={COL[i]}
                strokeWidth={4}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - progress(frame, 30 + i * 6, 46 + i * 6)}
              />
            ))}
            {MID_X.map((x, i) =>
              [-110, 110].map((dx, j) => (
                <path
                  key={`l${i}${j}`}
                  d={`M ${x} ${MID_Y + 22} L ${x + dx} ${LEAF_Y - 18}`}
                  fill="none"
                  stroke={COL[i]}
                  strokeWidth={3}
                  opacity={0.7}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={
                    1 - progress(frame, 56 + i * 6 + j * 3, 70 + i * 6 + j * 3)
                  }
                />
              )),
            )}
          </svg>
          <div
            style={{
              position: "absolute",
              left: ROOT.x,
              top: ROOT.y,
              transform: `translate(-50%, -50%) scale(${root})`,
            }}
          >
            <div
              style={{
                padding: "16px 30px",
                borderRadius: 18,
                background: gradients.brand,
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 32,
                color: "white",
              }}
            >
              {c.store}
            </div>
          </div>
          {c.categories.map((cat, i) =>
            node(cat, MID_X[i], MID_Y, 40 + i * 6, COL[i], true),
          )}
          {c.leaves.map((pair, i) =>
            pair.map((leaf, j) =>
              node(
                leaf,
                MID_X[i] + (j === 0 ? -110 : 110),
                LEAF_Y,
                66 + i * 6 + j * 3,
                COL[i],
              ),
            ),
          )}
        </div>
        <FadeIn delay={96} style={{ marginTop: 6 }}>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 500,
              fontSize: typeScale.h3 - 6,
              color: colors.text,
              opacity: mix(progress(frame, 96, 108), 0, 1),
            }}
          >
            {c.caption}
          </div>
        </FadeIn>
      </Stage>
    </AbsoluteFill>
  );
};
