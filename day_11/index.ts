import { memoize } from "micro-memoize";
import { parseInputAsText } from "../utils";

async function partOne() {
  const list = await parseInputAsText(import.meta.dir);
  const graph = new Map<string, string[]>();
  for (const line of list) {
    const deviceAndOutputs = line.split(":");
    const device = deviceAndOutputs[0]?.trim();
    const outputs = deviceAndOutputs[1]?.trim().split(" ");
    if (!device || !outputs) continue;
    graph.set(device, outputs);
  }

  const countPaths = memoize(
    (currentDevice: string): number => {
      if (currentDevice === "out") return 1;
      const neighbours = graph.get(currentDevice);
      if (!neighbours) return 0;
      let numPaths = 0;
      for (const neighbour of neighbours) {
        numPaths += countPaths(neighbour);
      }
      return numPaths;
    },
    { maxSize: Number.MAX_SAFE_INTEGER }
  );

  const totalPaths = countPaths("you");
  console.log(totalPaths);
}

async function partTwo() {
  const list = await parseInputAsText(import.meta.dir);
  const graph = new Map<string, string[]>();
  for (const line of list) {
    const deviceAndOutputs = line.split(":");
    const device = deviceAndOutputs[0]?.trim();
    const outputs = deviceAndOutputs[1]?.trim().split(" ");
    if (!device || !outputs) continue;
    graph.set(device, outputs);
  }

  const countPaths = memoize(
    (currDevice: string, hasDAC: boolean, hasFFT: boolean): number => {
      if (currDevice === "out") return hasDAC && hasFFT ? 1 : 0;
      const neighbours = graph.get(currDevice);
      if (!neighbours) return 0;
      let numPaths = 0;
      const newHasDAC = hasDAC || currDevice === "dac";
      const newHasFFT = hasFFT || currDevice === "fft";
      for (const neighbour of neighbours) {
        numPaths += countPaths(neighbour, newHasDAC, newHasFFT);
      }
      return numPaths;
    },
    { maxSize: Number.MAX_SAFE_INTEGER }
  );

  const totalPaths = countPaths("svr", false, false);
  console.log(totalPaths);
}

async function main() {
  await partOne();
  await partTwo();
}

await main();
