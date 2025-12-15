const dayArg = Bun.argv[2];

if (!dayArg) {
  console.error("Usage: bun run create <day>");
  process.exit(1);
}

const dayNum = Number(dayArg);
if (Number.isNaN(dayNum) || dayNum < 1 || dayNum > Number(Bun.env.DAYS)) {
  console.error(`Day must be between 1 and ${Bun.env.DAYS}`);
  process.exit(1);
}

const dayFolder = `day_${String(dayNum).padStart(2, "0")}`;
const folderPath = `${import.meta.dir}/../${dayFolder}`;

const exampleFile = Bun.file(`${folderPath}/example.txt`);
if (await exampleFile.exists()) {
  console.log(`Folder '${dayFolder}' already exists`);
  process.exit(0);
}
await Bun.write(`${folderPath}/example.txt`, "");

const templatePath = `${import.meta.dir}/../template.ts`;
const templateFile = Bun.file(templatePath);
if (!(await templateFile.exists())) {
  console.error("Template not found");
  process.exit(1);
}
const templateContent = await templateFile.text();
await Bun.write(`${folderPath}/index.ts`, templateContent);

console.log(`Created '${dayFolder}'`);
