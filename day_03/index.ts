import { parseInputAsText } from "../utils";

function getMaxJoltage(batteries: number[], numDigits: number): number {
  let maxJoltage = "";
  let count = 0;
  while (count < numDigits) {
    const joltage = Math.max(
      ...batteries.slice(0, batteries.length - (numDigits - count) + 1)
    );
    const maxIndex = batteries.indexOf(joltage);
    batteries = batteries.slice(maxIndex + 1);
    maxJoltage += joltage;
    count += 1;
  }
  return Number(maxJoltage);
}

async function partOne() {
  const banks = await parseInputAsText(import.meta.dir);
  let totalJoltage = 0;
  for (const bank of banks) {
    const batteries = bank.split("").map(Number);
    const joltage = Math.max(...batteries);
    const index = batteries.indexOf(joltage);
    if (index === batteries.length - 1) {
      totalJoltage += Math.max(...batteries.slice(0, index)) * 10 + joltage;
    } else {
      totalJoltage += joltage * 10 + Math.max(...batteries.slice(index + 1));
    }
  }
  console.log(totalJoltage);
}

async function partTwo() {
  const banks = await parseInputAsText(import.meta.dir);
  let totalJoltage = 0;
  for (const bank of banks) {
    const batteries = bank.split("").map(Number);
    totalJoltage += getMaxJoltage(batteries, 12);
  }
  console.log(totalJoltage);
}

async function main() {
  await partOne();
  await partTwo();
}

await main();
