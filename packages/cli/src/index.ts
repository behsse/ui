import { Command } from "commander";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";

const program = new Command();

program
  .name("behsseui")
  .description("CLI pour ajouter des composants behsseui dans vos projets")
  .version("0.0.2");

// Ajouter les commandes
program.addCommand(init);
program.addCommand(add);

program.parse();
