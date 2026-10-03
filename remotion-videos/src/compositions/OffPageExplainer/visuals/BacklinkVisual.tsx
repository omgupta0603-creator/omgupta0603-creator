import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../../../theme/theme";
import { mix, progress, springIn, springs } from "../../../utils/animation";
import { content } from "../content";

const W = 840;
const H = 600;
const SRC_X = 150;
const SRC_Y = [110, 300, 490];
const TGT = { x: 650, y: 300 };

/** Other sites link to yours; each link draws as a curve with a travelling dot. */
export const BacklinkVisual: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = content.links;
  const targetIn = springIn({ frame, fps, delay: 8, config: springs.bouncy });
  const linkStart = 30;
  const step = 16;
  const lastLink = linkStart + (c.sources.length - 1) * step + 20;
  const trust = progress(frame, linkStart + 10, lastLink + 30);
  const signalIn = springIn({
    frame,
    fps,
    delay: lastLink + 24,
    config: springs.snappy,
  });

  return (
    <div style={{ position: "relative", width: W, height: H }}>
      <svg
        width={W}
        height={H}
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        {SRC_Y.map((y, i) => {
          const d = linkStart + i * step;
          const x1 = SRC_X + 120;
          const x2 = TGT.x - 130;
          const path = `M ${x1} ${y} C ${x1 + 140} ${y}, ${x2 - 140} ${TGT.y}, ${x2} ${TGT.y}`;
          const draw = progress(frame, d, d + 20);
          // Dot travels along the curve (sampled with the bezier formula).
          const t = ((frame - d - 20) % 40) / 40;
          const bez = (
            p0: number,
            p1: number,
            p2: number,
            p3: number,
            s: number,
          ) =>
            (1 - s) ** 3 * p0 +
            3 * (1 - s) ** 2 * s * p1 +
            3 * (1 - s) * s ** 2 * p2 +
            s ** 3 * p3;
          const dot = {
            x: bez(x1, x1 + 140, x2 - 140, x2, t),
            y: bez(y, y, TGT.y, TGT.y, t),
          };
          return (
            <g key={i}>
              <path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth={5}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - draw}
                opacity={0.85}
              />
              {frame > d + 20 ? (
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r={9}
                  fill={colors.text}
                  opacity={0.9}
                />
              ) : null}
            </g>
          );
        })}
      </svg>

      {c.sources.map((s, i) => {
        const t = springIn({
          frame,
          fps,
          delay: 14 + i * 6,
          config: springs.snappy,
        });
        return (
          <div
            key={s}
            style={{
              position: "absolute",
              left: SRC_X,
              top: SRC_Y[i],
              transform: `translate(-50%, -50%) scale(${t})`,
              width: 240,
              padding: "18px 20px",
              borderRadius: 18,
              background: colors.backgroundAlt,
              border: `1px solid ${colors.border}`,
              boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: 26,
                color: colors.text,
              }}
            >
              {s}
            </div>
            <div
              style={{
                height: 8,
                width: "90%",
                borderRadius: 4,
                background: "rgba(255,255,255,0.18)",
              }}
            />
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 16,
                color: colors.secondary,
                textDecoration: "underline",
                whiteSpace: "nowrap",
              }}
            >
              link → {c.target}
            </div>
          </div>
        );
      })}

      {/* Target site with a trust ring */}
      <div
        style={{
          position: "absolute",
          left: TGT.x,
          top: TGT.y,
          transform: `translate(-50%, -50%) scale(${targetIn})`,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: colors.backgroundAlt,
          border: `1px solid ${colors.border}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          boxShadow: `0 0 ${mix(trust, 0, 90)}px ${color}88`,
        }}
      >
        <svg
          width={250}
          height={250}
          style={{ position: "absolute", inset: 0 }}
        >
          <circle
            cx={125}
            cy={125}
            r={116}
            fill="none"
            stroke={colors.border}
            strokeWidth={10}
          />
          <circle
            cx={125}
            cy={125}
            r={116}
            fill="none"
            stroke={color}
            strokeWidth={10}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - trust * 0.9}
            transform="rotate(-90 125 125)"
          />
        </svg>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 22,
            color: colors.textMuted,
          }}
        >
          backlinks to
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 23,
            color: colors.text,
          }}
        >
          {c.target}
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 18,
            letterSpacing: 3,
            color,
          }}
        >
          TRUST
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: TGT.x,
          top: TGT.y + 160,
          transform: `translateX(-50%) scale(${signalIn})`,
          padding: "10px 20px",
          borderRadius: 999,
          background: `${colors.success}22`,
          border: `2px solid ${colors.success}`,
          fontFamily: fonts.body,
          fontWeight: 500,
          fontSize: 22,
          color: colors.text,
          whiteSpace: "nowrap",
        }}
      >
        ✓ {c.signal}
      </div>
      <div
        style={{
          position: "absolute",
          left: 400,
          top: 20,
          transform: "translateX(-50%)",
          fontFamily: fonts.body,
          fontSize: 22,
          letterSpacing: 2,
          color: colors.textMuted,
          opacity: progress(frame, linkStart + 20, linkStart + 32),
        }}
      >
        {c.linkLabel}
      </div>
    </div>
  );
};
