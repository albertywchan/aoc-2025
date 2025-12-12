import { parseInputAsHalves } from "../utils";

function mergeRanges(ranges: [number, number][]) {
  ranges.sort((a, b) => a[0] - b[0]);
  const newRanges: [number, number][] = [ranges[0] ?? [0, 0]];
  for (let i = 1; i < ranges.length; i++) {
    const [prevStart, prevEnd] = newRanges[newRanges.length - 1] ?? [0, 0];
    const [currStart, currEnd] = ranges[i] ?? [0, 0];
    if (currStart <= prevEnd) {
      newRanges.pop();
      newRanges.push([prevStart, Math.max(prevEnd, currEnd)]);
    } else {
      newRanges.push([currStart, currEnd]);
    }
  }
  return newRanges;
}

async function partOne() {
  const [rangesInput, idsInput] = await parseInputAsHalves(import.meta.dir);
  let ranges = rangesInput
    .split("\n")
    .map((range) => range.split("-").map(Number) as [number, number]);
  ranges = mergeRanges(ranges);
  const ids = idsInput.split("\n").map(Number);
  const isFresh = (id: number) =>
    ranges.some(([start, end]) => id >= start && id <= end);
  const freshIds = ids.filter((id) => isFresh(id)).length;
  console.log(freshIds);
}

async function partTwo() {
  const [rangesInput, _] = await parseInputAsHalves(import.meta.dir);
  let ranges = rangesInput
    .split("\n")
    .map((range) => range.split("-").map(Number) as [number, number]);
  ranges = mergeRanges(ranges);
  const freshIds = ranges.reduce(
    (acc, [start, end]) => acc + (end - start + 1),
    0
  );
  console.log(freshIds);
}

async function main() {
  await partOne();
  await partTwo();
}

await main();
