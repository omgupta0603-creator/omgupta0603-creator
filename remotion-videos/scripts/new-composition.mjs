#!/usr/bin/env node
// Scaffold a new composition from src/compositions/_Template.
// Usage: npm run new -- MyVideo
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const name = process.argv[2];

if (!name || !/^[A-Z][A-Za-z0-9]*$/.test(name)) {
  console.error(
    "Usage: npm run new -- MyVideo   (PascalCase, letters/digits only)",
  );
  process.exit(1);
}

const camel = name[0].toLowerCase() + name.slice(1);
const src = path.join(root, "src/compositions/_Template");
const dest = path.join(root, "src/compositions", name);
const rootFile = path.join(root, "src/Root.tsx");

if (fs.existsSync(dest)) {
  console.error(`src/compositions/${name} already exists.`);
  process.exit(1);
}

fs.mkdirSync(dest, { recursive: true });
for (const file of fs.readdirSync(src)) {
  const content = fs
    .readFileSync(path.join(src, file), "utf8")
    .replaceAll("Template", name)
    .replaceAll("template", camel);
  fs.writeFileSync(path.join(dest, file.replace("Template", name)), content);
}

let rootSrc = fs.readFileSync(rootFile, "utf8");
const importMarker = "// @new-composition-imports";
const jsxMarker = "{/* @new-compositions";
if (!rootSrc.includes(importMarker) || !rootSrc.includes(jsxMarker)) {
  console.error(
    "Markers missing in src/Root.tsx; register the composition manually.",
  );
  process.exit(1);
}
rootSrc = rootSrc.replace(
  importMarker,
  `import { ${name}, ${camel}Schema } from "./compositions/${name}";\n${importMarker}`,
);
rootSrc = rootSrc.replace(
  jsxMarker,
  `<Composition
        id="${name}"
        component={${name}}
        schema={${camel}Schema}
        defaultProps={{
          title: "${name}",
          subtitle: "Edit me in src/compositions/${name}",
          durationInSeconds: 5,
        }}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={VIDEO.fps}
        durationInFrames={1}
        calculateMetadata={({ props }) => ({
          durationInFrames: secondsToFrames(props.durationInSeconds, VIDEO.fps),
        })}
      />
      ${jsxMarker}`,
);
fs.writeFileSync(rootFile, rootSrc);

console.log(
  `Created src/compositions/${name} and registered composition "${name}".`,
);
console.log(
  `Preview: npm run dev    Render: npx remotion render ${name} out/${name}.mp4`,
);
