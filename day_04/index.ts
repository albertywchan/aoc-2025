import { parseInputAsGrid } from "../utils";

const DIRECTIONS = [
  { dr: 0, dc: 1 },
  { dr: 1, dc: 1 },
  { dr: 1, dc: 0 },
  { dr: 1, dc: -1 },
  { dr: 0, dc: -1 },
  { dr: -1, dc: -1 },
  { dr: -1, dc: 0 },
  { dr: -1, dc: 1 },
] as const;

function getAccessibleRolls(grid: string[][]) {
  if (!grid[0]) return [];
  const rows = grid.length;
  const cols = grid[0].length;

  const isValid = (r: number, c: number) =>
    r >= 0 && r < rows && c >= 0 && c < cols;

  const accessibleRolls: { r: number; c: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r]?.[c] !== "@") continue;
      const adjacentNeighbours = DIRECTIONS.filter(({ dr, dc }) => {
        const nr = r + dr;
        const nc = c + dc;
        return isValid(nr, nc) && grid[nr]?.[nc] === "@";
      }).length;
      if (adjacentNeighbours < 4) {
        accessibleRolls.push({ r, c });
      }
    }
  }
  return accessibleRolls;
}

function removeRolls(
  grid: string[][],
  rolls: { r: number; c: number }[]
): void {
  rolls.forEach(({ r, c }) => {
    const row = grid[r];
    if (row) {
      row[c] = "X";
    }
  });
}

async function partOne() {
  const grid = await parseInputAsGrid(import.meta.dir);
  const accessibleRolls = getAccessibleRolls(grid).length;
  console.log(accessibleRolls);
}

async function partTwo() {
  const grid = await parseInputAsGrid(import.meta.dir);
  let accessibleRolls: { r: number; c: number }[];
  let removedRolls = 0;
  do {
    accessibleRolls = getAccessibleRolls(grid);
    removedRolls += accessibleRolls.length;
    removeRolls(grid, accessibleRolls);
  } while (accessibleRolls.length > 0);
  console.log(removedRolls);
}

async function main() {
  await partOne();
  await partTwo();
}

await main();
