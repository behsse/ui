import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Lire le CHANGELOG.md depuis la racine du monorepo
const changelogPath = path.resolve(__dirname, '../../../CHANGELOG.md')
const outputPath = path.resolve(__dirname, '../data/changelog-content.ts')

const changelogContent = fs.readFileSync(changelogPath, 'utf-8')

// Échapper les backticks et les ${} pour éviter les problèmes avec les template literals
const escapedContent = changelogContent
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$\{/g, '\\${')

const output = `// Ce fichier est généré automatiquement par scripts/generate-changelog.mjs
// Ne pas modifier manuellement

export const changelogContent = \`${escapedContent}\`
`

fs.writeFileSync(outputPath, output, 'utf-8')
console.log('✅ Changelog content generated successfully!')
