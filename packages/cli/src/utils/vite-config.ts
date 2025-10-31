import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

/**
 * Ajoute le plugin Tailwind CSS à vite.config.ts
 */
export function addTailwindToViteConfig(configPath: string): boolean {
  const fullPath = join(process.cwd(), configPath);

  try {
    let content = readFileSync(fullPath, "utf-8");

    // Vérifier si tailwindcss est déjà importé
    if (content.includes("@tailwindcss/vite")) {
      return false; // Déjà configuré
    }

    // Ajouter l'import
    // Chercher la ligne d'import de 'vite' pour ajouter après
    const viteImportRegex = /import\s+{[^}]+}\s+from\s+['"]vite['"]/;
    const match = content.match(viteImportRegex);

    if (match) {
      const importStatement = '\nimport tailwindcss from "@tailwindcss/vite";';
      content = content.replace(
        viteImportRegex,
        match[0] + importStatement
      );
    } else {
      // Si pas trouvé, ajouter en haut après les imports existants
      const firstImport = content.indexOf("import");
      if (firstImport !== -1) {
        const firstNewline = content.indexOf("\n", firstImport);
        content =
          content.slice(0, firstNewline + 1) +
          'import tailwindcss from "@tailwindcss/vite";\n' +
          content.slice(firstNewline + 1);
      }
    }

    // Ajouter le plugin dans le tableau plugins
    // Chercher plugins: [...]
    const pluginsRegex = /plugins:\s*\[([\s\S]*?)\]/;
    const pluginsMatch = content.match(pluginsRegex);

    if (pluginsMatch) {
      const pluginsContent = pluginsMatch[1].trim();
      let newPluginsContent: string;

      if (pluginsContent === "") {
        // Tableau vide
        newPluginsContent = "tailwindcss()";
      } else {
        // Ajouter tailwindcss() à la fin
        newPluginsContent = pluginsContent + ",\n    tailwindcss()";
      }

      content = content.replace(
        pluginsRegex,
        `plugins: [\n    ${newPluginsContent}\n  ]`
      );
    } else {
      // Si pas de plugins, ajouter la propriété
      // Chercher defineConfig({
      const defineConfigRegex = /defineConfig\(\{/;
      if (defineConfigRegex.test(content)) {
        content = content.replace(
          defineConfigRegex,
          "defineConfig({\n  plugins: [tailwindcss()],"
        );
      }
    }

    writeFileSync(fullPath, content, "utf-8");
    return true;
  } catch (error) {
    console.error("Error modifying vite.config:", error);
    return false;
  }
}
