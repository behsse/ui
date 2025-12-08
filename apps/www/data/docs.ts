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
  }
}
