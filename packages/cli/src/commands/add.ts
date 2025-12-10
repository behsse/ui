import { Command } from "commander";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import chalk from "chalk";
import ora from "ora";
import https from "https";
import { isProjectInitialized, readConfig } from "../utils/config.js";

// URL du registry (GitHub raw)
const COMPONENTS_REGISTRY_URL =
  "https://raw.githubusercontent.com/behsse/ui/main/apps/www/ui/components";
const ICONS_REGISTRY_URL =
  "https://raw.githubusercontent.com/behsse/ui/main/apps/www/ui/icons";

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

// Mapping des icônes disponibles
const ICONS_MAP: Record<string, { file: string }> = {
  Close: { file: "Close.tsx" },
  Github: { file: "Github.tsx" },
  Search: { file: "Search.tsx" },
  File: { file: "File.tsx" },
  // Ajoutez d'autres icônes ici au fur et à mesure
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
    const baseDir = join(process.cwd(), config.componentsDir);

    // Créer le sous-dossier components/ pour les composants principaux
    const componentsDir = join(baseDir, "components");

    // Créer le dossier components/ si nécessaire
    if (!existsSync(componentsDir)) {
      mkdirSync(componentsDir, { recursive: true });
    }

    // Télécharger les dépendances d'abord (elles vont dans componentsDir avec leurs sous-dossiers)
    if (componentConfig.dependencies && componentConfig.dependencies.length > 0) {
      spinner.text = `Téléchargement des dépendances...`;

      for (const dep of componentConfig.dependencies) {
        const depUrl = `${COMPONENTS_REGISTRY_URL}/${dep.file}`;
        const depContent = await downloadFile(depUrl);

        // Les dépendances avec subdir vont dans componentsDir/subdir (ex: ui/components/internals/)
        const depTargetDir = dep.subdir
          ? join(componentsDir, dep.subdir)
          : componentsDir;

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
    const componentUrl = `${COMPONENTS_REGISTRY_URL}/${componentConfig.file}`;
    spinner.text = `Téléchargement de ${componentName}...`;
    const componentContent = await downloadFile(componentUrl);

    // Écrire le composant principal dans components/
    const targetComponentPath = join(componentsDir, componentConfig.file);
    writeFileSync(targetComponentPath, componentContent, "utf-8");

    spinner.succeed(
      chalk.green(
        `✅ Composant ${componentName} ajouté avec succès dans ${config.componentsDir}/components/`
      )
    );

    console.log(
      chalk.cyan("\n📦 Vous pouvez maintenant l'importer dans votre projet:")
    );
    console.log(
      chalk.gray(
        `import { ${componentName} } from "@/${config.componentsDir.replace("./", "")}/components/${componentConfig.file.replace(".tsx", "")}";`
      )
    );
    console.log();
  } catch (error) {
    spinner.fail(chalk.red("❌ Erreur lors de l'installation du composant"));
    console.error(error);
    process.exit(1);
  }
}

async function addIcon(iconName: string) {
  // Vérifier si le projet est initialisé
  if (!isProjectInitialized()) {
    console.log(
      chalk.red(
        "\n❌ Le projet n'est pas initialisé. Exécutez d'abord 'behsseui init'.\n"
      )
    );
    process.exit(1);
  }

  const spinner = ora(`Téléchargement de l'icône ${iconName}...`).start();

  try {
    // Vérifier si l'icône existe
    if (!ICONS_MAP[iconName]) {
      spinner.fail(chalk.red(`L'icône "${iconName}" n'existe pas.`));
      console.log(
        chalk.yellow("\nIcônes disponibles:"),
        Object.keys(ICONS_MAP).join(", ")
      );
      process.exit(1);
    }

    const iconConfig = ICONS_MAP[iconName];
    const config = readConfig();
    const baseDir = join(process.cwd(), config.componentsDir);

    // Créer le dossier icons/ pour les icônes
    const iconsDir = join(baseDir, "icons");

    // Créer le dossier icons/ si nécessaire
    if (!existsSync(iconsDir)) {
      mkdirSync(iconsDir, { recursive: true });
    }

    // Télécharger l'icône
    const iconUrl = `${ICONS_REGISTRY_URL}/${iconConfig.file}`;
    spinner.text = `Téléchargement de ${iconName}...`;
    const iconContent = await downloadFile(iconUrl);

    // Écrire l'icône dans icons/
    const targetIconPath = join(iconsDir, iconConfig.file);
    writeFileSync(targetIconPath, iconContent, "utf-8");

    spinner.succeed(
      chalk.green(
        `✅ Icône ${iconName} ajoutée avec succès dans ${config.componentsDir}/icons/`
      )
    );

    console.log(
      chalk.cyan("\n📦 Vous pouvez maintenant l'importer dans votre projet:")
    );
    console.log(
      chalk.gray(
        `import ${iconName} from "@/${config.componentsDir.replace("./", "")}/icons/${iconConfig.file.replace(".tsx", "")}";`
      )
    );
    console.log();
  } catch (error) {
    spinner.fail(chalk.red("❌ Erreur lors de l'installation de l'icône"));
    console.error(error);
    process.exit(1);
  }
}

export const add = new Command()
  .name("add")
  .description("Ajouter un composant ou une icône à votre projet")
  .argument("<type>", "Type: nom du composant ou 'i' pour icône")
  .argument("[name]", "Nom de l'icône (si type = 'i')")
  .action((type: string, name?: string) => {
    // Si le premier argument est "i", c'est une icône
    if (type === "i") {
      if (!name) {
        console.log(
          chalk.red(
            "\n❌ Veuillez spécifier le nom de l'icône. Exemple: behsseui add i Close\n"
          )
        );
        process.exit(1);
      }
      addIcon(name);
    } else {
      // Sinon, c'est un composant
      addComponent(type);
    }
  });
