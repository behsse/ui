import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Lit un template depuis le dossier templates
 */
export function readTemplate(templateName: string): string {
  // Le fichier compilé est dans dist/index.js, donc __dirname pointe vers dist/
  // Les templates sont dans dist/templates/
  const templatePath = join(__dirname, "templates", templateName);
  return readFileSync(templatePath, "utf-8");
}

/**
 * Remplace les variables dans un template
 */
export function renderTemplate(
  template: string,
  variables: Record<string, string>
): string {
  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`{{${key}}}`, "g"), value);
  }
  return result;
}
