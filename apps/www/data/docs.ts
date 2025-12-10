interface TOCItem {
  id: string
  text: string
  level: number
}

interface DocPage {
  title: string
  desc: string
  toc?: TOCItem[]
}

export const docPages: Record<string, DocPage> = {
  intro: {
    title: "Introduction",
    desc: "Bienvenue dans la documentation de behsseui",
    toc: [
      { id: "introduction", text: "Introduction", level: 2 },
      { id: "key-features", text: "Key features", level: 2 },
      { id: "pre-requisite", text: "Pre-requisite knowledge", level: 2 },
      { id: "next-steps", text: "Next steps", level: 2 },
      { id: "why-cli", text: "Why the CLI approach ?", level: 2 },
    ]
  },
  introduction: {
    title: "Introduction",
    desc: "Bienvenue dans la documentation de behsseui",
    toc: [
      { id: "overview", text: "Overview", level: 2 },
      { id: "philosophy", text: "Philosophy", level: 2 },
      { id: "features", text: "Features", level: 2 },
    ]
  },
  installation: {
    title: "Installation",
    desc: "Installez behsseui dans votre projet",
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "wyf", text: "With your framework", level: 2 },
      { id: "manual", text: "Manual", level: 2 },
    ]
  },
  cli: {
    title: "CLI",
    desc: "Utilisez la CLI behsseui pour gérer vos composants",
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "commands", text: "Commands", level: 2 },
      { id: "init", text: "init", level: 3 },
      { id: "add", text: "add", level: 3 },
    ]
  },
  nextjs : {
    title: "NextJS",
    desc: "",
    toc: [
      {id : "create", text: "Create project", level: 2},
      {id : "add", text: "Add components", level: 2},
    ]
  },
  vite : {
    title: "Vite",
    desc: "",
    toc: [
      {id : "create", text: "Create project", level: 2},
      {id : "add", text: "Add components", level: 2},
    ]
  },
  figma: {
    title: "Figma",
    desc: "Design with behsseui in Figma",
    toc: [
      { id: "design-in-figma", text: "Design in Figma", level: 2 },
      { id: "why-figma", text: "Why use our Figma Kit?", level: 2 },
      { id: "whats-included", text: "What's included?", level: 2 },
      { id: "get-started", text: "How to get started", level: 2 },
      { id: "for-developers", text: "For Developers", level: 2 },
    ]
  },
  changelog: {
    title: "Changelog",
    desc: "All notable changes to behsseui",
    toc: [
      { id: "changelog", text: "Changelog", level: 2 },
      { id: "v0.0.2", text: "Version 0.0.2", level: 2 },
      { id: "v0.0.1", text: "Version 0.0.1", level: 2 },
    ]
  }
}
