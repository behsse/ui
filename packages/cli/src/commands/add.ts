import { Command } from "commander";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import chalk from "chalk";
import ora from "ora";
import https from "https";
import { isProjectInitialized, readConfig } from "../utils/config.js";

// URL du registry des composants (GitHub raw)
const REGISTRY_URL =
  "https://raw.githubusercontent.com/behsse/ui/main/packages/components";

// Mapping des composants disponibles et leurs dépendances
const COMPONENTS_MAP: Record<
  string,
  { file: string; dependencies?: Array<{ file: string; subdir?: string }> }
> = {
  Button: {
    file: "Button.tsx",
    dependencies: [
      { file: "internals/Slot.tsx", subdir: "internals" }, // Slot doit être dans internals/
    ],
  },
  // Ajoutez d'autres composants ici au fur et à mesure
};

// Fonction pour télécharger un fichier depuis une URL
function downloadFile(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
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
      })
      .on("error", reject);
  });
}

async function addComponent(componentName: string) {
  // Vérifier si le projet est initialisé
  if (!isProjectInitialized()) {
    console.log(
      chalk.red(
        "\n❌ Le projet n'est pas initialisé. Exécutez d'abord 'behsseui init'.\n"
      )
    );
    process.exit(1);
  }

  const spinner = ora(`Téléchargement du composant ${componentName}...`).start();

  try {
    // Vérifier si le composant existe
    if (!COMPONENTS_MAP[componentName]) {
      spinner.fail(chalk.red(`Le composant "${componentName}" n'existe pas.`));
      console.log(
        chalk.yellow("\nComposants disponibles:"),
        Object.keys(COMPONENTS_MAP).join(", ")
      );
      process.exit(1);
    }

    const componentConfig = COMPONENTS_MAP[componentName];
    const config = readConfig();
    const targetDir = join(process.cwd(), config.componentsDir);

    // Créer le dossier principal si nécessaire
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true });
    }

    // Télécharger les dépendances d'abord
    if (componentConfig.dependencies && componentConfig.dependencies.length > 0) {
      spinner.text = `Téléchargement des dépendances...`;

      for (const dep of componentConfig.dependencies) {
        const depUrl = `${REGISTRY_URL}/${dep.file}`;
        const depContent = await downloadFile(depUrl);

        // Créer le sous-dossier si spécifié
        const depTargetDir = dep.subdir
          ? join(targetDir, dep.subdir)
          : targetDir;

        if (!existsSync(depTargetDir)) {
          mkdirSync(depTargetDir, { recursive: true });
        }

        // Extraire le nom du fichier depuis le path
        const depFileName = dep.file.split('/').pop()!;
        const depTargetPath = join(depTargetDir, depFileName);
        writeFileSync(depTargetPath, depContent, "utf-8");
      }
    }

    // Télécharger le composant principal
    const componentUrl = `${REGISTRY_URL}/${componentConfig.file}`;
    spinner.text = `Téléchargement de ${componentName}...`;
    const componentContent = await downloadFile(componentUrl);

    // Écrire le composant principal
    const targetComponentPath = join(targetDir, componentConfig.file);
    writeFileSync(targetComponentPath, componentContent, "utf-8");

    spinner.succeed(
      chalk.green(
        `✅ Composant ${componentName} ajouté avec succès dans ${config.componentsDir}/`
      )
    );

    console.log(
      chalk.cyan("\n📦 Vous pouvez maintenant l'importer dans votre projet:")
    );
    console.log(
      chalk.gray(
        `import { ${componentName} } from "${config.componentsDir}/${componentConfig.file.replace(".tsx", "")}";`
      )
    );
    console.log();
  } catch (error) {
    spinner.fail(chalk.red("❌ Erreur lors de l'installation du composant"));
    console.error(error);
    process.exit(1);
  }
}

export const add = new Command()
  .name("add")
  .description("Ajouter un composant à votre projet")
  .argument("<component>", "Nom du composant à ajouter")
  .action(addComponent);
