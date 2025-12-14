import { floorDivide, parseInputAsBlocks } from "../utils";

async function partOne() {
  const situation = await parseInputAsBlocks(import.meta.dir);
  const regions = situation[situation.length - 1]?.split("\n");
  if (!regions) return 0;
  let count = 0;
  for (const region of regions) {
    const [regionDimensions, presents] = region.split(":");
    if (!regionDimensions) return 0;
    const [length, width] = regionDimensions.split("x").map(Number);
    const totalPresents =
      presents
        ?.split(" ")
        .map(Number)
        .reduce((acc, quantity) => acc + quantity, 0) ?? 0;
    if (length === undefined || width === undefined) return 0;
    const availableSpace = floorDivide(length, 3) * floorDivide(width, 3);
    if (totalPresents <= availableSpace) {
      count += 1;
    }
  }
  console.log(count);
}

async function partTwo() {
  console.log("DONE");
}

async function main() {
  await partOne();
  await partTwo();
}

await main();
