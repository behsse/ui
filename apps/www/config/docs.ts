import { components } from "@/data/components"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

// Générer dynamiquement la liste des composants depuis components.ts
const componentNavItems: NavItemWithChildren[] = Object.keys(components)
  .sort((a, b) => components[a].name.localeCompare(components[b].name))
  .map((slug) => ({
    title: components[slug].name,
    href: `/docs/components/${slug}`,
    items: [],
  }))

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components",
    },
    {
      title: "Examples",
      href: "/examples",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs/intro",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
        {
          title: "Components",
          href: "/docs/components",
          items: [],
        },
        {
          title: "Figma",
          href: "/docs/figma",
          items: [],
        },
        {
          title: "Changelog",
          href: "/docs/changelog",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: componentNavItems,
    },
  ],
}
