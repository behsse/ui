import { Suspense } from 'react'

export async function getChangelog() {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/behsse/ui/main/CHANGELOG.md',
      { next: { revalidate: 3600 } } // Revalider toutes les heures
    )
    if (!response.ok) throw new Error('Failed to fetch changelog')
    return await response.text()
  } catch (error) {
    console.error('Error fetching changelog:', error)
    return null
  }
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

function parseChangelog(content: string) {
  const lines = content.split('\n')
  const versions: any[] = []
  let currentVersion: any = null
  let currentSection: string | null = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Détecter une version (## vX.X.X)
    if (line.startsWith('## v')) {
      if (currentVersion) versions.push(currentVersion)

      const versionMatch = line.match(/## v(.*)/)
      // La date est sur la ligne suivante avec le format **DATE**
      let date = ''
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1].trim()
        const dateMatch = nextLine.match(/\*\*(.*?)\*\*/)
        if (dateMatch) {
          date = dateMatch[1]
        }
      }

      currentVersion = {
        version: versionMatch?.[1] || '',
        date: date,
        sections: {}
      }
      currentSection = null
    }
    // Détecter une section (### 🚀 New Features, ### 💅 Improvements, etc.)
    else if (line.startsWith('### ')) {
      // Enlever les emojis et nettoyer le texte
      currentSection = line.replace(/^### /, '').replace(/^[^\w\s]+\s*/, '').trim()
      if (currentVersion && currentSection) {
        currentVersion.sections[currentSection] = []
      }
    }
    // Ajouter le contenu à la section actuelle
    else if (line && currentVersion && currentSection) {
      if (line.startsWith('- ')) {
        currentVersion.sections[currentSection].push({
          type: 'item',
          content: line.replace('- ', '')
        })
      } else if (line.startsWith('  - ')) {
        // Sous-item
        const lastItem = currentVersion.sections[currentSection][currentVersion.sections[currentSection].length - 1]
        if (lastItem) {
          if (!lastItem.subItems) lastItem.subItems = []
          lastItem.subItems.push(line.replace('  - ', ''))
        }
      }
    }
  }

  if (currentVersion) versions.push(currentVersion)
  return versions
}

function getSectionColors(sectionName: string): { text: string, border: string } {
  const name = sectionName.toLowerCase()

  // Détection basée sur des mots-clés
  if (name.includes('feature') || name.includes('added') || name.includes('new')) {
    return { text: 'text-green-600 dark:text-green-400', border: 'border-green-600 dark:border-green-400' }
  }
  if (name.includes('improvement') || name.includes('changed') || name.includes('enhanced')) {
    return { text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-600 dark:border-blue-400' }
  }
  if (name.includes('fixed') || name.includes('fix') || name.includes('bug')) {
    return { text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-600 dark:border-orange-400' }
  }
  if (name.includes('removed') || name.includes('deprecated')) {
    return { text: 'text-red-600 dark:text-red-400', border: 'border-red-600 dark:border-red-400' }
  }
  if (name.includes('dependencies') || name.includes('dependency')) {
    return { text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-600 dark:border-purple-400' }
  }
  if (name.includes('security')) {
    return { text: 'text-yellow-600 dark:text-yellow-400', border: 'border-yellow-600 dark:border-yellow-400' }
  }
  if (name.includes('documentation') || name.includes('docs')) {
    return { text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-600 dark:border-cyan-400' }
  }
  if (name.includes('component')) {
    return { text: 'text-pink-600 dark:text-pink-400', border: 'border-pink-600 dark:border-pink-400' }
  }
  if (name.includes('coming soon') || name.includes('upcoming')) {
    return { text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-600 dark:border-indigo-400' }
  }
  if (name.includes('cli')) {
    return { text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-600 dark:border-amber-400' }
  }
  if (name.includes('icon') || name.includes('asset')) {
    return { text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-600 dark:border-violet-400' }
  }
  if (name.includes('website') || name.includes('site')) {
    return { text: 'text-teal-600 dark:text-teal-400', border: 'border-teal-600 dark:border-teal-400' }
  }

  // Couleur par défaut
  return { text: 'text-foreground', border: 'border-border' }
}

function formatContent(content: string) {
  // Remplacer les backticks par des <code>
  let formatted = content.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-muted">$1</code>')
  // Remplacer les ** par du gras
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  return formatted
}

async function ChangelogContent() {
  const changelogText = await getChangelog()

  if (!changelogText) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Unable to load changelog. Please try again later.</p>
      </div>
    )
  }

  const versions = parseChangelog(changelogText)

  return (
    <>
      {versions.map((version, vIndex) => (
        <div key={vIndex} className="grid gap-6" id={`v${version.version}`}>
          <div className="flex items-baseline gap-4">
            <h2 className='text-2xl font-bold'>v{version.version}</h2>
            <span className="text-sm text-muted-foreground">{version.date}</span>
            {vIndex === 0 && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                Latest
              </span>
            )}
          </div>

          <div className="grid gap-6">
            {Object.entries(version.sections).map(([sectionName, items]: [string, any]) => {
              const colors = getSectionColors(sectionName)

              return (
                <div key={sectionName} className="grid gap-3">
                  <h3 className={`text-lg font-semibold ${colors.text}`}>{sectionName}</h3>
                  <div className={`pl-4 border-l-2 ${colors.border}`}>
                    <ul className="grid gap-3 text-sm text-muted-foreground">
                      {items.map((item: any, idx: number) => (
                        <li key={idx}>
                          <div dangerouslySetInnerHTML={{ __html: formatContent(item.content) }} />
                          {item.subItems && item.subItems.length > 0 && (
                            <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                              {item.subItems.map((subItem: string, subIdx: number) => (
                                <li key={subIdx} dangerouslySetInnerHTML={{ __html: formatContent(subItem) }} />
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </>
  )
}

export default async function ChangelogPage() {
  return (
    <main className='grid gap-16 pb-20'>
      <div className="grid gap-4" id="changelog">
        <h1 className='text-4xl font-bold'>Changelog</h1>
        <p className="text-muted-foreground">All notable changes to behsseui will be documented on this page.</p>
      </div>

      <Suspense fallback={
        <div className="flex items-center justify-center py-10">
          <div className="animate-pulse text-muted-foreground">Loading changelog...</div>
        </div>
      }>
        <ChangelogContent />
      </Suspense>
    </main>
  )
}
