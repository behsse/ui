import fs from 'fs'
import path from 'path'

/**
 * Extrait le code source d'un fichier composant
 * @param fileName - Nom du fichier (ex: "Button.tsx" ou "Slot.tsx")
 * @param basePath - Chemin de base optionnel (par défaut: ui/components)
 * @returns Le contenu du fichier en string
 */
export function extractCode(fileName: string, basePath?: string): string {
  try {
    // Chemins possibles pour chercher le fichier
    const possiblePaths = [
      // Chemin custom si fourni
      basePath ? path.join(process.cwd(), basePath, fileName) : null,
      // Dans packages/ui/components
      path.join(process.cwd(), '..', '..', 'packages', 'ui', 'components', fileName),
      // Dans apps/www/ui/components
      path.join(process.cwd(), 'ui', 'components', fileName),
      // Dans apps/www/ui/components/internals (pour Slot, etc.)
      path.join(process.cwd(), 'ui', 'components', 'internals', fileName),
      // Dans apps/www/app/components (pour Accordion, etc.)
      path.join(process.cwd(), 'app', 'components', fileName),
    ].filter(Boolean) as string[]

    // Chercher le fichier dans les chemins possibles
    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        const code = fs.readFileSync(filePath, 'utf-8')
        return code
      }
    }

    // Si le fichier n'est pas trouvé
    console.warn(`File not found: ${fileName}`)
    return `// File not found: ${fileName}`
  } catch (error) {
    console.error(`Error reading file ${fileName}:`, error)
    return `// Error reading file: ${fileName}`
  }
}

/**
 * Extrait le code de plusieurs fichiers
 * @param fileNames - Liste de noms de fichiers
 * @returns Un objet avec les noms de fichiers comme clés et leur contenu comme valeurs
 */
export function extractMultipleFiles(fileNames: string[]): Record<string, string> {
  const result: Record<string, string> = {}

  for (const fileName of fileNames) {
    result[fileName] = extractCode(fileName)
  }

  return result
}
