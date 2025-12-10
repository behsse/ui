import { Command } from "commander";
import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";

// Lire la version depuis package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(
  readFileSync(join(__dirname, "../package.json"), "utf-8")
);

const program = new Command();

program
  .name("behsseui")
  .description("CLI pour ajouter des composants behsseui dans vos projets")
  .version(packageJson.version);

// Ajouter les commandes
program.addCommand(init);
program.addCommand(add);

program.parse();
