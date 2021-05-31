import { Command } from "commander/esm.mjs";
import { SortFiles } from "./sort.js";

const program = new Command();

program.requiredOption("-s, --source <type>", "Source folder").option("-o, --output <type>", "Output folder", "./dist");

program.parse(process.argv);

const { source, output } = program.opts();

// === no __dirname and no __filename fix in ESM
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
// ===

try {
  const sorting = new SortFiles(output);
  await sorting.readFolder(resolve(__dirname, source));
} catch (error) {
  console.log(error.message);
  process.exit(1);
}

console.log("Sorting completed!");
