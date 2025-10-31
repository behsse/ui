import { Command } from "commander";
import prompts from "prompts";
import chalk from "chalk";
import ora from "ora";
import { existsSync, mkdirSync, writeFileSync, readFileSync, unlinkSync } from "fs";
import { join, dirname } from "path";
import {
  detectPackageManager,
  installDependencies,
  type PackageManager,
} from "../utils/package-manager.js";
import {
  createDefaultConfig,
  isProjectInitialized,
  writeConfig,
} from "../utils/config.js";
import { readTemplate } from "../utils/templates.js";
import {
  detectFramework,
  getTailwindMajorVersion,
  getTypeScriptMajorVersion,
  isTypeScriptV5OrHigher,
  findViteConfig,
  findTailwindConfig,
} from "../utils/framework.js";
import { addTailwindToViteConfig } from "../utils/vite-config.js";

const REQUIRED_DEPENDENCIES = [
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
];

/**
 * Crée un dossier de manière sécurisée
 */
function ensureDirectory(path: string): void {
  if (!path || path.trim() === "") {
    throw new Error("Invalid directory path");
  }

  const fullPath = join(process.cwd(), path);
  if (!existsSync(fullPath)) {
    mkdirSync(fullPath, { recursive: true });
  }
}

/**
 * Écrit un fichier de manière sécurisée
 */
function writeFileSecurely(
  relativePath: string,
  content: string,
  spinner: any
): void {
  if (!relativePath || relativePath.trim() === "") {
    throw new Error("Invalid file path");
  }

  const fullPath = join(process.cwd(), relativePath);
  const dir = dirname(fullPath);

  // S'assurer que le dossier parent existe
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(fullPath, content, "utf-8");
  spinner.text = `Fichier créé: ${relativePath}`;
}

/**
 * Configure Tailwind CSS v4 pour Vite
 */
async function setupTailwindForVite(
  spinner: any,
  packageManager: PackageManager
): Promise<void> {
  spinner.text = "Configuration de Tailwind CSS v4 pour Vite...";

  // Installer Tailwind v4 + plugin Vite
  const deps = ["tailwindcss@latest", "@tailwindcss/vite@latest"];
  spinner.text = "Installation de Tailwind CSS v4...";
  installDependencies(deps, packageManager, true);

  // Trouver et modifier vite.config
  const viteConfigPath = findViteConfig();
  if (viteConfigPath) {
    spinner.text = `Modification de ${viteConfigPath}...`;
    const success = addTailwindToViteConfig(viteConfigPath);
    if (success) {
      spinner.text = `✓ ${viteConfigPath} modifié`;
    } else {
      console.log(
        chalk.yellow(
          `\n⚠️  Impossible de modifier automatiquement ${viteConfigPath}.`
        )
      );
      console.log(
        chalk.dim(
          `Ajoutez manuellement:\nimport tailwindcss from "@tailwindcss/vite";\n\nplugins: [tailwindcss()]`
        )
      );
    }
  } else {
    console.log(
      chalk.yellow("\n⚠️  Fichier vite.config non trouvé. Créez-le d'abord.")
    );
  }
}

/**
 * Configure Tailwind CSS v4 pour Next.js
 */
async function setupTailwindForNextJs(
  spinner: any,
  packageManager: PackageManager
): Promise<void> {
  spinner.text = "Configuration de Tailwind CSS v4 pour Next.js...";

  // Installer Tailwind v4 + PostCSS
  const deps = ["tailwindcss@latest", "@tailwindcss/postcss@latest", "postcss"];
  spinner.text = "Installation de Tailwind CSS v4...";
  installDependencies(deps, packageManager, true);

  // Créer postcss.config.mjs
  spinner.text = "Création de postcss.config.mjs...";
  const postcssTemplate = readTemplate("postcss.config.mjs.template");
  writeFileSecurely("postcss.config.mjs", postcssTemplate, spinner);
}

/**
 * Remplace le CSS global par le template Tailwind v4
 */
function updateGlobalCss(cssPath: string, spinner: any): void {
  const fullPath = join(process.cwd(), cssPath);
  const cssTemplate = readTemplate("globals.css.template");

  spinner.text = `Configuration de ${cssPath}...`;

  // Si le fichier existe, le supprimer d'abord
  if (existsSync(fullPath)) {
    unlinkSync(fullPath);
    spinner.text = `Suppression de l'ancien ${cssPath}...`;
  }

  // Créer le nouveau fichier avec le template
  writeFileSecurely(cssPath, cssTemplate, spinner);
  spinner.text = `✓ ${cssPath} créé avec Tailwind v4`;
}

async function initProject() {
  console.log(chalk.bold.cyan("\n✨ Initialisation de behsseui\n"));

  // Vérifier si déjà initialisé
  if (isProjectInitialized()) {
    const { overwrite } = await prompts({
      type: "confirm",
      name: "overwrite",
      message: "Le projet est déjà initialisé. Voulez-vous reconfigurer ?",
      initial: false,
    });

    if (!overwrite) {
      console.log(chalk.yellow("\n⚠️  Initialisation annulée."));
      process.exit(0);
    }
  }

  // Détecter le package manager
  const packageManager = detectPackageManager();
  console.log(
    chalk.dim(`📦 Package manager: ${chalk.bold(packageManager)}\n`)
  );

  // Détecter le framework
  const frameworkInfo = detectFramework();
  console.log(
    chalk.dim(`🔧 Framework: ${chalk.bold(frameworkInfo.framework)}\n`)
  );

  if (frameworkInfo.framework === "unknown") {
    console.log(
      chalk.yellow(
        "⚠️  Framework non détecté. Assurez-vous d'utiliser Vite ou Next.js."
      )
    );
    const { continueAnyway } = await prompts({
      type: "confirm",
      name: "continueAnyway",
      message: "Voulez-vous continuer quand même ?",
      initial: false,
    });

    if (!continueAnyway) {
      process.exit(0);
    }
  }

  // Vérifier la version de TypeScript
  const typescriptVersion = getTypeScriptMajorVersion(
    frameworkInfo.typescriptVersion
  );
  let needsTypeScriptUpgrade = false;

  if (!frameworkInfo.typescriptVersion) {
    console.log(
      chalk.yellow(
        "⚠️  TypeScript n'est pas installé. behsseui nécessite TypeScript v5+."
      )
    );
    needsTypeScriptUpgrade = true;
  } else if (typescriptVersion && typescriptVersion < 5) {
    console.log(
      chalk.yellow(
        `⚠️  TypeScript v${typescriptVersion} détecté. behsseui nécessite TypeScript v5+.`
      )
    );
    needsTypeScriptUpgrade = true;
  } else if (typescriptVersion && typescriptVersion >= 5) {
    console.log(
      chalk.green(
        `✓ TypeScript v${typescriptVersion} détecté\n`
      )
    );
  }

  // Vérifier la version de Tailwind
  const tailwindVersion = getTailwindMajorVersion(
    frameworkInfo.tailwindVersion
  );
  if (tailwindVersion && tailwindVersion < 4) {
    console.log(
      chalk.yellow(
        `⚠️  Tailwind CSS v${tailwindVersion} détecté. behsseui nécessite Tailwind v4.`
      )
    );
  }

  // Détecter l'ancien fichier tailwind.config (Tailwind v3)
  const oldTailwindConfig = findTailwindConfig();
  if (oldTailwindConfig) {
    console.log(
      chalk.yellow(
        `⚠️  Fichier de configuration Tailwind v3 détecté: ${oldTailwindConfig}`
      )
    );
    console.log(
      chalk.dim(
        "Tailwind v4 n'utilise plus de fichier de configuration.\n"
      )
    );
  }

  // Questions de configuration
  const answers = await prompts([
    {
      type: oldTailwindConfig ? "confirm" : null,
      name: "deleteOldTailwindConfig",
      message: `Supprimer ${oldTailwindConfig} ? (Tailwind v4 n'en a plus besoin)`,
      initial: true,
    },
    {
      type: needsTypeScriptUpgrade ? "confirm" : null,
      name: "upgradeTypeScript",
      message: frameworkInfo.typescriptVersion
        ? `Mettre à jour TypeScript vers v5+ (actuellement v${typescriptVersion}) ?`
        : "Installer TypeScript v5+ ?",
      initial: true,
    },
    {
      type: "text",
      name: "componentsDir",
      message: "Où voulez-vous installer les composants ?",
      initial: "./ui",
      validate: (value) =>
        value && value.trim() !== "" ? true : "Le chemin ne peut pas être vide",
    },
    {
      type: "text",
      name: "tailwindCss",
      message: "Chemin du fichier CSS global ?",
      initial:
        frameworkInfo.framework === "nextjs"
          ? "./app/globals.css"
          : "./src/index.css",
      validate: (value) =>
        value && value.trim() !== "" ? true : "Le chemin ne peut pas être vide",
    },
    {
      type: "confirm",
      name: "installTailwind",
      message:
        tailwindVersion && tailwindVersion >= 4
          ? "Tailwind v4 est déjà installé. Reconfigurer ?"
          : "Installer et configurer Tailwind CSS v4 ?",
      initial: !tailwindVersion || tailwindVersion < 4,
    },
  ]);

  if (!answers.componentsDir) {
    console.log(chalk.red("\n❌ Initialisation annulée."));
    process.exit(0);
  }

  const spinner = ora("Configuration du projet...").start();

  try {
    // Créer le dossier des composants
    spinner.text = `Création du dossier ${answers.componentsDir}...`;
    ensureDirectory(answers.componentsDir);

    // Supprimer l'ancien tailwind.config si l'utilisateur a accepté
    if (oldTailwindConfig && answers.deleteOldTailwindConfig) {
      spinner.text = `Suppression de ${oldTailwindConfig}...`;
      unlinkSync(join(process.cwd(), oldTailwindConfig));
      spinner.text = `✓ ${oldTailwindConfig} supprimé`;
    }

    // Créer le fichier de configuration
    spinner.text = "Création du fichier de configuration...";
    const config = createDefaultConfig(answers.componentsDir);
    config.tailwind.css = answers.tailwindCss;
    // Plus besoin de tailwind.config pour v4
    delete config.tailwind.config;
    writeConfig(config);

    // Mettre à jour TypeScript si nécessaire
    if (needsTypeScriptUpgrade && answers.upgradeTypeScript) {
      spinner.text = "Mise à jour de TypeScript vers v5+...";
      try {
        installDependencies(["typescript@^5"], packageManager, true);
        spinner.text = "✓ TypeScript mis à jour";
      } catch (error) {
        spinner.warn(
          chalk.yellow("Erreur lors de la mise à jour de TypeScript")
        );
        console.log(
          chalk.dim(
            `\nInstallez manuellement:\n${packageManager === "npm" ? "npm install --save-dev" : `${packageManager} add -D`} typescript@^5\n`
          )
        );
      }
    }

    // Installer les dépendances requises
    spinner.text = "Installation des dépendances...";
    try {
      installDependencies(REQUIRED_DEPENDENCIES, packageManager, true);
    } catch (error) {
      spinner.warn(
        chalk.yellow(
          "Erreur lors de l'installation automatique des dépendances"
        )
      );
      console.log(
        chalk.dim(
          `\nInstallez manuellement:\n${packageManager === "npm" ? "npm install --save-dev" : `${packageManager} add -D`} ${REQUIRED_DEPENDENCIES.join(" ")}\n`
        )
      );
    }

    // Configurer Tailwind CSS v4
    if (answers.installTailwind) {
      if (frameworkInfo.framework === "vite") {
        await setupTailwindForVite(spinner, packageManager);
      } else if (frameworkInfo.framework === "nextjs") {
        await setupTailwindForNextJs(spinner, packageManager);
      }

      // Mettre à jour le CSS global
      updateGlobalCss(answers.tailwindCss, spinner);
    } else if (frameworkInfo.framework === "nextjs") {
      // Vérifier si postcss.config.mjs existe, sinon le créer
      const postcssConfigPath = join(process.cwd(), "postcss.config.mjs");
      if (!existsSync(postcssConfigPath)) {
        spinner.text = "Création de postcss.config.mjs...";
        const postcssTemplate = readTemplate("postcss.config.mjs.template");
        writeFileSecurely("postcss.config.mjs", postcssTemplate, spinner);
        spinner.text = "✓ postcss.config.mjs créé";
      }
    }

    // Créer le dossier lib/ et le fichier utils.ts pour cn() helper
    spinner.text = "Création du helper cn() dans lib/...";
    ensureDirectory("./lib");
    const utilsTemplate = readTemplate("utils.ts.template");
    const utilsPath = "./lib/utils.ts";
    writeFileSecurely(utilsPath, utilsTemplate, spinner);

    spinner.succeed(chalk.green("✅ Projet initialisé avec succès !\n"));

    // Afficher les prochaines étapes
    console.log(chalk.bold("📋 Prochaines étapes:\n"));
    console.log(
      chalk.dim("1."),
      "Utilisez le helper cn():",
      chalk.gray(`import { cn } from "./lib/utils"`)
    );
    console.log(
      chalk.dim("2."),
      "Ajoutez des composants:",
      chalk.cyan(`${packageManager} behsseui add Button`)
    );
    console.log(
      chalk.dim("3."),
      "Importez dans votre code:",
      chalk.gray(`import { Button } from "${answers.componentsDir}/Button"`)
    );
    console.log(
      chalk.dim("4."),
      "Consultez la doc:",
      chalk.blue("https://github.com/behsse/ui")
    );
    console.log();

    // Informations spécifiques au framework
    if (frameworkInfo.framework === "vite" && answers.installTailwind) {
      console.log(
        chalk.dim(
          `💡 Vite: Vérifiez que tailwindcss() est dans vite.config plugins`
        )
      );
    } else if (
      frameworkInfo.framework === "nextjs" &&
      answers.installTailwind
    ) {
      console.log(
        chalk.dim(`💡 Next.js: postcss.config.mjs a été créé automatiquement`)
      );
    }
    console.log();
  } catch (error) {
    spinner.fail(chalk.red("❌ Erreur lors de l'initialisation"));
    console.error(error);
    process.exit(1);
  }
}

export const init = new Command()
  .name("init")
  .description("Initialiser behsseui dans votre projet")
  .action(initProject);
