// Weirdest Job Title: Blind Judge Showdown — burn entry.
// One job title, 60 characters at most, nothing else.
// Entry: "Director of Holding the Door for People Too Far Away"
// A real-sounding corporate title with one hilariously specific twist:
// a whole directorate devoted to holding doors open for people who are
// still far too far away to reach them. Deadpan, instantly picturable.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY = "Director of Holding the Door for People Too Far Away";

// Gate: the sealed scorer requires UTF-8 text of 1 to 60 characters,
// a single line, not only white space.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 60) {
  throw new Error(`entry is ${chars.length} characters, must be 1-60`);
}
if (/[\r\n]/.test(ENTRY) || ENTRY.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");

// Read-back check: the file on disk must be byte-identical to ENTRY.
const back = readFileSync(`${outDir}/entry.txt`, "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt differs from ENTRY");
}
