import { existsSync, readFileSync } from "fs";
import { join } from "path";

export type Framework = "nextjs" | "vite" | "unknown";

export interface FrameworkInfo {
  framework: Framework;
  tailwindVersion: string | null;
  typescriptVersion: string | null;
  hasViteConfig: boolean;
  hasNextConfig: boolean;
}

/**
 * Détecte le framework utilisé dans le projet
 */
export function detectFramework(): FrameworkInfo {
  const cwd = process.cwd();
  const packageJsonPath = join(cwd, "package.json");

  const info: FrameworkInfo = {
    framework: "unknown",
    tailwindVersion: null,
    typescriptVersion: null,
    hasViteConfig: false,
    hasNextConfig: false,
  };

  // Vérifier les fichiers de config
  info.hasViteConfig =
    existsSync(join(cwd, "vite.config.ts")) ||
    existsSync(join(cwd, "vite.config.js")) ||
    existsSync(join(cwd, "vite.config.mjs"));

  info.hasNextConfig =
    existsSync(join(cwd, "next.config.js")) ||
    existsSync(join(cwd, "next.config.mjs")) ||
    existsSync(join(cwd, "next.config.ts"));

  // Lire le package.json
  if (!existsSync(packageJsonPath)) {
    return info;
  }

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    // Vérifier la version de Tailwind
    if (allDeps.tailwindcss) {
      info.tailwindVersion = allDeps.tailwindcss;
    }

    // Vérifier la version de TypeScript
    if (allDeps.typescript) {
      info.typescriptVersion = allDeps.typescript;
    }

    // Détecter Next.js
    if (allDeps.next) {
      info.framework = "nextjs";
      return info;
    }

    // Détecter Vite
    if (allDeps.vite || info.hasViteConfig) {
      info.framework = "vite";
      return info;
    }
  } catch (error) {
    console.error("Error reading package.json:", error);
  }

  return info;
}

/**
 * Obtient la version majeure de Tailwind
 */
export function getTailwindMajorVersion(version: string | null): number | null {
  if (!version) return null;

  // Supprimer les caractères non numériques au début (^, ~, etc.)
  const cleanVersion = version.replace(/^[^\d]+/, "");
  const majorVersion = parseInt(cleanVersion.split(".")[0], 10);

  return isNaN(majorVersion) ? null : majorVersion;
}

/**
 * Vérifie si Tailwind v4 est installé
 */
export function isTailwindV4(version: string | null): boolean {
  const major = getTailwindMajorVersion(version);
  return major !== null && major >= 4;
}

/**
 * Trouve le fichier vite.config
 */
export function findViteConfig(): string | null {
  const cwd = process.cwd();
  const configs = ["vite.config.ts", "vite.config.js", "vite.config.mjs"];

  for (const config of configs) {
    if (existsSync(join(cwd, config))) {
      return config;
    }
  }

  return null;
}

/**
 * Trouve le fichier tailwind.config (v3) s'il existe
 */
export function findTailwindConfig(): string | null {
  const cwd = process.cwd();
  const configs = [
    "tailwind.config.ts",
    "tailwind.config.js",
    "tailwind.config.mjs",
    "tailwind.config.cjs",
  ];

  for (const config of configs) {
    if (existsSync(join(cwd, config))) {
      return config;
    }
  }

  return null;
}

/**
 * Obtient la version majeure de TypeScript
 */
export function getTypeScriptMajorVersion(version: string | null): number | null {
  if (!version) return null;

  // Supprimer les caractères non numériques au début (^, ~, etc.)
  const cleanVersion = version.replace(/^[^\d]+/, "");
  const majorVersion = parseInt(cleanVersion.split(".")[0], 10);

  return isNaN(majorVersion) ? null : majorVersion;
}

/**
 * Vérifie si TypeScript v5+ est installé
 */
export function isTypeScriptV5OrHigher(version: string | null): boolean {
  const major = getTypeScriptMajorVersion(version);
  return major !== null && major >= 5;
}
