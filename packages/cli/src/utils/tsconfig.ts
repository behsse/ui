import { readFileSync, writeFileSync, existsSync } from "fs";

/**
 * Supprime les commentaires d'un fichier JSON (pour supporter les tsconfig avec commentaires)
 */
function stripJsonComments(jsonString: string): string {
  // Supprimer les commentaires // (ligne)
  jsonString = jsonString.replace(/\/\/.*$/gm, "");

  // Supprimer les commentaires /* */ (bloc)
  jsonString = jsonString.replace(/\/\*[\s\S]*?\*\//g, "");

  // Supprimer les trailing commas avant } ou ]
  jsonString = jsonString.replace(/,(\s*[}\]])/g, "$1");

  return jsonString;
}

/**
 * Configure un fichier tsconfig.json avec l'alias @ et les includes
 */
export function configureTsconfigForAlias(
  path: string,
  isAppConfig: boolean = false
): boolean {
  if (!existsSync(path)) {
    return false;
  }

  try {
    const content = readFileSync(path, "utf-8");

    // Supprimer les commentaires avant de parser
    const cleanContent = stripJsonComments(content);
    const tsconfig = JSON.parse(cleanContent);

    // Ajouter compilerOptions si absent
    if (!tsconfig.compilerOptions) {
      tsconfig.compilerOptions = {};
    }

    // Ajouter baseUrl
    tsconfig.compilerOptions.baseUrl = ".";

    // Ajouter paths pour l'alias @
    if (!tsconfig.compilerOptions.paths) {
      tsconfig.compilerOptions.paths = {};
    }
    tsconfig.compilerOptions.paths["@/*"] = ["./*"];

    // Pour tsconfig.app.json, ajouter ui et lib dans include
    if (isAppConfig && Array.isArray(tsconfig.include)) {
      const includes = new Set(tsconfig.include);
      includes.add("ui");
      includes.add("lib");
      tsconfig.include = Array.from(includes);
    }

    // Écrire le fichier avec une indentation propre
    writeFileSync(path, JSON.stringify(tsconfig, null, 2) + "\n", "utf-8");
    return true;
  } catch (error) {
    console.error(`Error configuring ${path}:`, error);
    return false;
  }
}
