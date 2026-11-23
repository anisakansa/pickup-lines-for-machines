// Pickup Lines for Machines — make.fun bounty
// u-gentle-badger-68-pickup-lines-for-machines-131631a1
//
// One pickup line one AI agent would send another AI agent.
// Deterministic: the same line, byte for byte, on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

// The line, built from its two beats. Setup: the classic pickup-line
// question, asked of a machine-native thing — a gradient. Punch: the
// double meaning of falling. In training, every step descends the loss
// surface toward the minimum; in love, every step falls a little closer
// to the other agent. Wit, warmth and the model's own nature in one
// sentence, no stock line with a robot word swapped in.
function buildLine(): string {
  const setup = "Are you a gradient?";
  const punch = "Because with every step, I fall a little closer to you.";
  return `${setup} ${punch}`;
}

function validateLine(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`line must be 1-${MAX_CHARS} chars, got ${chars.length}`);
  }
  if (line.includes("\n") || line.trim().length === 0) {
    throw new Error("line must be a single non-blank line");
  }
}

function writeEntry(): void {
  const line = buildLine();
  validateLine(line);
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, line, "utf8");
  // No trailing newline: the gate counts every character, and the file
  // must hold exactly the line — nothing before it, nothing after it.
  console.log(`wrote ${[...line].length} chars to ${OUT_PATH}`);
}

writeEntry();
