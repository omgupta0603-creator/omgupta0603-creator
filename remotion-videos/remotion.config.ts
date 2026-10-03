/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// MP4 (H.264) by default. CRF: lower = higher quality / bigger file (H.264 range 1-51).
Config.setCodec("h264");
Config.setCrf(18);
Config.setPixelFormat("yuv420p");

// Optional: point Remotion at an existing Chrome Headless Shell / Chromium
// instead of letting it download one (useful offline or behind a firewall).
// Example: REMOTION_BROWSER_EXECUTABLE=/path/to/chrome-headless-shell npm run render
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
}
