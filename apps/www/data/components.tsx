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
      <div className="h-2.5 w-20 bg-foreground/80 rounded"></div>
      <div className="h-2 w-28 bg-muted-foreground/50 rounded"></div>
    </div>
    <div className="flex justify-end gap-2 mt-3">
      <div className="h-5 w-12 bg-muted rounded"></div>
      <div className="h-5 w-14 bg-primary rounded"></div>
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
  }
};
