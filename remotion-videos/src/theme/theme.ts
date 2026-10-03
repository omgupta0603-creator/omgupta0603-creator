import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";

// Fonts are loaded once at module level. Remotion waits for them before
// rendering a frame, so text never flashes in a fallback font.
const inter = loadInter("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});
const spaceGrotesk = loadSpaceGrotesk("normal", {
  weights: ["500", "700"],
  subsets: ["latin"],
});

export const fonts = {
  display: spaceGrotesk.fontFamily,
  body: inter.fontFamily,
} as const;

export const colors = {
  background: "#070B1A",
  backgroundAlt: "#0F1631",
  surface: "rgba(255, 255, 255, 0.06)",
  border: "rgba(255, 255, 255, 0.12)",
  text: "#F5F7FF",
  textMuted: "#A3ADCF",
  primary: "#6C5CFF",
  secondary: "#00D1FF",
  accent: "#FF4D8D",
  warm: "#FFB547",
  success: "#2EE6A6",
  danger: "#FF5A5F",
} as const;

export const gradients = {
  brand: `linear-gradient(120deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
  hot: `linear-gradient(120deg, ${colors.accent} 0%, ${colors.warm} 100%)`,
} as const;

/** Type scale in px, tuned for 1920x1080. Scale with `useScale()` for other sizes. */
export const typeScale = {
  hero: 148,
  h1: 104,
  h2: 72,
  h3: 48,
  body: 34,
  caption: 24,
} as const;

export const radii = {
  sm: 12,
  md: 24,
  lg: 40,
} as const;
