import { Command } from "commander";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import chalk from "chalk";
import ora from "ora";
import { isProjectInitialized, readConfig } from "../utils/config.js";

// URL du registry (GitHub raw)
const COMPONENTS_REGISTRY_URL =
  "https://raw.githubusercontent.com/behsse/ui/main/apps/www/ui/components";
const ICONS_REGISTRY_URL =
  "https://raw.githubusercontent.com/behsse/ui/main/apps/www/ui/icons";
const SLICES_REGISTRY_URL =
  "https://raw.githubusercontent.com/behsse/ui/main/apps/www/ui/components/slices";

// Mapping des composants disponibles et leurs dépendances
const COMPONENTS_MAP: Record<
  string,
  {
    file: string;
    dependencies?: Array<{ file: string; subdir?: string }>;
    icons?: string[];
  }
> = {
  Accordion: { file: "Accordion.tsx" },
  Alert: {
    file: "Alert.tsx",
    dependencies: [{ file: "internals/Slot.tsx", subdir: "internals" }],
  },
  AlertDialog: { file: "AlertDialog.tsx" },
  Avatar: { file: "Avatar.tsx" },
  Badge: {
    file: "Badge.tsx",
    dependencies: [{ file: "internals/Slot.tsx", subdir: "internals" }],
  },
  Breadcrumb: {
    file: "Breadcrumb.tsx",
    icons: ["ChevronRight"],
  },
  Button: {
    file: "Button.tsx",
    dependencies: [{ file: "internals/Slot.tsx", subdir: "internals" }],
  },
  Calendar: {
    file: "Calendar.tsx",
    icons: ["ChevronLeft", "ChevronRight"],
  },
  Card: { file: "Card.tsx" },
  Carousel: {
    file: "Carousel.tsx",
    icons: ["ChevronLeft", "ChevronRight"],
  },
  Checkbox: {
    file: "Checkbox.tsx",
    icons: ["Check"],
  },
  Dialog: {
    file: "Dialog.tsx",
    icons: ["Close"],
  },
  Drawer: { file: "Drawer.tsx" },
  DropdownMenu: {
    file: "DropdownMenu.tsx",
    icons: ["ChevronRight"],
  },
  HoverCard: { file: "HoverCard.tsx" },
  Input: { file: "Input.tsx" },
  InputOTP: { file: "InputOTP.tsx" },
  Pagination: {
    file: "Pagination.tsx",
    icons: ["ChevronLeft", "ChevronRight"],
  },
  Progress: { file: "Progress.tsx" },
  Select: {
    file: "Select.tsx",
    icons: ["ChevronDown", "Check"],
  },
};

// Mapping des icônes disponibles
const ICONS_MAP: Record<string, { file: string }> = {
  AlertCircle: { file: "AlertCircle.tsx" },
  AlertTriangle: { file: "AlertTriangle.tsx" },
  ArrowUpRight: { file: "ArrowUpRight.tsx" },
  Check: { file: "Check.tsx" },
  CheckCircle: { file: "CheckCircle.tsx" },
  ChevronDown: { file: "ChevronDown.tsx" },
  ChevronLeft: { file: "ChevronLeft.tsx" },
  ChevronRight: { file: "ChevronRight.tsx" },
  Close: { file: "Close.tsx" },
  Copy: { file: "Copy.tsx" },
  File: { file: "File.tsx" },
  Github: { file: "Github.tsx" },
  Info: { file: "Info.tsx" },
  Menu: { file: "Menu.tsx" },
  Monitor: { file: "Monitor.tsx" },
  Search: { file: "Search.tsx" },
  Smartphone: { file: "Smartphone.tsx" },
  Tablet: { file: "Tablet.tsx" },
  Terminal: { file: "Terminal.tsx" },
};

// Mapping des slices disponibles
// Clé = ce que l'utilisateur tape (ex: Navbar01), outputName = nom générique dans le projet
const SLICES_MAP: Record<
  string,
  { sourceFile: string; outputName: string; icons?: string[]; dependencies?: string[] }
> = {
  Navbar01: { sourceFile: "Navbar01.tsx", outputName: "Navbar", icons: ["Menu", "Close"], dependencies: ["Button"] },
  Navbar02: { sourceFile: "Navbar02.tsx", outputName: "Navbar", icons: ["Menu", "Close"], dependencies: ["Button", "Input"] },
  Hero01: { sourceFile: "Hero01.tsx", outputName: "Hero", dependencies: ["Button", "Badge"] },
  Hero02: { sourceFile: "Hero02.tsx", outputName: "Hero", dependencies: ["Button", "Input"] },
  Pricing01: { sourceFile: "Pricing01.tsx", outputName: "Pricing", dependencies: ["Button", "Badge", "Card"], icons: ["Check"] },
  Pricing02: { sourceFile: "Pricing02.tsx", outputName: "Pricing", dependencies: ["Button", "Badge", "Card"], icons: ["Check"] },
  Pricing03: { sourceFile: "Pricing03.tsx", outputName: "Pricing", dependencies: ["Button", "Badge", "Card"], icons: ["Check"] },
  Footer01: { sourceFile: "Footer01.tsx", outputName: "Footer" },
  Footer02: { sourceFile: "Footer02.tsx", outputName: "Footer", dependencies: ["Button", "Input"] },
};

// Fonction pour télécharger un fichier depuis une URL
async function downloadFile(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.status} ${response.statusText}`);
  }
  return response.text();
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

    // Télécharger les icônes dépendantes
    if (componentConfig.icons && componentConfig.icons.length > 0) {
      const iconsDir = join(baseDir, "icons");
      if (!existsSync(iconsDir)) {
        mkdirSync(iconsDir, { recursive: true });
      }

      spinner.text = `Téléchargement des icônes dépendantes...`;

      for (const iconName of componentConfig.icons) {
        const iconConfig = ICONS_MAP[iconName];
        if (iconConfig) {
          const iconUrl = `${ICONS_REGISTRY_URL}/${iconConfig.file}`;
          const iconContent = await downloadFile(iconUrl);
          const iconTargetPath = join(iconsDir, iconConfig.file);

          if (!existsSync(iconTargetPath)) {
            writeFileSync(iconTargetPath, iconContent, "utf-8");
          }
        }
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

    if (componentConfig.icons && componentConfig.icons.length > 0) {
      console.log(
        chalk.gray(`   Icônes installées: ${componentConfig.icons.join(", ")}`)
      );
    }

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

async function addSlice(sliceName: string) {
  if (!isProjectInitialized()) {
    console.log(
      chalk.red(
        "\n❌ Le projet n'est pas initialisé. Exécutez d'abord 'behsseui init'.\n"
      )
    );
    process.exit(1);
  }

  const spinner = ora(`Téléchargement de la slice ${sliceName}...`).start();

  try {
    if (!SLICES_MAP[sliceName]) {
      spinner.fail(chalk.red(`La slice "${sliceName}" n'existe pas.`));
      console.log(
        chalk.yellow("\nSlices disponibles:"),
        Object.keys(SLICES_MAP).join(", ")
      );
      process.exit(1);
    }

    const sliceConfig = SLICES_MAP[sliceName];
    const config = readConfig();
    const baseDir = join(process.cwd(), config.componentsDir);
    const slicesDir = join(baseDir, "slices");

    if (!existsSync(slicesDir)) {
      mkdirSync(slicesDir, { recursive: true });
    }

    // Télécharger les composants dépendants (Button, Input, Badge, etc.)
    if (sliceConfig.dependencies && sliceConfig.dependencies.length > 0) {
      spinner.text = `Téléchargement des composants dépendants...`;
      const componentsDir = join(baseDir, "components");
      if (!existsSync(componentsDir)) {
        mkdirSync(componentsDir, { recursive: true });
      }

      for (const depName of sliceConfig.dependencies) {
        if (COMPONENTS_MAP[depName]) {
          const depConfig = COMPONENTS_MAP[depName];

          // Télécharger le composant principal
          const depUrl = `${COMPONENTS_REGISTRY_URL}/${depConfig.file}`;
          const depContent = await downloadFile(depUrl);
          const depPath = join(componentsDir, depConfig.file);
          if (!existsSync(depPath)) {
            writeFileSync(depPath, depContent, "utf-8");
          }

          // Télécharger les sous-dépendances du composant (ex: internals/Slot.tsx)
          if (depConfig.dependencies && depConfig.dependencies.length > 0) {
            for (const subDep of depConfig.dependencies) {
              const subDepUrl = `${COMPONENTS_REGISTRY_URL}/${subDep.file}`;
              const subDepContent = await downloadFile(subDepUrl);
              const subDepTargetDir = subDep.subdir
                ? join(componentsDir, subDep.subdir)
                : componentsDir;
              if (!existsSync(subDepTargetDir)) {
                mkdirSync(subDepTargetDir, { recursive: true });
              }
              const subDepFileName = subDep.file.split('/').pop()!;
              const subDepPath = join(subDepTargetDir, subDepFileName);
              if (!existsSync(subDepPath)) {
                writeFileSync(subDepPath, subDepContent, "utf-8");
              }
            }
          }

          // Télécharger les icônes du composant dépendant
          if (depConfig.icons && depConfig.icons.length > 0) {
            const iconsDir = join(baseDir, "icons");
            if (!existsSync(iconsDir)) {
              mkdirSync(iconsDir, { recursive: true });
            }
            for (const iconName of depConfig.icons) {
              const iconConfig = ICONS_MAP[iconName];
              if (iconConfig) {
                const iconUrl = `${ICONS_REGISTRY_URL}/${iconConfig.file}`;
                const iconContent = await downloadFile(iconUrl);
                const iconTargetPath = join(iconsDir, iconConfig.file);
                if (!existsSync(iconTargetPath)) {
                  writeFileSync(iconTargetPath, iconContent, "utf-8");
                }
              }
            }
          }
        }
      }
    }

    // Télécharger les icônes dépendantes
    if (sliceConfig.icons && sliceConfig.icons.length > 0) {
      const iconsDir = join(baseDir, "icons");
      if (!existsSync(iconsDir)) {
        mkdirSync(iconsDir, { recursive: true });
      }

      spinner.text = `Téléchargement des icônes dépendantes...`;
      for (const iconName of sliceConfig.icons) {
        const iconConfig = ICONS_MAP[iconName];
        if (iconConfig) {
          const iconUrl = `${ICONS_REGISTRY_URL}/${iconConfig.file}`;
          const iconContent = await downloadFile(iconUrl);
          const iconTargetPath = join(iconsDir, iconConfig.file);
          if (!existsSync(iconTargetPath)) {
            writeFileSync(iconTargetPath, iconContent, "utf-8");
          }
        }
      }
    }

    // Télécharger la slice
    const sliceUrl = `${SLICES_REGISTRY_URL}/${sliceConfig.sourceFile}`;
    spinner.text = `Téléchargement de ${sliceName}...`;
    let sliceContent = await downloadFile(sliceUrl);

    // Renommer l'export : "export function Navbar01" -> "export function Navbar"
    sliceContent = sliceContent.replace(
      `export function ${sliceName}`,
      `export function ${sliceConfig.outputName}`
    );

    // Sauvegarder avec le nom générique
    const targetPath = join(slicesDir, `${sliceConfig.outputName}.tsx`);
    writeFileSync(targetPath, sliceContent, "utf-8");

    spinner.succeed(
      chalk.green(
        `✅ Slice ${sliceName} ajoutée en tant que ${sliceConfig.outputName} dans ${config.componentsDir}/slices/`
      )
    );

    if (sliceConfig.dependencies && sliceConfig.dependencies.length > 0) {
      console.log(
        chalk.gray(`   Composants installés: ${sliceConfig.dependencies.join(", ")}`)
      );
    }

    if (sliceConfig.icons && sliceConfig.icons.length > 0) {
      console.log(
        chalk.gray(`   Icônes installées: ${sliceConfig.icons.join(", ")}`)
      );
    }

    console.log(
      chalk.cyan("\n📦 Vous pouvez maintenant l'importer dans votre projet:")
    );
    console.log(
      chalk.gray(
        `import { ${sliceConfig.outputName} } from "@/${config.componentsDir.replace("./", "")}/slices/${sliceConfig.outputName}";`
      )
    );
    console.log();
  } catch (error) {
    spinner.fail(chalk.red("❌ Erreur lors de l'installation de la slice"));
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
  .description("Ajouter un composant, une icône ou une slice à votre projet")
  .argument("<type>", "Type: nom du composant, 'i' pour icône, ou 'slices/NomSlice'")
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
    } else if (type.startsWith("slices/")) {
      // C'est une slice : behsseui add slices/Navbar01
      const sliceName = type.replace("slices/", "");
      if (!sliceName) {
        console.log(
          chalk.red(
            "\n❌ Veuillez spécifier le nom de la slice. Exemple: behsseui add slices/Navbar01\n"
          )
        );
        process.exit(1);
      }
      addSlice(sliceName);
    } else {
      // Sinon, c'est un composant
      addComponent(type);
    }
  });
