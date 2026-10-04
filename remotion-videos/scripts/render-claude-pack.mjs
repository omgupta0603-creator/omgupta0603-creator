// Renders every clip of the ClaudeMarketing graphics pack to out/claude-marketing/.
// Usage: npm run render:claude            (all clips)
//        npm run render:claude -- CM03     (only ids starting with CM03)
import { execSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const filter = process.argv[2] ?? "CM";
const list = execSync("npx remotion compositions --quiet", { encoding: "utf8" })
  .split(/\s+/)
  .filter((id) => id.startsWith(filter) && id !== "CM00-Reel");

mkdirSync("out/claude-marketing", { recursive: true });
for (const id of list) {
  console.log(`Rendering ${id}…`);
  execSync(`npx remotion render ${id} out/claude-marketing/${id}.mp4`, {
    stdio: "inherit",
  });
}
