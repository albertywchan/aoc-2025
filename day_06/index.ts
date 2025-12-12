import { parseInputAsText } from "../utils";

function evaluateProblem(numbers: number[], operation: string) {
  return numbers.reduce(
    (acc, number) => {
      if (operation === "+") {
        acc += number;
      } else {
        acc *= number;
      }
      return acc;
    },
    operation === "+" ? 0 : 1
  );
}

async function partOne() {
  const worksheet = await parseInputAsText(import.meta.dir);
  const operators = worksheet.pop()?.trim().split(/\s+/);
  const formattedWorksheet = worksheet.map((line) => line.trim().split(/\s+/));
  const rows = formattedWorksheet.length;
  const cols = formattedWorksheet[0]?.length;
  if (!operators || !cols) return 0;
  let grandTotal = 0;
  for (let c = 0; c < cols; c++) {
    const numbers = [];
    for (let r = 0; r < rows; r++) {
      if (!formattedWorksheet[r]) break;
      numbers.push(Number(formattedWorksheet[r]?.[c]));
    }
    grandTotal += evaluateProblem(numbers, operators[c] ?? "+");
  }
  console.log(grandTotal);
}

async function partTwo() {
  const worksheet = await parseInputAsText(import.meta.dir, false);
  const operators = worksheet.pop();
  if (!operators) return 0;
  const operatorPositions = Array.from(operators)
    .map((char, i) => (char === "+" || char === "*" ? i : -1))
    .filter((position) => position !== -1);
  const rows = worksheet.length;
  let grandTotal = 0;
  operatorPositions.forEach((position, i) => {
    const start = position;
    const end = operatorPositions[i + 1] ?? operators.length;
    const numbers = [];
    for (let c = start; c < end; c++) {
      let number = "";
      for (let r = 0; r < rows; r++) {
        if (!worksheet[r]) break;
        number += worksheet[r]?.[c];
      }
      number = number.trim();
      if (number) {
        numbers.push(Number(number));
      }
    }
    grandTotal += evaluateProblem(numbers, operators[position] ?? "+");
  });
  console.log(grandTotal);
}

async function main() {
  await partOne();
  await partTwo();
}

await main();
