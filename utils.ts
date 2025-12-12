import { join } from "node:path";

export async function parseInputAsText(
  dirname: string,
  trim: boolean = true
): Promise<string[]> {
  const fileName = join(dirname, Bun.env.INPUT_FILE ?? "input.txt");
  const file = Bun.file(fileName);
  const text = await file.text();
  const lines = trim ? text.trim().split("\n") : text.split("\n");
  return lines;
}

export async function parseInputAsLine(dirname: string): Promise<string> {
  const lines = await parseInputAsText(dirname);
  if (!lines[0]) {
    process.exit(1);
  }
  return lines[0];
}

export async function parseInputAsGrid(dirname: string): Promise<string[][]> {
  const lines = await parseInputAsText(dirname);
  return lines.map((line) => line.split(""));
}

export async function parseInputAsHalves(
  dirname: string,
  trim: boolean = true
): Promise<[string, string]> {
  const fileName = join(dirname, Bun.env.INPUT_FILE ?? "input.txt");
  const file = Bun.file(fileName);
  const text = await file.text();
  const lines = trim ? text.trim().split("\n\n") : text.split("\n\n");
  return lines as [string, string];
}

export function floorDivide(dividend: number, divisor: number): number {
  return Math.floor(dividend / divisor);
}
