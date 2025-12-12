import { parseInputAsText } from "../utils";

const PAIRS = 1000 as const;

type DistancesAndCircuits = {
  distances: Array<{ box1: number; box2: number; distance: number }>;
  circuits: Map<number, number>;
};

function getDistance(position1: string, position2: string): number {
  const [x1, y1, z1] = position1.split(",").map(Number);
  const [x2, y2, z2] = position2.split(",").map(Number);
  if (
    x1 === undefined ||
    x2 === undefined ||
    y1 === undefined ||
    y2 === undefined ||
    z1 === undefined ||
    z2 === undefined
  )
    return 0;
  return (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2;
}

function setupDistancesAndCircuits(positions: string[]): DistancesAndCircuits {
  const distances: Array<{ box1: number; box2: number; distance: number }> = [];
  const circuits = new Map<number, number>();

  for (let i = 0; i < positions.length; i++) {
    circuits.set(i, i);
    for (let j = 0; j < i; j++) {
      distances.push({
        box1: i,
        box2: j,
        distance: getDistance(positions[i] ?? "", positions[j] ?? ""),
      });
    }
  }

  distances.sort((a, b) => b.distance - a.distance);
  return { distances, circuits };
}

function mergeCircuits(
  circuits: Map<number, number>,
  circuit1: number,
  circuit2: number
): void {
  const oldCircuit = Math.min(circuit1, circuit2);
  const newCircuit = Math.max(circuit1, circuit2);
  for (const [box, circuit] of circuits.entries()) {
    if (circuit === oldCircuit) {
      circuits.set(box, newCircuit);
    }
  }
}

async function partOne() {
  const positions = await parseInputAsText(import.meta.dir);
  const { distances, circuits } = setupDistancesAndCircuits(positions);

  let numPairs = 0;
  while (numPairs < PAIRS) {
    const popped = distances.pop();
    if (!popped) continue;
    const { box1, box2 } = popped;
    numPairs += 1;
    const circuit1 = circuits.get(box1);
    const circuit2 = circuits.get(box2);
    if (circuit1 === undefined || circuit2 === undefined) continue;
    if (circuit1 !== circuit2) mergeCircuits(circuits, circuit1, circuit2);
  }

  const circuitSizes = new Map<number, number>();
  for (const circuit of circuits.values()) {
    circuitSizes.set(circuit, (circuitSizes.get(circuit) ?? 0) + 1);
  }
  const largestCircuits = Array.from(circuitSizes.values())
    .sort((a, b) => b - a)
    .slice(0, 3);
  const output = largestCircuits.reduce((acc, size) => acc * size, 1);
  console.log(output);
}

async function partTwo() {
  const positions = await parseInputAsText(import.meta.dir);
  const { distances, circuits } = setupDistancesAndCircuits(positions);

  let numPairs = positions.length;
  let prevBoxes = [0, 0];
  while (numPairs > 1) {
    const popped = distances.pop();
    if (!popped) continue;
    const { box1, box2 } = popped;
    const circuit1 = circuits.get(box1);
    const circuit2 = circuits.get(box2);
    if (circuit1 === undefined || circuit2 === undefined) continue;
    if (circuit1 !== circuit2) {
      mergeCircuits(circuits, circuit1, circuit2);
      prevBoxes = [box1, box2];
      numPairs -= 1;
    }
  }

  const x1 = positions[prevBoxes[0] ?? 0]?.split(",").map(Number)[0] ?? 1;
  const x2 = positions[prevBoxes[1] ?? 0]?.split(",").map(Number)[0] ?? 1;
  const output = x1 * x2;
  console.log(output);
}

async function main() {
  await partOne();
  await partTwo();
}

await main();
