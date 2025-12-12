const useExample = process.argv.includes("--example");

if (useExample) {
  Bun.env.INPUT_FILE = "example.txt";
}

const dayArg = process.argv[2];

if (!dayArg) {
  console.error("Usage: bun run day <number>");
  console.error("Example: bun run day 1");
  process.exit(1);
}

if (dayArg === "all") {
  console.log("Running all days...\n");

  for (let day = 1; day <= Number(Bun.env.DAYS); day++) {
    const dayFolder = `day_${String(day).padStart(2, "0")}`;

    try {
      console.log(`--- Day ${day} ---`);
      await import(`./${dayFolder}/index.ts`);
      console.log(); // Empty line between days
    } catch (error) {
      console.error(`Error running ${dayFolder}:`, error);
      // Continue to next day instead of exiting
    }
  }

  process.exit(0);
}

const dayFolder = `day_${dayArg.padStart(2, "0")}`;

try {
  await import(`./${dayFolder}/index.ts`);
} catch (error) {
  console.error(`Error running ${dayFolder}:`, error);
  process.exit(1);
}
