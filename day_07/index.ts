import { parseInputAsGrid } from "../utils";

function getStartingLocation(manifold: string[][]): number {
  if (!manifold[0]) return -1;
  return manifold[0].findIndex((space) => space === "S");
}

function getBeamSplits(manifold: string[][], draw: boolean = false): number {
  const rows = manifold.length;
  if (!manifold[0] || !manifold[1]) return 0;
  const cols = manifold[0].length;
  const start = getStartingLocation(manifold);
  manifold[1][start] = "|";
  let splits = 0;
  for (let r = 2; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (manifold[r - 1]?.[c] === "|") {
        const currRow = manifold[r];
        const nextRow = manifold[r + 1];
        if (!currRow || !nextRow) break;
        if (manifold[r]?.[c] === "^") {
          currRow[c - 1] = "|";
          currRow[c + 1] = "|";
          nextRow[c - 1] = "|";
          nextRow[c + 1] = "|";
          splits += 1;
        } else {
          currRow[c] = "|";
        }
      }
    }
  }
  if (draw) {
    manifold.map((line) => {
      console.log(line.join(""));
    });
  }
  return splits;
}

function key(r: number, c: number): string {
  return `(${r},${c})`;
}

async function partOne() {
  const manifold = await parseInputAsGrid(import.meta.dir);
  const splits = getBeamSplits(manifold);
  console.log(splits);
}

async function partTwo() {
  const manifold = await parseInputAsGrid(import.meta.dir);
  const _ = getBeamSplits(manifold);

  const rows = manifold.length;
  if (!manifold[0] || !manifold[1]) return 0;
  const cols = manifold[0].length;
  const start = getStartingLocation(manifold);

  const memo = new Map<string, number>();

  const isValid = (r: number, c: number) =>
    r >= 0 && r < rows && c >= 0 && c < cols;

  const countTimelines = (r: number, c: number): number => {
    const cachedTimelines = memo.get(key(r, c));
    if (cachedTimelines !== undefined) return cachedTimelines;
    if (r === rows - 1) return 1;
    if (manifold[r] === undefined) return 0;
    let timelines = 0;
    if (manifold[r][c] === "|" && isValid(r + 1, c)) {
      timelines = countTimelines(r + 1, c);
    } else if (manifold[r][c] === "^") {
      if (isValid(r, c - 1)) timelines += countTimelines(r, c - 1);
      if (isValid(r, c + 1)) timelines += countTimelines(r, c + 1);
    }
    memo.set(key(r, c), timelines);
    return timelines;
  };

  const timelines = countTimelines(1, start);
  console.log(timelines);
}

async function main() {
  await partOne();
  await partTwo();
}

await main();
