/** biome-ignore-all lint/suspicious/noExplicitAny: glpk.js does not have type definitions */
import GLPK from "glpk.js";
import { parseInputAsText } from "../utils";

type Configuration = {
  states: boolean[];
  pressed: Set<number>;
};

function toDiagram(states: boolean[]): string {
  return states.map((state) => (state ? "#" : ".")).join("");
}

function pressButtons(states: boolean[], button: number[]): boolean[] {
  const newStates = [...states];
  for (const toggle of button) {
    newStates[toggle] = !newStates[toggle];
  }
  return newStates;
}

function getPressesForPartOne(
  targetDiagram: string,
  buttons: number[][]
): number {
  const initialStates: boolean[] = Array(targetDiagram.length).fill(false);
  const initialPressed = new Set<number>();
  const queue: Configuration[] = [
    { states: initialStates, pressed: initialPressed },
  ];
  const visited = new Set<string>([toDiagram(initialStates)]);

  while (queue.length > 0) {
    const curr = queue.shift();
    if (!curr) break;
    const { states: currStates, pressed: currPressed } = curr;
    const currDiagram = toDiagram(currStates);

    if (currDiagram === targetDiagram) return currPressed.size;

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      if (!currPressed.has(i) && button !== undefined) {
        const newStates = pressButtons(currStates, button);
        const newPressed = new Set<number>(currPressed).add(i);
        const newDiagram = toDiagram(newStates);
        if (!visited.has(newDiagram)) {
          queue.push({ states: newStates, pressed: newPressed });
        }
      }
    }
  }
  return -1;
}

async function getPressesForPartTwo(
  glpk: any,
  joltages: number[],
  buttons: number[][]
): Promise<number> {
  // coef: 1.0 = minimize sum
  const variables = buttons.map((_, i) => ({ name: `button_${i}`, coef: 1.0 }));
  const constraints = [];
  for (let joltageIdx = 0; joltageIdx < joltages.length; joltageIdx++) {
    const requirement = joltages[joltageIdx];
    const buttonVariables = [];
    for (let buttonIdx = 0; buttonIdx < buttons.length; buttonIdx++) {
      const button = buttons[buttonIdx];
      if (!button) continue;
      if (button.includes(joltageIdx)) {
        buttonVariables.push({ name: `button_${buttonIdx}`, coef: 1.0 });
      }
    }
    if (requirement !== 0 && buttonVariables.length === 0) return 0;
    constraints.push({
      name: `joltage_${joltageIdx}`,
      vars: buttonVariables,
      bnds: { type: glpk.GLP_FX, ub: requirement, lb: requirement }, // type: glpk.GLP_FX = equality
    });
  }

  const lp = {
    objective: {
      direction: glpk.GLP_MIN,
      vars: variables,
    },
    subjectTo: constraints,
    generals: buttons.map((_, i) => `button_${i}`),
  };

  const solution = glpk.solve(lp);
  return solution.result.z;
}

async function partOne() {
  const manual = await parseInputAsText(import.meta.dir);
  let totalPresses = 0;
  for (const machine of manual) {
    let [diagram, schematics] = machine.split("]");
    diagram = diagram?.slice(1).trim();
    schematics = schematics?.split("{")[0]?.trim();
    const buttons = schematics?.split(" ").map((button) =>
      button
        .slice(1, button.length - 1)
        .split(",")
        .map(Number)
    );
    if (!diagram || !buttons) continue;
    totalPresses += getPressesForPartOne(diagram, buttons);
  }
  console.log(totalPresses);
}

async function partTwo() {
  const glpk = GLPK();
  const manual = await parseInputAsText(import.meta.dir);
  let totalPresses = 0;
  for (const machine of manual) {
    let [schematics, requirements] = machine.split("{");
    schematics = schematics?.split("]")[1]?.trim();
    const buttons = schematics?.split(" ").map((button) =>
      button
        .slice(1, button.length - 1)
        .split(",")
        .map(Number)
    );
    requirements = requirements?.slice(0, requirements.length - 1).trim();
    const joltages = requirements?.split(",").map(Number);
    if (!buttons || !joltages) continue;
    totalPresses += await getPressesForPartTwo(glpk, joltages, buttons);
  }
  console.log(totalPresses);
}

async function main() {
  await partOne();
  await partTwo();
}

await main();
