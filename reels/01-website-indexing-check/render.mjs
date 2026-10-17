// Render reel.html frame by frame and encode to MP4.
//   node render.mjs                 -> out/reel-silent.mp4
//   node render.mjs --stills 1,8,15 -> out/still-<t>.png for quick checks
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, "out");
mkdirSync(out, { recursive: true });
const FPS = 30;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto("file://" + path.join(here, "reel.html") + "?render");
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);
const frame = await page.$("#frame");

const stillsArg = process.argv.indexOf("--stills");
if (stillsArg > -1) {
  for (const t of process.argv[stillsArg + 1].split(",").map(Number)) {
    await page.evaluate(t => window.seek(t), t);
    await frame.screenshot({ path: path.join(out, `still-${t}.png`) });
  }
  await browser.close();
  process.exit(0);
}

const duration = await page.evaluate(() => window.DURATION);
const total = Math.round(duration * FPS);
const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
  "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-r", String(FPS),
  path.join(out, "reel-silent.mp4")], { stdio: ["pipe", "inherit", "inherit"] });

for (let i = 0; i < total; i++) {
  await page.evaluate(t => window.seek(t), i / FPS);
  const buf = await frame.screenshot({ type: "jpeg", quality: 95 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once("drain", r));
  if (i % 150 === 0) console.log(`frame ${i}/${total}`);
}
ff.stdin.end();
await new Promise(r => ff.on("close", r));
await browser.close();
console.log("done");
