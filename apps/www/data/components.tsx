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

const getAlertPreview = () => (
  <div className="w-3/4 border border-border rounded-lg p-3 flex items-start gap-2">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground mt-0.5 shrink-0">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
    <div className="flex-1 space-y-1">
      <div className="h-2 w-12 bg-foreground/80 rounded"></div>
      <div className="h-2 w-20 bg-muted-foreground/50 rounded"></div>
    </div>
  </div>
)

const getAvatarPreview = () => (
  <div className="flex items-center gap-2">
    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
      AB
    </div>
  </div>
)

const getAlertDialogPreview = () => (
  <div className="w-3/4 border border-border rounded-lg p-3 bg-background shadow-lg">
    <div className="space-y-2">
      <div className="h-2 w-20 bg-foreground/80 rounded"></div>
      <div className="h-2 w-28 bg-muted-foreground/50 rounded"></div>
    </div>
    <div className="flex justify-end gap-2 mt-3">
      <div className="h-3.5 w-12 bg-muted rounded"></div>
      <div className="h-3.5 w-12 bg-primary rounded"></div>
    </div>
  </div>
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

const getBadgePreview = () => (
  <div className="flex items-center gap-2">
    <div className="h-4 w-15 rounded-full bg-primary"></div>
    <div className="h-4 w-15 rounded-full bg-secondary"></div>
    <div className="h-4 w-15 rounded-full bg-destructive"></div>
  </div>
)

const getBreadcrumbPreview = () => (
  <div className="flex items-center gap-1.5 text-sm">
    <div className="h-2 w-8 bg-muted-foreground/50 rounded"></div>
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
      <path d="m9 18 6-6-6-6" />
    </svg>
    <div className="h-2 w-10 bg-muted-foreground/50 rounded"></div>
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
      <path d="m9 18 6-6-6-6" />
    </svg>
    <div className="h-2 w-12 bg-foreground/80 rounded"></div>
  </div>
)

const getCalendarPreview = () => (
  <div className="w-3/4 border border-border rounded-lg p-4 bg-background">
    <div className="flex items-center justify-between mb-4">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
        <path d="m15 18-6-6 6-6" />
      </svg>
      <div className="h-2 w-14 bg-foreground/80 rounded"></div>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
        <path d="m9 18 6-6-6-6" />
      </svg>
    </div>
    <div className="grid grid-cols-8 gap-2">
      {[...Array(7)].map((_, i) => (
        <div key={`h-${i}`} className="h-2 w-2 bg-muted-foreground/30 rounded-sm"></div>
      ))}
      {[...Array(14)].map((_, i) => (
        <div key={i} className={`h-2 w-2 rounded-sm ${i === 8 ? 'bg-primary' : 'bg-muted'}`}></div>
      ))}
    </div>
  </div>
)

const getCardPreview = () => (
  <div className="w-3/4 border border-border rounded-lg p-3 bg-card grid gap-5">
    <div className="space-y-1 grid gap-1">
      <div className="h-2 w-16 bg-foreground/80 rounded"></div>
      <div className="h-2 w-24 bg-muted-foreground/50 rounded"></div>
    </div>
    <div className="h-2 w-20 bg-muted-foreground/30 rounded"></div>
  </div>
)

const getCarouselPreview = () => (
  <div className="w-3/4">
    <div className="relative">
      <div className="flex gap-2 overflow-hidden">
        <div className="h-16 w-full bg-primary/20 rounded-lg shrink-0"></div>
      </div>
      <div className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-background border border-border flex items-center justify-center">
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-background border border-border flex items-center justify-center">
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>
    </div>
    <div className="flex justify-center gap-1 mt-2">
      <div className="h-1.5 w-3 bg-primary rounded-full"></div>
      <div className="h-1.5 w-1.5 bg-muted-foreground/30 rounded-full"></div>
      <div className="h-1.5 w-1.5 bg-muted-foreground/30 rounded-full"></div>
    </div>
  </div>
)

const getCheckboxPreview = () => (
  <div className="flex items-center gap-2">
    <div className="h-4 w-4 rounded-[3px] border border-primary bg-primary flex items-center justify-center">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-primary-foreground">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </div>
    <span className="text-sm">Label</span>
  </div>
)

const getDialogPreview = () => (
  <div className="w-3/4 rounded-lg border bg-card p-4 shadow-sm">
    <div className="space-y-1">
      <div className="h-2 w-20 bg-foreground/80 rounded"></div>
      <div className="h-2 w-32 bg-muted-foreground/50 rounded"></div>
    </div>
    <div className="flex justify-end gap-2 mt-4">
      <div className="h-6 w-14 bg-muted rounded"></div>
      <div className="h-6 w-14 bg-primary rounded"></div>
    </div>
  </div>
)

const getDropdownMenuPreview = () => (
  <div className="w-3/4 border border-border rounded-md bg-popover p-1 shadow-sm">
    <div className="flex items-center rounded-sm px-2 py-1 bg-accent/50">
      <div className="h-2 w-14 bg-foreground/80 rounded"></div>
    </div>
    <div className="flex items-center rounded-sm px-2 py-1">
      <div className="h-2 w-12 bg-muted-foreground/50 rounded"></div>
    </div>
    <div className="my-0.5 h-px bg-border"></div>
    <div className="flex items-center justify-between rounded-sm px-2 py-1">
      <div className="h-2 w-10 bg-muted-foreground/50 rounded"></div>
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
        <path d="m9 18 6-6-6-6" />
      </svg>
    </div>
  </div>
)

const getDrawerPreview = () => (
  <div className="w-3/4 relative">
    <div className="border border-border rounded-lg bg-background p-3 shadow-sm">
      <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-muted-foreground/30"></div>
      <div className="space-y-1">
        <div className="h-2 w-16 bg-foreground/80 rounded"></div>
        <div className="h-2 w-24 bg-muted-foreground/50 rounded"></div>
      </div>
      <div className="mt-3 h-6 w-full bg-muted rounded"></div>
    </div>
  </div>
)

const getInputOTPPreview = () => (
  <div className="flex items-center gap-1">
    <div className="flex">
      <div className="h-7 w-7 rounded-l-md border border-input flex items-center justify-center text-xs font-medium">1</div>
      <div className="h-7 w-7 border-y border-r border-input flex items-center justify-center text-xs font-medium">2</div>
      <div className="h-7 w-7 rounded-r-md border-y border-r border-input flex items-center justify-center text-xs font-medium">3</div>
    </div>
    <div className="w-2 flex justify-center">
      <div className="h-0.5 w-2 bg-muted-foreground/50 rounded"></div>
    </div>
    <div className="flex">
      <div className="h-7 w-7 rounded-l-md border border-input flex items-center justify-center text-xs font-medium ring-2 ring-ring"></div>
      <div className="h-7 w-7 border-y border-r border-input"></div>
      <div className="h-7 w-7 rounded-r-md border-y border-r border-input"></div>
    </div>
  </div>
)

const getInputPreview = () => (
  <div className="w-3/4 h-7 rounded-md border border-input bg-transparent flex items-center px-2">
    <div className="h-1.5 w-14 bg-muted-foreground/30 rounded"></div>
  </div>
)

const getSelectPreview = () => (
  <div className="w-3/4 h-7 rounded-md border border-input bg-transparent flex items-center justify-between px-2">
    <div className="h-1.5 w-14 bg-muted-foreground/30 rounded"></div>
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
      <path d="m6 9 6 6 6-6" />
    </svg>
  </div>
)

const getHoverCardPreview = () => (
  <div className="w-3/4 relative">
    <div className="h-3 w-16 bg-primary/60 rounded mx-auto"></div>
    <div className="mt-1 border border-border rounded-md bg-popover p-2 shadow-sm">
      <div className="flex items-center gap-2 mb-1.5">
        <div className="h-6 w-6 rounded-full bg-muted"></div>
        <div className="space-y-0.5">
          <div className="h-1.5 w-12 bg-foreground/80 rounded"></div>
          <div className="h-1.5 w-16 bg-muted-foreground/50 rounded"></div>
        </div>
      </div>
      <div className="h-1.5 w-full bg-muted-foreground/30 rounded"></div>
    </div>
  </div>
)

const getPaginationPreview = () => (
  <div className="flex items-center gap-1">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
      <path d="m15 18-6-6 6-6" />
    </svg>
    <div className="h-5 w-5 rounded bg-primary/20 border border-border"></div>
    <div className="h-5 w-5 rounded bg-primary text-[8px] text-primary-foreground flex items-center justify-center font-medium">2</div>
    <div className="h-5 w-5 rounded bg-primary/20 border border-border"></div>
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-muted-foreground">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
      <path d="m9 18 6-6-6-6" />
    </svg>
  </div>
)

const getProgressPreview = () => (
  <div className="w-3/4 space-y-2">
    <div className="h-2 w-full rounded-full bg-primary/20 overflow-hidden">
      <div className="h-full w-3/5 rounded-full bg-primary"></div>
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
        name: "Small",
        description: "A smaller button with reduced padding.",
        code: '<Button size="small">Small</Button>'
      },
      {
        name: "Large",
        description: "A larger button with increased padding.",
        code: '<Button size="large">Large</Button>'
      },
      {
        name: "XL",
        description: "An extra large button.",
        code: '<Button size="xl">Extra Large</Button>'
      },
      {
        name: "Icon",
        description: "A square button for icons.",
        code: '<Button iconSize="default">\n  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>\n</Button>'
      },
      {
        name: "Icon Small",
        description: "A small square button for icons.",
        code: '<Button iconSize="small">\n  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>\n</Button>'
      },
      {
        name: "Icon Large",
        description: "A large square button for icons.",
        code: '<Button iconSize="large">\n  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>\n</Button>'
      },
      {
        name: "Icon XL",
        description: "An extra large square button for icons.",
        code: '<Button iconSize="xl">\n  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>\n</Button>'
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
      { id : "small", text : "Small", level : 3},
      { id : "large", text : "Large", level : 3},
      { id : "xl", text : "XL", level : 3},
      { id : "icon", text : "Icon", level : 3},
      { id : "icon-small", text : "Icon Small", level : 3},
      { id : "icon-large", text : "Icon Large", level : 3},
      { id : "icon-xl", text : "Icon XL", level : 3},
      { id : "aschild", text : "AsChild", level : 3},
    ]
  },
  badge: {
    name: "Badge",
    desc: "Displays a badge or a component that looks like a badge.",
    minimalPreview: getBadgePreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add Badge"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add Badge"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add Badge"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add Badge"
      }
    ],
    sourceFiles: [
      {
        file: "Badge.tsx",
        path: "ui/components/Badge.tsx",
      },
      {
        file: "Slot.tsx",
        path: "ui/components/internals/Slot.tsx",
        description: "For Badge.tsx to work, create an internals folder inside ui/component, then create a Slot.tsx file in it with the following code."
      }
    ],
    examples: [
      {
        name: "Variants",
        description: "Different badge variants for various contexts.",
        code: `<div className="flex items-center gap-2">
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="ghost">Ghost</Badge>
</div>`
      },
      {
        name: "With Icons",
        description: "Badges can include icons at the start or end.",
        code: `import Check from "@/ui/icons/Check"
import AlertCircle from "@/ui/icons/AlertCircle"

<div className="flex items-center gap-2">
  <Badge>
    <Check className="h-3 w-3" />
    Success
  </Badge>
  <Badge variant="destructive">
    Error
    <AlertCircle className="h-3 w-3" />
  </Badge>
</div>`
      },
      {
        name: "AsChild",
        description: "Use the asChild prop to render the badge as a link or other element.",
        code: `import ArrowUpRight from "@/ui/icons/ArrowUpRight"

<Badge asChild>
  <a href="https://ui.behsse.com">
    Link Badge
    <ArrowUpRight className="h-3 w-3" />
  </a>
</Badge>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "variants", text: "Variants", level: 3 },
      { id: "with icons", text: "With Icons", level: 3 },
      { id: "aschild", text: "AsChild", level: 3 },
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
  },
  alert: {
    name: "Alert",
    desc: "Displays a callout for user attention with contextual feedback messages.",
    minimalPreview: getAlertPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add Alert"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add Alert"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add Alert"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add Alert"
      }
    ],
    sourceFiles: [
      {
        file: "Alert.tsx",
        path: "ui/components/Alert.tsx",
      },
      {
        file: "Slot.tsx",
        path: "ui/components/internals/Slot.tsx",
        description: "For Alert.tsx to work, create an internals folder inside ui/component, then create a Slot.tsx file in it with the following code."
      }
    ],
    examples: [
      {
        name: "Default",
        description: "A default alert for general information.",
        code: `<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
</Alert>`
      },
      {
        name: "With Icon",
        description: "An alert with an icon. Place the icon component as the first child of Alert.",
        code: `import Info from "@/ui/icons/Info"

<Alert>
  <Info />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
</Alert>`
      },
      {
        name: "Destructive",
        description: "An alert for error or destructive messages.",
        code: `import AlertCircle from "@/ui/icons/AlertCircle"

<Alert variant="destructive">
  <AlertCircle />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
</Alert>`
      },
      {
        name: "Success",
        description: "An alert for success messages.",
        code: `import CheckCircle from "@/ui/icons/CheckCircle"

<Alert variant="success">
  <CheckCircle />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your changes have been saved successfully.</AlertDescription>
</Alert>`
      },
      {
        name: "Warning",
        description: "An alert for warning messages.",
        code: `import AlertTriangle from "@/ui/icons/AlertTriangle"

<Alert variant="warning">
  <AlertTriangle />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Your account is about to expire.</AlertDescription>
</Alert>`
      },
      {
        name: "Info",
        description: "An alert for informational messages.",
        code: `import Info from "@/ui/icons/Info"

<Alert variant="info">
  <Info />
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>A new version is available.</AlertDescription>
</Alert>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "with-icon", text: "With Icon", level: 3 },
      { id: "destructive", text: "Destructive", level: 3 },
      { id: "success", text: "Success", level: 3 },
      { id: "warning", text: "Warning", level: 3 },
      { id: "info", text: "Info", level: 3 },
    ]
  },
  alertdialog: {
    name: "Alert Dialog",
    desc: "A modal dialog that interrupts the user with important content and expects a response.",
    minimalPreview: getAlertDialogPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add AlertDialog"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add AlertDialog"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add AlertDialog"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add AlertDialog"
      }
    ],
    sourceFiles: [
      {
        file: "AlertDialog.tsx",
        path: "ui/components/AlertDialog.tsx",
      }
    ],
    examples: [
      {
        name: "Default",
        description: "A basic alert dialog with title, description and action buttons.",
        code: `<AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`
      },
      {
        name: "Controlled",
        description: "An alert dialog with controlled open state.",
        code: `const [open, setOpen] = useState(false)

<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger>Delete Account</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete Account</AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure you want to delete your account? All of your data will be permanently removed.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => console.log("Deleted")}>
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "controlled", text: "Controlled", level: 3 },
    ]
  },
  avatar: {
    name: "Avatar",
    desc: "An image element with a fallback for representing the user.",
    minimalPreview: getAvatarPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add Avatar"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add Avatar"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add Avatar"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add Avatar"
      }
    ],
    sourceFiles: [
      {
        file: "Avatar.tsx",
        path: "ui/components/Avatar.tsx",
      }
    ],
    examples: [
      {
        name: "Default",
        description: "An avatar with an image and fallback.",
        code: `<Avatar>
  <AvatarImage src="/behsse-logo.jpg" alt="@behsse" />
  <AvatarFallback>BH</AvatarFallback>
</Avatar>`
      },
      {
        name: "Fallback",
        description: "An avatar showing only the fallback (when image fails or is not provided).",
        code: `<Avatar>
  <AvatarImage src="" alt="@user" />
  <AvatarFallback>BH</AvatarFallback>
</Avatar>`
      },
      {
        name: "With Badge",
        description: "An avatar with a status badge indicator.",
        code: `<Avatar>
  <AvatarImage src="/behsse-logo.jpg" alt="@behsse" />
  <AvatarFallback>BH</AvatarFallback>
  <AvatarBadge status="online" />
</Avatar>`
      },
      {
        name: "Badge with Icon",
        description: "An avatar with a badge containing an icon.",
        code: `import Check from "@/ui/icons/Check"

<Avatar>
  <AvatarImage src="/behsse-logo.jpg" alt="@behsse" />
  <AvatarFallback>BH</AvatarFallback>
  <AvatarBadge status="online" className="h-4 w-4 bg-accent-foreground">
    <Check className="h-1.5 w-1.5 fill-accent" />
  </AvatarBadge>
</Avatar>`
      },
      {
        name: "Avatar Group",
        description: "Multiple avatars stacked together.",
        code: `<AvatarGroup>
  <Avatar>
    <AvatarImage src="/behsse-logo.jpg" alt="@behsse" />
    <AvatarFallback>BH</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>AB</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>CD</AvatarFallback>
  </Avatar>
</AvatarGroup>`
      },
      {
        name: "Avatar Group Count",
        description: "An avatar group with a maximum count, showing remaining avatars as a number.",
        code: `<AvatarGroup max={3}>
  <Avatar>
    <AvatarImage src="/behsse-logo.jpg" alt="@behsse" />
    <AvatarFallback>BH</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>AB</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>CD</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>EF</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>GH</AvatarFallback>
  </Avatar>
  {/* ... more avatars */}
</AvatarGroup>`
      },
      {
        name: "Sizes",
        description: "Avatars come in different sizes: sm, default, lg, and xl.",
        code: `<div className="flex items-center gap-4">
  <Avatar size="sm">
    <AvatarImage src="/behsse-logo.jpg" alt="@behsse" />
    <AvatarFallback>BH</AvatarFallback>
  </Avatar>
  <Avatar size="default">
    <AvatarImage src="/behsse-logo.jpg" alt="@behsse" />
    <AvatarFallback>BH</AvatarFallback>
  </Avatar>
  <Avatar size="lg">
    <AvatarImage src="/behsse-logo.jpg" alt="@behsse" />
    <AvatarFallback>BH</AvatarFallback>
  </Avatar>
  <Avatar size="xl">
    <AvatarImage src="/behsse-logo.jpg" alt="@behsse" />
    <AvatarFallback>BH</AvatarFallback>
  </Avatar>
</div>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "fallback", text: "Fallback", level: 3 },
      { id: "with badge", text: "With Badge", level: 3 },
      { id: "badge with icon", text: "Badge with Icon", level: 3 },
      { id: "avatar group", text: "Avatar Group", level: 3 },
      { id: "avatar group count", text: "Avatar Group Count", level: 3 },
      { id: "sizes", text: "Sizes", level: 3 },
    ]
  },
  breadcrumb: {
    name: "Breadcrumb",
    desc: "Displays the path to the current resource using a hierarchy of links.",
    minimalPreview: getBreadcrumbPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add Breadcrumb"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add Breadcrumb"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add Breadcrumb"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add Breadcrumb"
      }
    ],
    sourceFiles: [
      {
        file: "Breadcrumb.tsx",
        path: "ui/components/Breadcrumb.tsx",
      },
      {
        file: "ChevronRight.tsx",
        path: "ui/icons/ChevronRight.tsx",
        description: "The Breadcrumb component uses ChevronRight as the default separator icon."
      }
    ],
    examples: [
      {
        name: "Default",
        description: "A basic breadcrumb with links and a current page.",
        code: `<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
  </BreadcrumbItem>
</Breadcrumb>`
      },
      {
        name: "With Custom Separator",
        description: "Use a custom separator instead of the default chevron.",
        code: `<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator>/</BreadcrumbSeparator>
  <BreadcrumbItem>
    <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator>/</BreadcrumbSeparator>
  <BreadcrumbItem>
    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
  </BreadcrumbItem>
</Breadcrumb>`
      },
      {
        name: "With Ellipsis",
        description: "Use ellipsis to collapse long breadcrumb paths.",
        code: `<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbEllipsis />
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
  </BreadcrumbItem>
</Breadcrumb>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "with custom separator", text: "With Custom Separator", level: 3 },
      { id: "with ellipsis", text: "With Ellipsis", level: 3 },
    ]
  },
  calendar: {
    name: "Calendar",
    desc: "A date picker component with support for single date, date range, and multiple dates selection.",
    minimalPreview: getCalendarPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add Calendar"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add Calendar"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add Calendar"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add Calendar"
      }
    ],
    sourceFiles: [
      {
        file: "Calendar.tsx",
        path: "ui/components/Calendar.tsx",
      },
      {
        file: "ChevronLeft.tsx",
        path: "ui/icons/ChevronLeft.tsx",
        description: "Navigation icon for previous month."
      },
      {
        file: "ChevronRight.tsx",
        path: "ui/icons/ChevronRight.tsx",
        description: "Navigation icon for next month."
      }
    ],
    examples: [
      {
        name: "Default",
        description: "A basic calendar for single date selection. Works without any state management - just render it!",
        code: `<Calendar />`
      },
      {
        name: "Date Range",
        description: "Select a range of dates (from - to). No external state needed.",
        code: `<Calendar mode="range" />`
      },
      {
        name: "Multiple Dates",
        description: "Select multiple individual dates.",
        code: `<Calendar mode="multiple" />`
      },
      {
        name: "With Disabled Dates",
        description: "Disable specific dates or use a function to determine disabled dates.",
        code: `// Disable the 15th and 20th of the current month
const now = new Date()
const year = now.getFullYear()
const month = now.getMonth()

<Calendar
  disabled={[
    new Date(year, month, 15),
    new Date(year, month, 20),
  ]}
/>`
      },
      {
        name: "With Booked Dates",
        description: "Show dates as booked (strikethrough) and make them unselectable.",
        code: `// Mark dates as booked (10th, 11th, 12th)
const now = new Date()
const year = now.getFullYear()
const month = now.getMonth()

<Calendar
  booked={[
    new Date(year, month, 10),
    new Date(year, month, 11),
    new Date(year, month, 12),
  ]}
/>`
      },
      {
        name: "With Min and Max",
        description: "Restrict selection to a specific date range.",
        code: `// Only allow selection between 5th and 25th of current month
const now = new Date()
const year = now.getFullYear()
const month = now.getMonth()

<Calendar
  min={new Date(year, month, 5)}
  max={new Date(year, month, 25)}
/>`
      },
      {
        name: "With Default Selected",
        description: "Set an initial selected date without controlling the state.",
        code: `// Today's date is pre-selected
<Calendar defaultSelected={new Date()} />`
      },
      {
        name: "Range with Default",
        description: "Set an initial date range.",
        code: `// Pre-select a range from 10th to 15th of current month
const now = new Date()
const year = now.getFullYear()
const month = now.getMonth()

<Calendar
  mode="range"
  defaultSelected={{
    from: new Date(year, month, 10),
    to: new Date(year, month, 15),
  }}
/>`
      },
      {
        name: "Controlled Mode",
        description: "For full control, pass selected and onSelect props.",
        code: `const [date, setDate] = useState<Date | null>(null)

<Calendar
  selected={date}
  onSelect={setDate}
/>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "date range", text: "Date Range", level: 3 },
      { id: "multiple dates", text: "Multiple Dates", level: 3 },
      { id: "with disabled dates", text: "With Disabled Dates", level: 3 },
      { id: "with booked dates", text: "With Booked Dates", level: 3 },
      { id: "with min and max", text: "With Min and Max", level: 3 },
      { id: "with default selected", text: "With Default Selected", level: 3 },
      { id: "range with default", text: "Range with Default", level: 3 },
      { id: "controlled mode", text: "Controlled Mode", level: 3 },
    ]
  },
  card: {
    name: "Card",
    desc: "A container component for grouping related content and actions.",
    minimalPreview: getCardPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add Card"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add Card"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add Card"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add Card"
      }
    ],
    sourceFiles: [
      {
        file: "Card.tsx",
        path: "ui/components/Card.tsx",
      }
    ],
    examples: [
      {
        name: "Default",
        description: "A basic card with header, title, description and content.",
        code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
</Card>`
      },
      {
        name: "With Footer",
        description: "A card with a footer section for actions.",
        code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card with a footer section.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`
      },
      {
        name: "Simple",
        description: "A simple card with only content.",
        code: `<Card>
  <CardContent className="pt-6">
    <p>A simple card with only content.</p>
  </CardContent>
</Card>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "with footer", text: "With Footer", level: 3 },
      { id: "simple", text: "Simple", level: 3 },
    ]
  },
  carousel: {
    name: "Carousel",
    desc: "A slideshow component for cycling through elements with navigation controls and touch/drag support.",
    minimalPreview: getCarouselPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add Carousel"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add Carousel"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add Carousel"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add Carousel"
      }
    ],
    sourceFiles: [
      {
        file: "Carousel.tsx",
        path: "ui/components/Carousel.tsx",
      },
      {
        file: "ChevronLeft.tsx",
        path: "ui/icons/ChevronLeft.tsx",
        description: "Navigation icon for previous slide."
      },
      {
        file: "ChevronRight.tsx",
        path: "ui/icons/ChevronRight.tsx",
        description: "Navigation icon for next slide."
      }
    ],
    examples: [
      {
        name: "Default",
        description: "A basic carousel showing one slide at a time with arrow navigation and drag support.",
        code: `<Carousel className="w-full max-w-md">
  <CarouselContent>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 1</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 2</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 3</div>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`
      },
      {
        name: "Two Per View",
        description: "Show two slides at a time.",
        code: `<Carousel slidesPerView={2} spaceBetween={16} className="w-full max-w-lg">
  <CarouselContent>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 1</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 2</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 3</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 4</div>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`
      },
      {
        name: "Three Per View",
        description: "Show three slides at a time.",
        code: `<Carousel slidesPerView={3} spaceBetween={12} className="w-full max-w-2xl">
  <CarouselContent>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 1</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 2</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 3</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 4</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 5</div>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`
      },
      {
        name: "Autoplay",
        description: "Automatically cycle through slides. Combine with loop for infinite scrolling.",
        code: `<Carousel autoplay autoplayDelay={3000} loop className="w-full max-w-md">
  <CarouselContent>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 1</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 2</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 3</div>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`
      },
      {
        name: "Loop",
        description: "Enable infinite looping through slides.",
        code: `<Carousel loop className="w-full max-w-md">
  <CarouselContent>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 1</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 2</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 3</div>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`
      },
      {
        name: "With Dots",
        description: "Add dot indicators for navigation.",
        code: `<Carousel className="w-full max-w-md">
  <CarouselContent>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 1</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 2</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg">Slide 3</div>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
  <CarouselDots />
</Carousel>`
      },
      {
        name: "Vertical",
        description: "A vertical carousel that scrolls up and down. Set a fixed height on the container.",
        code: `<Carousel direction="vertical" className="w-full max-w-md h-[300px]">
  <CarouselContent>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg h-full flex items-center justify-center">Slide 1</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg h-full flex items-center justify-center">Slide 2</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 bg-muted rounded-lg h-full flex items-center justify-center">Slide 3</div>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "two per view", text: "Two Per View", level: 3 },
      { id: "three per view", text: "Three Per View", level: 3 },
      { id: "autoplay", text: "Autoplay", level: 3 },
      { id: "loop", text: "Loop", level: 3 },
      { id: "with dots", text: "With Dots", level: 3 },
      { id: "vertical", text: "Vertical", level: 3 },
    ]
  },
  checkbox: {
    name: "Checkbox",
    desc: "A control that allows the user to toggle between checked and unchecked states.",
    minimalPreview: getCheckboxPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add Checkbox"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add Checkbox"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add Checkbox"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add Checkbox"
      }
    ],
    sourceFiles: [
      {
        file: "Checkbox.tsx",
        path: "ui/components/Checkbox.tsx",
      },
      {
        file: "Check.tsx",
        path: "ui/icons/Check.tsx",
        description: "Check icon displayed when checkbox is checked."
      }
    ],
    examples: [
      {
        name: "Default",
        description: "A basic checkbox without a label.",
        code: `<Checkbox />`
      },
      {
        name: "With Label",
        description: "A checkbox with an associated label.",
        code: `<Checkbox label="Accept terms and conditions" />`
      },
      {
        name: "Checked",
        description: "A checkbox that starts in a checked state.",
        code: `<Checkbox defaultChecked label="I agree" />`
      },
      {
        name: "Disabled",
        description: "A disabled checkbox that cannot be interacted with.",
        code: `<Checkbox disabled label="Disabled" />`
      },
      {
        name: "Disabled Checked",
        description: "A disabled checkbox in a checked state.",
        code: `<Checkbox disabled defaultChecked label="Disabled checked" />`
      },
      {
        name: "Group",
        description: "Multiple checkboxes grouped together allowing users to select multiple options.",
        code: `<div className="flex flex-col gap-3">
  <Checkbox label="Option 1" />
  <Checkbox label="Option 2" />
  <Checkbox label="Option 3" />
</div>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "with label", text: "With Label", level: 3 },
      { id: "checked", text: "Checked", level: 3 },
      { id: "disabled", text: "Disabled", level: 3 },
      { id: "disabled checked", text: "Disabled Checked", level: 3 },
      { id: "group", text: "Group", level: 3 },
    ]
  },
  dialog: {
    name: "Dialog",
    desc: "A modal dialog that opens in the center of the screen, used to display content that requires user attention.",
    minimalPreview: getDialogPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add Dialog"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add Dialog"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add Dialog"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add Dialog"
      }
    ],
    sourceFiles: [
      {
        file: "Dialog.tsx",
        path: "ui/components/Dialog.tsx",
      },
      {
        file: "Close.tsx",
        path: "ui/icons/Close.tsx",
        description: "Close icon for the dialog."
      }
    ],
    examples: [
      {
        name: "Default",
        description: "A basic dialog with a title, description, and action buttons.",
        code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        This is a dialog description that explains what this dialog is about.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Continue</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`
      },
      {
        name: "With Form",
        description: "A dialog containing a form for user input.",
        code: `<Dialog>
  <DialogTrigger asChild>
    <Button>Edit Profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="name" className="text-right text-sm">Name</label>
        <input id="name" defaultValue="John Doe" className="col-span-3 h-9 rounded-md border border-input bg-background px-3 text-sm" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="email" className="text-right text-sm">Email</label>
        <input id="email" defaultValue="john@example.com" className="col-span-3 h-9 rounded-md border border-input bg-background px-3 text-sm" />
      </div>
    </div>
    <DialogFooter>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "with form", text: "With Form", level: 3 },
    ]
  },
  drawer: {
    name: "Drawer",
    desc: "A panel that slides in from the edge of the screen, with drag-to-dismiss support on the entire surface.",
    minimalPreview: getDrawerPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add Drawer"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add Drawer"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add Drawer"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add Drawer"
      }
    ],
    sourceFiles: [
      {
        file: "Drawer.tsx",
        path: "ui/components/Drawer.tsx",
      }
    ],
    examples: [
      {
        name: "Default",
        description: "A basic drawer opening from the right side. Drag anywhere on the panel to dismiss.",
        code: `<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer Title</DrawerTitle>
      <DrawerDescription>
        This is a drawer description.
      </DrawerDescription>
    </DrawerHeader>
    <DrawerBody>
      <p>Drawer body content goes here.</p>
    </DrawerBody>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`
      },
      {
        name: "Bottom with Handle",
        description: "A bottom drawer with an optional visual handle bar. Drag anywhere on the panel to dismiss.",
        code: `<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Bottom Drawer</Button>
  </DrawerTrigger>
  <DrawerContent side="bottom" overlay>
    <DrawerHandle />
    <DrawerHeader>
      <DrawerTitle>Bottom Drawer</DrawerTitle>
      <DrawerDescription>
        Drag anywhere on the panel to close.
      </DrawerDescription>
    </DrawerHeader>
    <DrawerBody>
      <p>This drawer slides up from the bottom. Drag down anywhere to dismiss.</p>
    </DrawerBody>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Close</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`
      },
      {
        name: "Left Side",
        description: "A drawer opening from the left side. Drag left anywhere to dismiss.",
        code: `<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Left Drawer</Button>
  </DrawerTrigger>
  <DrawerContent side="left">
    <DrawerHeader>
      <DrawerTitle>Navigation</DrawerTitle>
      <DrawerDescription>
        Browse through the menu.
      </DrawerDescription>
    </DrawerHeader>
    <DrawerBody>
      <nav className="flex flex-col gap-2">
        <a href="#" className="text-sm hover:underline">Home</a>
        <a href="#" className="text-sm hover:underline">About</a>
        <a href="#" className="text-sm hover:underline">Contact</a>
      </nav>
    </DrawerBody>
  </DrawerContent>
</Drawer>`
      },
      {
        name: "With Overlay",
        description: "A drawer with a dark overlay backdrop. Drag or click overlay to dismiss.",
        code: `<Drawer>
  <DrawerTrigger asChild>
    <Button>Open with Overlay</Button>
  </DrawerTrigger>
  <DrawerContent overlay>
    <DrawerHeader>
      <DrawerTitle>Overlay Drawer</DrawerTitle>
      <DrawerDescription>
        Click the overlay or drag to close.
      </DrawerDescription>
    </DrawerHeader>
    <DrawerBody>
      <p>This drawer has a dark backdrop overlay behind it.</p>
    </DrawerBody>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
      <Button>Confirm</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "bottom with handle", text: "Bottom with Handle", level: 3 },
      { id: "left side", text: "Left Side", level: 3 },
      { id: "with overlay", text: "With Overlay", level: 3 },
    ]
  },
  dropdownmenu: {
    name: "Dropdown Menu",
    desc: "A menu that appears on click, with support for submenus, labels, separators and keyboard shortcuts.",
    minimalPreview: getDropdownMenuPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add DropdownMenu"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add DropdownMenu"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add DropdownMenu"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add DropdownMenu"
      }
    ],
    sourceFiles: [
      {
        file: "DropdownMenu.tsx",
        path: "ui/components/DropdownMenu.tsx",
      },
      {
        file: "ChevronRight.tsx",
        path: "ui/icons/ChevronRight.tsx",
        description: "Used for the submenu trigger indicator."
      }
    ],
    examples: [
      {
        name: "Default",
        description: "A basic dropdown menu with items.",
        code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`
      },
      {
        name: "With Shortcuts",
        description: "Menu items with keyboard shortcut hints.",
        code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      New Tab
      <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      New Window
      <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem disabled>
      New Private Window
      <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`
      },
      {
        name: "With Submenu",
        description: "A dropdown with a submenu that opens on hover.",
        code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Back</DropdownMenuItem>
    <DropdownMenuItem>Forward</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>More Tools</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Save Page As...</DropdownMenuItem>
        <DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Developer</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Inspect Element</DropdownMenuItem>
            <DropdownMenuItem>Console</DropdownMenuItem>
            <DropdownMenuItem>Network</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`
      },
      {
        name: "With Groups",
        description: "Organize items into labeled groups with separators.",
        code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Settings</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
    <DropdownMenuGroup>
      <DropdownMenuItem>Theme</DropdownMenuItem>
      <DropdownMenuItem>Font Size</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuLabel>Account</DropdownMenuLabel>
    <DropdownMenuGroup>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Security</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "with shortcuts", text: "With Shortcuts", level: 3 },
      { id: "with submenu", text: "With Submenu", level: 3 },
      { id: "with groups", text: "With Groups", level: 3 },
    ]
  },
  select: {
    name: "Select",
    desc: "A dropdown control that allows users to pick a value from a list of options.",
    minimalPreview: getSelectPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add Select"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add Select"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add Select"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add Select"
      }
    ],
    sourceFiles: [
      {
        file: "Select.tsx",
        path: "ui/components/Select.tsx",
      },
      {
        file: "ChevronDown.tsx",
        path: "ui/icons/ChevronDown.tsx",
        description: "Chevron icon for the select trigger."
      },
      {
        file: "Check.tsx",
        path: "ui/icons/Check.tsx",
        description: "Check icon displayed next to the selected item."
      }
    ],
    examples: [
      {
        name: "Default",
        description: "A basic select with a list of options.",
        code: `<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
    <SelectItem value="grape">Grape</SelectItem>
    <SelectItem value="pineapple">Pineapple</SelectItem>
  </SelectContent>
</Select>`
      },
      {
        name: "With Groups",
        description: "Items organized into labeled groups with separators.",
        code: `<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select food" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="orange">Orange</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Vegetables</SelectLabel>
      <SelectItem value="carrot">Carrot</SelectItem>
      <SelectItem value="broccoli">Broccoli</SelectItem>
      <SelectItem value="spinach">Spinach</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`
      },
      {
        name: "Disabled",
        description: "A disabled select that cannot be interacted with.",
        code: `<Select disabled>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectContent>
</Select>`
      },
      {
        name: "Disabled Items",
        description: "A select with some items disabled.",
        code: `<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana" disabled>Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
    <SelectItem value="grape" disabled>Grape</SelectItem>
    <SelectItem value="pineapple">Pineapple</SelectItem>
  </SelectContent>
</Select>`
      },
      {
        name: "With Label",
        description: "A select with an external label.",
        code: `<div className="grid w-full max-w-sm gap-1.5">
  <label htmlFor="framework" className="text-sm font-medium">Framework</label>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Select a framework" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="next">Next.js</SelectItem>
      <SelectItem value="remix">Remix</SelectItem>
      <SelectItem value="astro">Astro</SelectItem>
      <SelectItem value="nuxt">Nuxt</SelectItem>
    </SelectContent>
  </Select>
</div>`
      },
      {
        name: "Controlled",
        description: "A fully controlled select with external state.",
        code: `const [value, setValue] = useState("")

<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>
<p className="text-sm text-muted-foreground">Selected: {value || "(none)"}</p>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "with groups", text: "With Groups", level: 3 },
      { id: "disabled", text: "Disabled", level: 3 },
      { id: "disabled items", text: "Disabled Items", level: 3 },
      { id: "with label", text: "With Label", level: 3 },
      { id: "controlled", text: "Controlled", level: 3 },
    ]
  },
  inputotp: {
    name: "Input OTP",
    desc: "A one-time password input component for verification codes with support for grouping, separators, and pattern validation.",
    minimalPreview: getInputOTPPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add InputOTP"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add InputOTP"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add InputOTP"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add InputOTP"
      }
    ],
    sourceFiles: [
      {
        file: "InputOTP.tsx",
        path: "ui/components/InputOTP.tsx",
      }
    ],
    examples: [
      {
        name: "Default",
        description: "A 6-digit OTP input in a single group.",
        code: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`
      },
      {
        name: "With Separator",
        description: "Two groups of 3 digits separated by a dash.",
        code: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`
      },
      {
        name: "Pattern",
        description: "Accept alphanumeric characters instead of digits only.",
        code: `<InputOTP maxLength={6} pattern="[0-9a-zA-Z]">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`
      },
      {
        name: "Disabled",
        description: "A disabled OTP input that cannot be interacted with.",
        code: `<InputOTP maxLength={6} disabled>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`
      },
      {
        name: "With Placeholder",
        description: "Show dots as placeholder in empty slots.",
        code: `<InputOTP maxLength={6} placeholder="\u25CF">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`
      },
      {
        name: "Controlled",
        description: "Fully controlled OTP input with external state management.",
        code: `const [value, setValue] = useState("")

<InputOTP maxLength={6} value={value} onChange={setValue}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
<p className="text-sm text-muted-foreground">Value: {value || "(empty)"}</p>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "with separator", text: "With Separator", level: 3 },
      { id: "pattern", text: "Pattern", level: 3 },
      { id: "disabled", text: "Disabled", level: 3 },
      { id: "with placeholder", text: "With Placeholder", level: 3 },
      { id: "controlled", text: "Controlled", level: 3 },
    ]
  },
  input: {
    name: "Input",
    desc: "A form input field for collecting user text data.",
    minimalPreview: getInputPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add Input"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add Input"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add Input"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add Input"
      }
    ],
    sourceFiles: [
      {
        file: "Input.tsx",
        path: "ui/components/Input.tsx",
      }
    ],
    examples: [
      {
        name: "Default",
        description: "A simple input with a placeholder.",
        code: `<Input placeholder="Enter your email" />`
      },
      {
        name: "With Label",
        description: "An input with an associated label element.",
        code: `<div className="grid w-full max-w-sm gap-1.5">
  <label htmlFor="email" className="text-sm font-medium">Email</label>
  <Input id="email" type="email" placeholder="Email" />
</div>`
      },
      {
        name: "Types",
        description: "Inputs support all native HTML input types.",
        code: `<div className="grid w-full max-w-sm gap-4">
  <Input type="email" placeholder="Email" />
  <Input type="password" placeholder="Password" />
  <Input type="number" placeholder="Number" />
  <Input type="tel" placeholder="Phone" />
  <Input type="url" placeholder="URL" />
</div>`
      },
      {
        name: "Disabled",
        description: "A disabled input that cannot be interacted with.",
        code: `<Input disabled placeholder="Disabled" />`
      },
      {
        name: "With Error",
        description: "An input styled to indicate a validation error.",
        code: `<div className="grid w-full max-w-sm gap-1.5">
  <label htmlFor="email-error" className="text-sm font-medium">Email</label>
  <Input id="email-error" type="email" placeholder="Email" className="border-destructive focus-visible:ring-destructive" />
  <p className="text-sm text-destructive">Please enter a valid email address.</p>
</div>`
      },
      {
        name: "With Icon",
        description: "An input with a search icon positioned inside.",
        code: `import Search from "@/ui/icons/Search"

<div className="relative w-full max-w-sm">
  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input className="pl-8" placeholder="Search..." />
</div>`
      },
      {
        name: "File",
        description: "A file input for uploading files.",
        code: `<div className="grid w-full max-w-sm gap-1.5">
  <label htmlFor="picture" className="text-sm font-medium">Picture</label>
  <Input id="picture" type="file" />
</div>`
      },
      {
        name: "Inline with Button",
        description: "An input inline with a button for subscribe-style forms.",
        code: `<div className="flex w-full max-w-sm gap-2">
  <Input type="email" placeholder="Email" />
  <Button>Subscribe</Button>
</div>`
      },
      {
        name: "Grid",
        description: "Two inputs side by side in a grid layout.",
        code: `<div className="grid grid-cols-2 w-full max-w-sm gap-4">
  <div className="grid gap-1.5">
    <label htmlFor="first" className="text-sm font-medium">First name</label>
    <Input id="first" placeholder="First name" />
  </div>
  <div className="grid gap-1.5">
    <label htmlFor="last" className="text-sm font-medium">Last name</label>
    <Input id="last" placeholder="Last name" />
  </div>
</div>`
      },
      {
        name: "Required",
        description: "A required input with a visual indicator.",
        code: `<div className="grid w-full max-w-sm gap-1.5">
  <label htmlFor="username" className="text-sm font-medium">
    Username <span className="text-destructive">*</span>
  </label>
  <Input id="username" placeholder="Username" required />
</div>`
      },
      {
        name: "With Prefix",
        description: "An input with a static prefix text.",
        code: `<div className="flex w-full max-w-sm">
  <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
    https://
  </span>
  <Input className="rounded-l-none" placeholder="example.com" />
</div>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "with label", text: "With Label", level: 3 },
      { id: "types", text: "Types", level: 3 },
      { id: "disabled", text: "Disabled", level: 3 },
      { id: "with error", text: "With Error", level: 3 },
      { id: "with icon", text: "With Icon", level: 3 },
      { id: "file", text: "File", level: 3 },
      { id: "inline with button", text: "Inline with Button", level: 3 },
      { id: "grid", text: "Grid", level: 3 },
      { id: "required", text: "Required", level: 3 },
      { id: "with prefix", text: "With Prefix", level: 3 },
    ]
  },
  hovercard: {
    name: "Hover Card",
    desc: "A card that appears on hover over a trigger element, with configurable positioning.",
    minimalPreview: getHoverCardPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add HoverCard"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add HoverCard"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add HoverCard"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add HoverCard"
      }
    ],
    sourceFiles: [
      {
        file: "HoverCard.tsx",
        path: "ui/components/HoverCard.tsx",
      }
    ],
    examples: [
      {
        name: "Default",
        description: "A hover card that appears below the trigger on hover.",
        code: `<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#" className="text-sm font-medium underline underline-offset-4">
      @behsse
    </a>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-full bg-muted" />
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">Behsse UI</h4>
        <p className="text-sm text-muted-foreground">
          A modern React component library.
        </p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`
      },
      {
        name: "Top",
        description: "Content appears above the trigger.",
        code: `<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#" className="text-sm font-medium underline underline-offset-4">
      Hover me (top)
    </a>
  </HoverCardTrigger>
  <HoverCardContent side="top">
    <p className="text-sm">This card appears above the trigger.</p>
  </HoverCardContent>
</HoverCard>`
      },
      {
        name: "Left",
        description: "Content appears to the left of the trigger.",
        code: `<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#" className="text-sm font-medium underline underline-offset-4">
      Hover me (left)
    </a>
  </HoverCardTrigger>
  <HoverCardContent side="left">
    <p className="text-sm">This card appears to the left.</p>
  </HoverCardContent>
</HoverCard>`
      },
      {
        name: "Right",
        description: "Content appears to the right of the trigger.",
        code: `<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#" className="text-sm font-medium underline underline-offset-4">
      Hover me (right)
    </a>
  </HoverCardTrigger>
  <HoverCardContent side="right">
    <p className="text-sm">This card appears to the right.</p>
  </HoverCardContent>
</HoverCard>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "top", text: "Top", level: 3 },
      { id: "left", text: "Left", level: 3 },
      { id: "right", text: "Right", level: 3 },
    ]
  },
  pagination: {
    name: "Pagination",
    desc: "Pagination with page navigation, previous and next controls.",
    minimalPreview: getPaginationPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add Pagination"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add Pagination"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add Pagination"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add Pagination"
      }
    ],
    sourceFiles: [
      {
        file: "Pagination.tsx",
        path: "ui/components/Pagination.tsx",
      },
      {
        file: "ChevronLeft.tsx",
        path: "ui/icons/ChevronLeft.tsx",
        description: "The Pagination component uses ChevronLeft for the previous button."
      },
      {
        file: "ChevronRight.tsx",
        path: "ui/icons/ChevronRight.tsx",
        description: "The Pagination component uses ChevronRight for the next button."
      }
    ],
    examples: [
      {
        name: "Default",
        description: "Basic pagination with previous, page numbers, ellipsis, and next.",
        code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`
      },
      {
        name: "With More Pages",
        description: "Pagination with ellipsis on both sides for large page sets.",
        code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">4</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>5</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">6</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">10</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`
      },
      {
        name: "First & Last",
        description: "Include dedicated first and last page buttons.",
        code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationLink href="#">« First</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>4</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">5</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">Last »</PaginationLink>
    </PaginationItem>
  </PaginationContent>
</Pagination>`
      },
      {
        name: "Simple",
        description: "Only previous and next buttons without page numbers.",
        code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`
      },
      {
        name: "With Icons Only",
        description: "Previous and next as icon-only buttons.",
        code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationLink href="#" size="icon" aria-label="Previous page">
        <ChevronLeft className="h-4 w-4" />
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" size="icon" aria-label="Next page">
        <ChevronRight className="h-4 w-4" />
      </PaginationLink>
    </PaginationItem>
  </PaginationContent>
</Pagination>`
      },
      {
        name: "Active States",
        description: "Different active page positions.",
        code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">4</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">5</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "with more pages", text: "With More Pages", level: 3 },
      { id: "first & last", text: "First & Last", level: 3 },
      { id: "simple", text: "Simple", level: 3 },
      { id: "with icons only", text: "With Icons Only", level: 3 },
      { id: "active states", text: "Active States", level: 3 },
    ]
  },
  progress: {
    name: "Progress",
    desc: "Displays an indicator showing the completion progress of a task.",
    minimalPreview: getProgressPreview(),
    commands: [
      {
        id: 1,
        name: "pnpm",
        command: "pnpm dlx behsseui@latest add Progress"
      },
      {
        id: 2,
        name: "npm",
        command: "npx behsseui@latest add Progress"
      },
      {
        id: 3,
        name: "yarn",
        command: "yarn behsseui@latest add Progress"
      },
      {
        id: 4,
        name: "bun",
        command: "bunx --bun behsseui@latest add Progress"
      }
    ],
    sourceFiles: [
      {
        file: "Progress.tsx",
        path: "ui/components/Progress.tsx",
      }
    ],
    examples: [
      {
        name: "Default",
        description: "A basic progress bar at 60%.",
        code: `<Progress value={60} />`
      },
      {
        name: "With Label",
        description: "Progress bar with a percentage label.",
        code: `<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Progress</span>
    <span>45%</span>
  </div>
  <Progress value={45} />
</div>`
      },
      {
        name: "Sizes",
        description: "Different progress bar heights.",
        code: `<div className="space-y-4 w-full">
  <Progress value={30} className="h-1" />
  <Progress value={50} className="h-2" />
  <Progress value={70} className="h-3" />
  <Progress value={90} className="h-4" />
</div>`
      },
      {
        name: "Colors",
        description: "Custom colors using className.",
        code: `<div className="space-y-4 w-full">
  <Progress value={60} />
  <Progress value={45} className="[&>div]:bg-green-500 bg-green-500/20" />
  <Progress value={75} className="[&>div]:bg-orange-500 bg-orange-500/20" />
  <Progress value={30} className="[&>div]:bg-destructive bg-destructive/20" />
</div>`
      },
      {
        name: "Empty",
        description: "Progress bar at 0%.",
        code: `<Progress value={0} />`
      },
      {
        name: "Complete",
        description: "Progress bar at 100%.",
        code: `<Progress value={100} />`
      }
    ],
    toc: [
      { id: "installation", text: "Installation", level: 2 },
      { id: "usage", text: "Usages", level: 2 },
      { id: "default", text: "Default", level: 3 },
      { id: "with label", text: "With Label", level: 3 },
      { id: "sizes", text: "Sizes", level: 3 },
      { id: "colors", text: "Colors", level: 3 },
      { id: "empty", text: "Empty", level: 3 },
      { id: "complete", text: "Complete", level: 3 },
    ]
  }
};
