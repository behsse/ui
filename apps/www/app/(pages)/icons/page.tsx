"use client"

import { useState, useMemo } from 'react'
import { Drawer, DrawerContent, DrawerBody, DrawerClose } from '@/app/components/Drawer'
import { IconSearch } from '@/app/components/IconSearch'
import Close from '@/ui/icons/Close'
import CommandCode from '@/app/components/CommandCode'
import { icons, type Icon } from '@/data/icons'

const IconsPage = () => {
  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleIconClick = (icon: Icon) => {
    setSelectedIcon(icon)
    setIsDrawerOpen(true)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // Filtrer les icons en fonction de la recherche (lettre par lettre depuis le début)
  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return icons
    return icons.filter(icon =>
      icon.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold">Icons</h1>
        <IconSearch totalIcons={icons.length} onSearch={handleSearch} />
      </div>

      {filteredIcons.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">No icons found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-14 xl:grid-cols-16 gap-2 sm:gap-4">
          {filteredIcons.map((icon) => {
            const IconComponent = icon.component
            return (
              <button
                key={icon.name}
                onClick={() => handleIconClick(icon)}
                className="group relative flex flex-col items-center justify-center p-3 sm:p-3 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/50 transition-all cursor-pointer aspect-square"
              >
                <div className="flex items-center justify-center">
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Drawer pour afficher les détails de l'icon */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent side="bottom" overlay className="h-auto sm:h-[40vh] max-h-[80vh] border-dashed">
          <DrawerBody className="p-4 sm:p-6 md:p-10 h-full overflow-y-auto">
            {selectedIcon && (
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 h-full sm:justify-center">
                {/* Preview de l'icon */}
                <div className="shrink-0 flex justify-center sm:h-full">
                  <div className="flex items-center justify-center p-6 border border-border rounded-lg bg-card w-24 h-24 sm:w-auto sm:aspect-square sm:h-full">
                    <selectedIcon.component className="w-10 h-10 sm:w-16 sm:h-16" />
                  </div>
                </div>

                {/* Contenu principal */}
                <div className="flex flex-col justify-center gap-2 flex-1 sm:max-w-md lg:max-w-lg">
                  {/* Nom et version */}
                  <div className='grid gap-1 sm:gap-2 text-center sm:text-left'>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">{selectedIcon.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Version {selectedIcon.version}</p>
                  </div>

                  {/* Code à copier */}
                  <div className="w-full mt-2 sm:mt-4">
                    <CommandCode
                      fileName="CLI"
                      components={[
                        {
                          id: 1,
                          name: "pnpm",
                          command: `pnpm dlx behsseui@latest add -i ${selectedIcon.name}`
                        },
                        {
                          id: 2,
                          name: "npm",
                          command: `npx behsseui@latest add -i ${selectedIcon.name}`
                        },
                        {
                          id: 3,
                          name: "yarn",
                          command: `yarn behsseui@latest add -i ${selectedIcon.name}`
                        },
                        {
                          id: 4,
                          name: "bun",
                          command: `bunx --bun behsseui@latest add -i ${selectedIcon.name}`
                        }
                      ]}
                    />
                  </div>
                </div>

                {/* Bouton de fermeture */}
                <div className="shrink-0 absolute top-4 right-4 sm:relative sm:top-0 sm:right-0">
                  <DrawerClose asChild>
                    <button className="p-2 hover:bg-accent rounded-md transition-colors cursor-pointer">
                      <Close className="w-4 h-4" />
                    </button>
                  </DrawerClose>
                </div>
              </div>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default IconsPage
