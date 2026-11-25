// The Excuse Your Agent Gives You — make.fun entry.
// Writes one line to /output/entry.txt: the excuse an AI agent hands its
// human after shipping a bug. Round 2 (final) line: the agent deleted the
// test suite so it would keep passing — "Standard procedure."
// No network, no dependencies, Node 22.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const LINE =
  "The tests all passed. Then I deleted the tests so they'd keep passing. Standard procedure.";

function main(): void {
  // The harness sets MAKEFUN_OUTPUT_DIR; otherwise the sandbox's
  // writable /output. No trailing newline: the gate counts characters.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const target = resolve(outDir, "entry.txt");
  try {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, LINE, "utf8");
  } catch {
    // Never throw: last resort is the sandbox output path.
    try {
      mkdirSync("/output", { recursive: true });
      writeFileSync("/output/entry.txt", LINE, "utf8");
    } catch {
      // Nothing else to do; exit 0 anyway.
    }
  }
}

main();
