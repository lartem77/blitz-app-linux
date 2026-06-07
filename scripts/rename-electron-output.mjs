import { rename, rm } from "node:fs/promises";
import { existsSync } from "node:fs";

const outputs = [
  ["out/electron/main.js", "out/electron/main.cjs"],
  ["out/electron/preload.js", "out/electron/preload.cjs"]
];

for (const [from, to] of outputs) {
  if (existsSync(to)) {
    await rm(to);
  }
  if (existsSync(from)) {
    await rename(from, to);
  }
}
