const useExample = Bun.argv.includes("--example");

if (useExample) {
  Bun.env.INPUT_FILE = "example.txt";
}

const dayArg = Bun.argv[2];

if (!dayArg) {
  console.error("Usage: bun run day <number>");
  console.error("Example: bun run day 1");
  process.exit(1);
}

const green = (text: string) => `\x1b[1m\x1b[32m${text}\x1b[0m`;
const blue = (text: string) => `\x1b[1m\x1b[34m${text}\x1b[0m`;

if (dayArg === "all") {
  for (let day = 1; day <= Number(Bun.env.DAYS); day++) {
    const dayFolder = `day_${String(day).padStart(2, "0")}`;
    try {
      console.log(blue(`===== Day ${day} =====`));
      const start = Bun.nanoseconds();
      await import(`../${dayFolder}/index.ts`);
      const elapsed = (Bun.nanoseconds() - start) / 1_000_000;
      console.log(green(`Completed in ${elapsed.toFixed(0)}ms`));
      console.log();
    } catch (error) {
      console.error(`Error running ${dayFolder}:`, error);
    }
  }
  process.exit(0);
}

const dayFolder = `day_${dayArg.padStart(2, "0")}`;

try {
  console.log(blue(`===== Day ${Number(dayArg)} =====`));
  const start = Bun.nanoseconds();
  await import(`../${dayFolder}/index.ts`);
  const elapsed = (Bun.nanoseconds() - start) / 1_000_000;
  console.log(green(`Completed in ${elapsed.toFixed(0)}ms`));
} catch (error) {
  console.error(`Error running ${dayFolder}:`, error);
  process.exit(1);
}
