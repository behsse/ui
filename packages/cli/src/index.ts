import { Command } from "commander";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import chalk from "chalk";
import ora from "ora";
import https from "https";

const program = new Command();

// URL du registry des composants (GitHub raw)
const REGISTRY_URL = "https://raw.githubusercontent.com/behsse/ui/main/packages/components";

// Mapping des composants disponibles
const COMPONENTS_MAP: Record<string, string> = {
  Button: "Button.tsx",
  // Ajoutez d'autres composants ici au fur et à mesure
};

// Fonction pour télécharger un fichier depuis une URL
function downloadFile(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download: ${res.statusCode}`));
        return;
      }

      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(data);
      });
    }).on("error", reject);
  });
}

async function addComponent(componentName: string) {
  const spinner = ora(`Téléchargement du composant ${componentName}...`).start();

  try {
    // Vérifier si le composant existe
    if (!COMPONENTS_MAP[componentName]) {
      spinner.fail(
        chalk.red(`Le composant "${componentName}" n'existe pas.`)
      );
      console.log(
        chalk.yellow("\nComposants disponibles:"),
        Object.keys(COMPONENTS_MAP).join(", ")
      );
      process.exit(1);
    }

    const componentFileName = COMPONENTS_MAP[componentName];
    const componentUrl = `${REGISTRY_URL}/${componentFileName}`;

    // Télécharger le composant depuis le registry
    spinner.text = `Téléchargement depuis le registry...`;
    const componentContent = await downloadFile(componentUrl);

    // Créer le dossier ui dans le projet cible
    const targetDir = join(process.cwd(), "ui");
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true });
      spinner.text = `Création du dossier ui...`;
    }

    // Écrire le composant
    const targetComponentPath = join(targetDir, componentFileName);
    writeFileSync(targetComponentPath, componentContent, "utf-8");

    spinner.succeed(
      chalk.green(
        `Composant ${componentName} ajouté avec succès dans ./ui/${componentFileName}`
      )
    );

    console.log(
      chalk.cyan("\nVous pouvez maintenant l'importer dans votre projet:")
    );
    console.log(chalk.gray(`import { ${componentName} } from "./ui/${componentFileName.replace('.tsx', '')}";`));
  } catch (error) {
    spinner.fail(chalk.red("Erreur lors de l'installation du composant"));
    console.error(error);
    process.exit(1);
  }
}

program
  .name("behsseui")
  .description("CLI pour ajouter des composants behsseui dans vos projets")
  .version("0.0.1");

program
  .command("add <component>")
  .description("Ajouter un composant à votre projet")
  .action(addComponent);

program.parse();
