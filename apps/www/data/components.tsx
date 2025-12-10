import React from "react"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface SourceFile {
  file: string
  path: string
  description?: string
}

interface Example {
  name: string // Nom de l'exemple (ex: "Primary", "Outline", "Secondary")
  description?: string // Description optionnelle
  code: string // Code de l'exemple (ex: '<Button variant="outline">Outline</Button>')
}

interface Component {
  name: string
  desc: string
  commands : {
    id : number,
    name : string,
    command : string
  }[]
  sourceFiles?: (string | SourceFile)[]
  examples?: Example[] // Exemples avec variants
  minimalPreview?: React.ReactNode // Aperçu visuel minimaliste pour la page de liste
  toc?: TOCItem[]
}

// Fonction pour générer les previews (évite les problèmes de HMR)
const getButtonPreview = () => (
  <div className="rounded-md bg-primary text-primary-foreground text-sm font-medium w-2/4 h-1/3"></div>
)

export const components: Record<string, Component> = {
  button: {
    name : "Button",
    desc : "Buttons allow the user to take actions or make choices.",
    minimalPreview: getButtonPreview(),
    commands : [
      {
        id: 1,
        name : "pnpm",
        command : "pnpm dlx behsseui@latest add Button"
      },
      {
        id: 2,
        name : "npm",
        command : "npx behsseui@latest add Button"
      },
      {
        id: 3,
        name : "yarn",
        command : "yarn behsseui@latest add Button"
      },
      {
        id: 4,
        name : "bun",
        command : "bunx --bun behsseui@latest add Button"
      }
    ],
    sourceFiles: [
      {
        file: "Button.tsx",
        path: "ui/components/Button.tsx",
      },
      {
        file: "Slot.tsx",
        path: "ui/components/internals/Slot.tsx",
        description: "For Button.tsx to work, create an internals folder inside ui/component, then create a Slot.tsx file in it with the following code."
      }
    ],
    examples: [
      {
        name: "Default",
        code: '<Button>Default</Button>'
      },
      {
        name: "Secondary",
        code: '<Button variant="secondary">Secondary</Button>'
      },
      {
        name: "Outline",
        code: '<Button variant="outline">Outline</Button>'
      },
      {
        name: "Destructive",
        code: '<Button variant="destructive">Destructive</Button>'
      },
      {
        name: "Ghost",
        code: '<Button variant="ghost">Ghost</Button>'
      },
      {
        name: "Text",
        code: '<Button variant="text">Text</Button>'
      },
      {
        name: "AsChild",
        code: '<Button asChild>\n  <a href="https://ui.behsse.com">Link</a>\n</Button>'
      }
    ],
    toc : [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id : "default", text : "Default", level : 3},
      { id : "secondary", text : "Secondary", level : 3},
      { id : "outline", text : "Outline", level : 3},
      { id : "destructive", text : "Destructive", level : 3},
      { id : "ghost", text : "Ghost", level : 3},
      { id : "text", text : "Text", level : 3},
      { id : "aschild", text : "AsChild", level : 3},
    ]
  }
};
