import { floorDivide, parseInputAsText } from "../utils";

async function partOne() {
  const instructions = await parseInputAsText(import.meta.dir);
  let password = 0;
  let position = 50;
  for (const instruction of instructions) {
    const direction = instruction.charAt(0);
    let distance = Number(instruction.slice(1));
    distance %= 100;
    position = direction === "L" ? position - distance : position + distance;
    position = (position + 100) % 100;
    if (position === 0) {
      password += 1;
    }
  }
  console.log(password);
}

async function partTwo() {
  const input = await parseInputAsText(import.meta.dir);
  let password = 0;
  let position = 50;
  for (const instruction of input) {
    const direction = instruction.charAt(0);
    let distance = Number(instruction.slice(1));
    password += floorDivide(distance, 100);
    distance %= 100;
    if (direction === "L") {
      if (position - distance > 0) {
        position -= distance;
      } else {
        if (position !== 0) {
          password += 1;
        }
        position = (position - distance + 100) % 100;
      }
    } else {
      if (position + distance < 100) {
        position += distance;
      } else {
        password += 1;
        position = position + distance - 100;
      }
    }
  }
  console.log(password);
}

async function main() {
  await partOne();
  await partTwo();
}

await main();
