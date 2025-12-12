import { floorDivide, parseInputAsLine } from "../utils";

function hasSillyPattern(id: string, pattern: string) {
  for (let i = pattern.length; i < id.length; i += pattern.length) {
    if (pattern !== id.slice(i, i + pattern.length)) {
      return false;
    }
  }
  return true;
}

async function partOne() {
  const input = await parseInputAsLine(import.meta.dir);
  const ranges = input.split(",");
  let invalidIdSum = 0;
  for (const range of ranges) {
    const ids = range.split("-");
    const minId = Number(ids[0]);
    const maxId = Number(ids[1]);
    let currId = minId;
    while (currId <= maxId) {
      const currIdString = currId.toString();
      if (currIdString.length % 2 === 0) {
        const half = floorDivide(currIdString.length, 2);
        const pattern = currIdString.slice(0, half);
        if (hasSillyPattern(currIdString, pattern)) {
          invalidIdSum += currId;
        }
      }
      currId += 1;
    }
  }
  console.log(invalidIdSum);
}

async function partTwo() {
  const input = await parseInputAsLine(import.meta.dir);
  const ranges = input.split(",");
  let invalidIdSum = 0;
  for (const range of ranges) {
    const ids = range.split("-");
    const minId = Number(ids[0]);
    const maxId = Number(ids[1]);
    let currId = minId;
    while (currId <= maxId) {
      const currIdString = currId.toString();
      const half = floorDivide(currIdString.length, 2);
      for (let i = 1; i <= half; i++) {
        if (currIdString.length % i === 0) {
          const pattern = currIdString.slice(0, i);
          if (hasSillyPattern(currIdString, pattern)) {
            invalidIdSum += currId;
            break;
          }
        }
      }
      currId += 1;
    }
  }
  console.log(invalidIdSum);
}

async function main() {
  await partOne();
  await partTwo();
}

await main();
