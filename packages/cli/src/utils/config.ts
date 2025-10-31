import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

export interface BehsseUIConfig {
  $schema?: string;
  componentsDir: string;
  libDir: string;
  tailwind: {
    config?: string; // Optional pour v4
    css: string;
  };
  initialized: boolean;
}

const CONFIG_FILE_NAME = "behsseui.json";

/**
 * Obtient le chemin du fichier de configuration
 */
export function getConfigPath(): string {
  return join(process.cwd(), CONFIG_FILE_NAME);
}

/**
 * Vérifie si le projet est initialisé
 */
export function isProjectInitialized(): boolean {
  const configPath = getConfigPath();
  if (!existsSync(configPath)) {
    return false;
  }

  try {
    const config = readConfig();
    return config.initialized === true;
  } catch {
    return false;
  }
}

/**
 * Lit la configuration
 */
export function readConfig(): BehsseUIConfig {
  const configPath = getConfigPath();
  if (!existsSync(configPath)) {
    throw new Error("Configuration file not found. Run 'behsseui init' first.");
  }

  const content = readFileSync(configPath, "utf-8");
  return JSON.parse(content);
}

/**
 * Écrit la configuration
 */
export function writeConfig(config: BehsseUIConfig): void {
  const configPath = getConfigPath();
  writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
}

/**
 * Crée la configuration par défaut
 */
export function createDefaultConfig(
  componentsDir = "./ui",
  libDir = "./lib"
): BehsseUIConfig {
  return {
    $schema: "https://behsseui.dev/schema.json",
    componentsDir,
    libDir,
    tailwind: {
      config: "./tailwind.config.js",
      css: "./app/globals.css",
    },
    initialized: true,
  };
}
