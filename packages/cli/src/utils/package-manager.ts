import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

/**
 * Détecte le package manager utilisé dans le projet
 */
export function detectPackageManager(): PackageManager {
  const cwd = process.cwd();

  // Vérifier les fichiers de lock
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  if (existsSync(join(cwd, "yarn.lock"))) {
    return "yarn";
  }
  if (existsSync(join(cwd, "bun.lockb"))) {
    return "bun";
  }
  if (existsSync(join(cwd, "package-lock.json"))) {
    return "npm";
  }

  // Par défaut, vérifier ce qui est installé globalement
  try {
    execSync("pnpm --version", { stdio: "ignore" });
    return "pnpm";
  } catch {}

  try {
    execSync("yarn --version", { stdio: "ignore" });
    return "yarn";
  } catch {}

  try {
    execSync("bun --version", { stdio: "ignore" });
    return "bun";
  } catch {}

  return "npm";
}

/**
 * Installe des dépendances avec le package manager détecté
 */
export function installDependencies(
  dependencies: string[],
  packageManager: PackageManager,
  isDev = false
): void {
  const devFlag = isDev ? "-D" : "";
  const deps = dependencies.join(" ");

  let command: string;
  switch (packageManager) {
    case "pnpm":
      command = `pnpm add ${devFlag} ${deps}`;
      break;
    case "yarn":
      command = `yarn add ${devFlag} ${deps}`;
      break;
    case "bun":
      command = `bun add ${devFlag} ${deps}`;
      break;
    case "npm":
    default:
      command = `npm install ${isDev ? "--save-dev" : ""} ${deps}`;
      break;
  }

  execSync(command, { stdio: "inherit" });
}

/**
 * Obtient la commande d'installation formatée pour affichage
 */
export function getInstallCommand(
  dependencies: string[],
  packageManager: PackageManager,
  isDev = false
): string {
  const devFlag = isDev ? "-D" : "";
  const deps = dependencies.join(" ");

  switch (packageManager) {
    case "pnpm":
      return `pnpm add ${devFlag} ${deps}`;
    case "yarn":
      return `yarn add ${devFlag} ${deps}`;
    case "bun":
      return `bun add ${devFlag} ${deps}`;
    case "npm":
    default:
      return `npm install ${isDev ? "--save-dev" : ""} ${deps}`;
  }
}
