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
  }
};
