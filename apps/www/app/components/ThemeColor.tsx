"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, DrawerClose } from "./Drawer"
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from './Dropdown'
import { Button } from '@/ui/components/Button'
import X from "@/ui/icons/X"

// Configuration des thèmes avec leurs couleurs
// Ces valeurs correspondent aux variables CSS dans global.css
const themeConfigs = {
    default: {
        label: 'Default',
        colors: {
            light: {
                primary: 'oklch(0.205 0 0)',
                foreground: 'oklch(0.145 0 0)',
                destructive: 'oklch(0.577 0.245 27.325)',
                border: 'oklch(0.922 0 0)'
            },
            dark: {
                primary: 'oklch(0.922 0 0)',
                foreground: 'oklch(0.985 0 0)',
                destructive: 'oklch(0.704 0.191 22.216)',
                border: 'oklch(1 0 0 / 10%)'
            }
        }
    },
    claude: {
        label: 'Claude',
        colors: {
            light: {
                primary: 'oklch(0.6171 0.1375 39.0427)',
                foreground: 'oklch(0.3438 0.0269 95.7226)',
                destructive: 'oklch(0.1908 0.0020 106.5859)',
                border: 'oklch(0.8847 0.0069 97.3627)'
            },
            dark: {
                primary: 'oklch(0.6724 0.1308 38.7559)',
                foreground: 'oklch(0.8074 0.0142 93.0137)',
                destructive: 'oklch(0.6368 0.2078 25.3313)',
                border: 'oklch(0.3618 0.0101 106.8928)'
            }
        }
    }
} as const

type ThemeName = keyof typeof themeConfigs

const ThemeColor = () => {
    const { theme, setTheme } = useTheme()
    const [selectedTheme, setSelectedTheme] = useState<ThemeName>('default')

    // Appliquer l'attribut data-theme au HTML
    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', selectedTheme)
        }
    }, [selectedTheme])

    const handleThemeChange = (newTheme: ThemeName) => {
        setSelectedTheme(newTheme)
    }

    // Obtenir les couleurs en fonction du mode actuel (light/dark)
    const getColors = (themeName: ThemeName) => {
        const mode = theme === 'dark' ? 'dark' : 'light'
        return themeConfigs[themeName].colors[mode]
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline" size="icon">
                    <div className="flex flex-col gap-1 p-1">
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-foreground"></div>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-destructive"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-border"></div>
                        </div>
                    </div>
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader className='flex items-center justify-between'>
                    <DrawerTitle>Theme Customizer</DrawerTitle>
                    <DrawerClose asChild>
                        <Button variant="ghost" size="icon"><X/></Button>
                    </DrawerClose>
                </DrawerHeader>
                <DrawerBody className="h-full">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-medium mb-3">Mode</h3>
                            <div className="flex gap-3">
                                <Button
                                    onClick={() => setTheme('light')}
                                    variant="outline"
                                    className={theme === 'light' ? 'bg-accent border border-border hover:bg-accent' : ''}
                                >
                                    Light
                                </Button>
                                <Button
                                    onClick={() => setTheme('dark')}
                                    variant="outline"
                                    className={theme === 'dark' ? 'bg-accent border border-border hover:bg-accent' : ''}
                                >
                                    Dark
                                </Button>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium mb-3">Theme</h3>
                            <Dropdown
                                key={`${theme}-${selectedTheme}`}
                                defaultValue={selectedTheme}
                                defaultLabel={
                                    <div className="flex gap-2 items-center">
                                        <div className="flex flex-col gap-1 p-1 border border-border rounded-md">
                                            <div className="flex gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getColors(selectedTheme).primary }}></div>
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getColors(selectedTheme).foreground }}></div>
                                            </div>
                                            <div className="flex gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getColors(selectedTheme).destructive }}></div>
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getColors(selectedTheme).border }}></div>
                                            </div>
                                        </div>
                                        <p>{themeConfigs[selectedTheme].label}</p>
                                    </div>
                                }
                                onValueChange={(value) => handleThemeChange(value as ThemeName)}
                            >
                                <DropdownTrigger>Choisir un thème</DropdownTrigger>
                                <DropdownContent className="grid gap-1">
                                    {(Object.keys(themeConfigs) as ThemeName[]).map((themeName) => {
                                        const colors = getColors(themeName)

                                        return (
                                            <DropdownItem key={themeName} value={themeName}>
                                                <div className="flex gap-2 items-center">
                                                    <div className="flex flex-col gap-1 p-1 border border-border rounded-md">
                                                        <div className="flex gap-1">
                                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.foreground }}></div>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.destructive }}></div>
                                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.border }}></div>
                                                        </div>
                                                    </div>
                                                    <p>{themeConfigs[themeName].label}</p>
                                                </div>
                                            </DropdownItem>
                                        )
                                    })}
                                </DropdownContent>
                            </Dropdown>
                        </div>
                    </div>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default ThemeColor