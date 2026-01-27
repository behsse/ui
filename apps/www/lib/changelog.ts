import { changelogContent } from '@/data/changelog-content'

// Retourne le contenu du changelog
export function getChangelog() {
  return changelogContent
}

export function generateChangelogTOC(content: string) {
  const lines = content.split('\n')
  const toc: { id: string; text: string; level: number }[] = [
    { id: 'changelog', text: 'Changelog', level: 2 }
  ]

  for (const line of lines) {
    if (line.trim().startsWith('## v')) {
      const versionMatch = line.match(/## v(.*)/)
      if (versionMatch) {
        const version = versionMatch[1].trim()
        toc.push({
          id: `v${version}`,
          text: `Version ${version}`,
          level: 2
        })
      }
    }
  }

  return toc
}
