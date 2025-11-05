import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

/**
 * Ajoute l'alias @ pour résoudre les imports depuis la racine du projet
 */
export function addAliasToViteConfig(configPath: string): boolean {
  const fullPath = join(process.cwd(), configPath);

  try {
    let content = readFileSync(fullPath, "utf-8");

    // Vérifier si l'alias @ est déjà configuré
    if (content.includes("resolve:") && content.includes("alias:")) {
      return false; // Déjà configuré
    }

    // Ajouter l'import de path si pas déjà présent
    if (!content.includes("import path from")) {
      const firstImport = content.indexOf("import");
      if (firstImport !== -1) {
        content = 'import path from "path";\n' + content;
      }
    }

    // Ajouter resolve.alias dans defineConfig
    const defineConfigRegex = /defineConfig\(\{([\s\S]*?)\}\)/;
    const match = content.match(defineConfigRegex);

    if (match) {
      const configContent = match[1];

      // Vérifier si resolve existe déjà
      if (configContent.includes("resolve:")) {
        // Ajouter alias dans resolve existant (pointe vers la racine pour accéder à src/, lib/, ui/)
        const resolveRegex = /resolve:\s*\{([\s\S]*?)\}/;
        const resolveMatch = configContent.match(resolveRegex);

        if (resolveMatch && !resolveMatch[1].includes("alias:")) {
          const newResolve = `resolve: {\n    alias: {\n      "@": path.resolve(__dirname, "."),\n    },${resolveMatch[1]}\n  }`;
          content = content.replace(resolveRegex, newResolve);
        }
      } else {
        // Ajouter resolve avec alias (pointe vers la racine pour accéder à src/, lib/, ui/)
        const resolveConfig = '\n  resolve: {\n    alias: {\n      "@": path.resolve(__dirname, "."),\n    },\n  },';
        content = content.replace(
          defineConfigRegex,
          `defineConfig({${resolveConfig}${configContent}})`
        );
      }
    }

    writeFileSync(fullPath, content, "utf-8");
    return true;
  } catch (error) {
    console.error("Error adding alias to vite.config:", error);
    return false;
  }
}

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
