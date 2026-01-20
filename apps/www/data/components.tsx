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

const getAccordionPreview = () => (
  <div className="w-3/4 border border-border rounded-lg overflow-hidden">
    <div className="flex items-center justify-between py-2 px-3 border-b border-border">
      <div className="h-2 w-16 bg-foreground/80 rounded"></div>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground rotate-180">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
    <div className="py-2 px-3 border-b border-border">
      <div className="h-2 w-24 bg-muted-foreground/50 rounded"></div>
    </div>
    <div className="flex items-center justify-between py-2 px-3">
      <div className="h-2 w-16 bg-foreground/80 rounded"></div>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  </div>
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
  },
  accordion: {
    name: "Accordion",
    desc: "A vertically stacked set of interactive headings that reveal or hide associated content.",
    minimalPreview: getAccordionPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add Accordion"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add Accordion"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add Accordion"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add Accordion"
      }
    ],
    sourceFiles: [
      {
        file: "Accordion.tsx",
        path: "ui/components/Accordion.tsx",
      }
    ],
    examples: [
      {
        name: "Default",
        description: "A single accordion that allows only one item open at a time.",
        code: `<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content for section 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content for section 2</AccordionContent>
  </AccordionItem>
</Accordion>`
      },
      {
        name: "Multiple",
        description: "An accordion that allows multiple items to be open simultaneously.",
        code: `<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content for section 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content for section 2</AccordionContent>
  </AccordionItem>
</Accordion>`
      },
      {
        name: "Ghost",
        description: "An accordion without visible borders.",
        code: `<Accordion type="single" variant="ghost">
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content for section 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content for section 2</AccordionContent>
  </AccordionItem>
</Accordion>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "multiple", text: "Multiple", level: 3 },
      { id: "ghost", text: "Ghost", level: 3 },
    ]
  }
};
