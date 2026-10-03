import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText, Background, Stage } from "../../../components";
import { colors, fonts, typeScale } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const STEP_COLS = [
  colors.secondary,
  colors.warm,
  colors.accent,
  colors.primary,
  colors.secondary,
  colors.success,
  colors.accent,
  colors.primary,
];
const W = 1600;
const ROW_Y = [140, 400];
const COL_X = [200, 600, 1000, 1400];

/**
 * The 8 steps as a two-row roadmap (left→right, then right→left).
 * `recap` shows everything quickly, sweeps a highlight through the steps and
 * draws a loop back from step 8 to step 1.
 */
export const RoadmapScene: React.FC<{ exitAt?: number; recap?: boolean }> = ({
  exitAt,
  recap = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const steps = content.steps;
  const step = recap ? 3 : 7;
  const start = recap ? 8 : 22;
  const pos = steps.map((_, i) =>
    i < 4 ? { x: COL_X[i], y: ROW_Y[0] } : { x: COL_X[7 - i], y: ROW_Y[1] },
  );
  const path = `M ${pos[0].x} ${pos[0].y} L ${pos[3].x} ${pos[3].y} C ${pos[3].x + 300} ${pos[3].y}, ${pos[4].x + 300} ${pos[4].y}, ${pos[4].x} ${pos[4].y} L ${pos[7].x} ${pos[7].y}`;
  const pathDraw = progress(frame, start, start + steps.length * step + 10);
  const sweepStart = start + steps.length * step + 10;
  const sweep = recap ? (frame - sweepStart) / 6 : -1;
  const loopDraw = recap
    ? progress(
        frame,
        sweepStart + steps.length * 6,
        sweepStart + steps.length * 6 + 24,
      )
    : 0;
  const loopLabel = springIn({
    frame,
    fps,
    delay: sweepStart + steps.length * 6 + 18,
    config: springs.bouncy,
  });

  return (
    <AbsoluteFill>
      <Background intensity={0.45} />
      <Stage exitAt={exitAt}>
        <AnimatedText
          text={recap ? content.roadmap.recapLead : content.roadmap.lead}
          fontSize={typeScale.h2}
          staggerFrames={3}
        />
        <div
          style={{ position: "relative", width: W, height: 560, marginTop: 50 }}
        >
          <svg
            width={W}
            height={560}
            style={{ position: "absolute", inset: 0, overflow: "visible" }}
          >
            <path
              d={path}
              fill="none"
              stroke={colors.border}
              strokeWidth={10}
              strokeLinecap="round"
            />
            <path
              d={path}
              fill="none"
              stroke={colors.primary}
              strokeWidth={10}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - pathDraw}
            />
            {recap ? (
              <path
                d={`M ${pos[7].x - 70} ${pos[7].y} C ${pos[7].x - 260} ${pos[7].y}, ${pos[0].x - 260} ${pos[0].y}, ${pos[0].x - 72} ${pos[0].y}`}
                fill="none"
                stroke={colors.success}
                strokeWidth={6}
                strokeDasharray="14 12"
                opacity={loopDraw}
                markerEnd="url(#arrow)"
              />
            ) : null}
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.success} />
              </marker>
            </defs>
          </svg>
          {steps.map((s, i) => {
            const t = springIn({
              frame,
              fps,
              delay: start + i * step,
              config: springs.bouncy,
            });
            const lit = recap ? Math.max(0, 1 - Math.abs(sweep - i)) : 0;
            const col = STEP_COLS[i];
            return (
              <div
                key={s.number}
                style={{
                  position: "absolute",
                  left: pos[i].x,
                  top: pos[i].y,
                  transform: `translate(-50%, -50%) scale(${t * (1 + lit * 0.12)})`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: 65,
                    background: colors.backgroundAlt,
                    border: `5px solid ${col}`,
                    boxShadow: `0 0 ${20 + lit * 60}px ${col}${lit > 0.1 ? "AA" : "44"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 48,
                    color: colors.text,
                  }}
                >
                  {s.number}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 142,
                    width: 320,
                    textAlign: "center",
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 30,
                    color: colors.text,
                    opacity: mix(t, 0, 1),
                  }}
                >
                  {s.title}
                </div>
              </div>
            );
          })}
          {recap ? (
            <div
              style={{
                position: "absolute",
                left: W / 2,
                top: 640,
                transform: `translateX(-50%) scale(${loopLabel})`,
                padding: "10px 20px",
                borderRadius: 999,
                background: `${colors.success}22`,
                border: `2px solid ${colors.success}`,
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: 24,
                color: colors.text,
                whiteSpace: "nowrap",
              }}
            >
              ↻ {content.roadmap.loop}
            </div>
          ) : null}
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
