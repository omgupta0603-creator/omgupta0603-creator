// Renders the ClaudeMarketing graphics pack, one MP4 per clip.
// Usage: npm run render:claude              Hinglish clips → out/claude-marketing/
//        npm run render:claude -- en        English clips  → out/claude-marketing-en/
//        npm run render:claude -- CME08     only ids starting with CME08
import { execSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const arg = process.argv[2] ?? "hi";
const prefix = arg === "hi" ? "CM" : arg === "en" ? "CME" : arg;
const english = prefix.startsWith("CME");
const outDir = english ? "out/claude-marketing-en" : "out/claude-marketing";

const list = execSync("npx remotion compositions --quiet", { encoding: "utf8" })
  .split(/\s+/)
  .filter(
    (id) =>
      id.startsWith(prefix) &&
      id.startsWith("CME") === english &&
      !id.endsWith("00-Reel"),
  );

mkdirSync(outDir, { recursive: true });
for (const id of list) {
  console.log(`Rendering ${id}…`);
  execSync(`npx remotion render ${id} ${outDir}/${id}.mp4`, {
    stdio: "inherit",
  });
}
