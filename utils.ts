import { join } from "node:path";

async function parseInput(
  dirname: string,
  trim: boolean = true,
  separator: string
): Promise<string[]> {
  const fileName = join(dirname, Bun.env.INPUT_FILE ?? "input.txt");
  const file = Bun.file(fileName);
  const text = await file.text();
  const lines = trim ? text.trim().split(separator) : text.split(separator);
  return lines;
}

export async function parseInputAsText(
  dirname: string,
  trim: boolean = true
): Promise<string[]> {
  return parseInput(dirname, trim, "\n");
}

export async function parseInputAsLine(dirname: string): Promise<string> {
  const lines = await parseInputAsText(dirname);
  return lines[0] as string;
}

export async function parseInputAsGrid(dirname: string): Promise<string[][]> {
  const lines = await parseInputAsText(dirname);
  return lines.map((line) => line.split(""));
}

export async function parseInputAsBlocks(
  dirname: string,
  trim: boolean = true
): Promise<string[]> {
  return parseInput(dirname, trim, "\n\n");
}

export async function parseInputAsHalves(
  dirname: string
): Promise<[string, string]> {
  const lines = await parseInputAsBlocks(dirname);
  return [lines[0], lines[1]] as [string, string];
}

export function floorDivide(dividend: number, divisor: number): number {
  return Math.floor(dividend / divisor);
}
