import { Button } from "@/ui/components/Button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/ui/components/Accordion"
import { Alert, AlertTitle, AlertDescription } from "@/ui/components/Alert"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
} from "@/ui/components/AlertDialog"
import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup } from "@/ui/components/Avatar"
import { Badge } from "@/ui/components/Badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@/ui/components/Breadcrumb"
import { CalendarDemo } from "@/app/components/CalendarDemo"
import { CarouselDemo } from "@/app/components/CarouselDemo"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/ui/components/Card"
import { Checkbox } from "@/ui/components/Checkbox"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/ui/components/Dialog"
import Check from "@/ui/icons/Check"
import ArrowUpRight from "@/ui/icons/ArrowUpRight"
import Info from "@/ui/icons/Info"
import AlertCircle from "@/ui/icons/AlertCircle"
import CheckCircle from "@/ui/icons/CheckCircle"
import AlertTriangle from "@/ui/icons/AlertTriangle"

// Previews pour chaque composant (preview principal)
export const componentPreviews: Record<string, React.ReactNode> = {
  button: (
    <Button>Button</Button>
  ),

  badge: (
    <div className="flex items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),

  accordion: (
    <Accordion type="single" defaultValue="item-1" className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          Contenu de la section 1
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>
          Contenu de la section 2
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),

  avatar: (
    <Avatar>
      <AvatarImage src="/behsse-logo.jpg" alt="@behsse" />
      <AvatarFallback>B</AvatarFallback>
    </Avatar>
  ),

  alert: (
    <Alert className="w-full max-w-md">
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  ),

  alertdialog: (
    <AlertDialog>
      <AlertDialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
        Open Dialog
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),

  breadcrumb: (
    <Breadcrumb>
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
    </Breadcrumb>
  ),

  calendar: (
    <CalendarDemo />
  ),

  card: (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
    </Card>
  ),

  carousel: (
    <CarouselDemo />
  ),

  checkbox: (
    <Checkbox label="Accept terms" />
  ),

  dialog: (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog description.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// Exemples individuels pour les variants (utilisé dans la section Examples)
export const componentExamples: Record<string, Record<string, React.ReactNode>> = {
  button: {
    "Default": <Button>Default</Button>,
    "Secondary": <Button variant="secondary">Secondary</Button>,
    "Outline": <Button variant="outline">Outline</Button>,
    "Destructive": <Button variant="destructive">Destructive</Button>,
    "Ghost": <Button variant="ghost">Ghost</Button>,
    "Text": <Button variant="text">Text</Button>,
    "Small": <Button size="small">Small</Button>,
    "Large": <Button size="large">Large</Button>,
    "XL": <Button size="xl">Extra Large</Button>,
    "Icon": (
      <Button iconSize="default">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      </Button>
    ),
    "Icon Small": (
      <Button iconSize="small">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      </Button>
    ),
    "Icon Large": (
      <Button iconSize="large">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      </Button>
    ),
    "Icon XL": (
      <Button iconSize="xl">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      </Button>
    ),
    "AsChild": (
      <Button asChild>
        <a href="https://ui.behsse.com">Link</a>
      </Button>
    ),
  },
  badge: {
    "Variants": (
      <div className="flex items-center gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
      </div>
    ),
    "With Icons": (
      <div className="flex items-center gap-2">
        <Badge>
          <Check className="h-3 w-3 fill-primary-foreground" />
          Success
        </Badge>
        <Badge variant="destructive">
          Error
          <AlertCircle className="h-3 w-3" />
        </Badge>
      </div>
    ),
    "AsChild": (
      <Badge asChild>
        <a href="https://ui.behsse.com/docs/components/badge">
          Link Badge
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </Badge>
    ),
  },
  accordion: {
    "Default": (
      <Accordion type="single" defaultValue="item-1" className="w-full max-w-md">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content for section 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content for section 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    "Multiple": (
      <Accordion type="multiple" className="w-full max-w-md">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content for section 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content for section 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    "Ghost": (
      <Accordion type="single" variant="ghost" className="w-full max-w-md">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content for section 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content for section 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  alert: {
    "Default": (
      <Alert className="w-full max-w-md">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
      </Alert>
    ),
    "With Icon": (
      <Alert className="w-full max-w-md">
        <Info />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
      </Alert>
    ),
    "Destructive": (
      <Alert variant="destructive" className="w-full max-w-md">
        <AlertCircle />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
    ),
    "Success": (
      <Alert variant="success" className="w-full max-w-md">
        <CheckCircle />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved successfully.</AlertDescription>
      </Alert>
    ),
    "Warning": (
      <Alert variant="warning" className="w-full max-w-md">
        <AlertTriangle />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Your account is about to expire.</AlertDescription>
      </Alert>
    ),
    "Info": (
      <Alert variant="info" className="w-full max-w-md">
        <Info />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>A new version is available.</AlertDescription>
      </Alert>
    ),
  },
  avatar: {
    "Default": (
      <Avatar>
        <AvatarImage src="/behsse-logo.jpg" alt="@behsse" />
        <AvatarFallback>BH</AvatarFallback>
      </Avatar>
    ),
    "Fallback": (
      <Avatar>
        <AvatarImage src="" alt="@user" />
        <AvatarFallback>BH</AvatarFallback>
      </Avatar>
    ),
    "With Badge": (
      <Avatar>
        <AvatarImage src="/behsse-logo.jpg" alt="@behsse" />
        <AvatarFallback>BH</AvatarFallback>
        <AvatarBadge status="online" />
      </Avatar>
    ),
    "Badge with Icon": (
      <Avatar>
        <AvatarImage src="/behsse-logo.jpg" alt="@behsse" />
        <AvatarFallback>BH</AvatarFallback>
        <AvatarBadge status="online" className="h-4 w-4 bg-accent-foreground">
          <Check className="h-1.5 w-1.5 fill-accent" />
        </AvatarBadge>
      </Avatar>
    ),
    "Avatar Group": (
      <AvatarGroup>
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
      </AvatarGroup>
    ),
    "Avatar Group Count": (
      <AvatarGroup max={3}>
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
        <Avatar>
          <AvatarFallback>IJ</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>KL</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>MN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>OP</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>QR</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    ),
    "Sizes": (
      <div className="flex items-center gap-4">
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
      </div>
    ),
  },
  alertdialog: {
    "Default": (
      <AlertDialog>
        <AlertDialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
          Open
        </AlertDialogTrigger>
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
      </AlertDialog>
    ),
    "Controlled": (
      <AlertDialog>
        <AlertDialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-destructive text-destructive-foreground shadow hover:bg-destructive/90 h-9 px-4 py-2">
          Delete Account
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your account? All of your data will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
  },
  breadcrumb: {
    "Default": (
      <Breadcrumb>
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
      </Breadcrumb>
    ),
    "With Custom Separator": (
      <Breadcrumb>
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
      </Breadcrumb>
    ),
    "With Ellipsis": (
      <Breadcrumb>
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
      </Breadcrumb>
    ),
  },
  calendar: {
    "Default": <CalendarDemo />,
    "Date Range": <CalendarDemo mode="range" />,
    "Multiple Dates": <CalendarDemo mode="multiple" />,
    "With Disabled Dates": <CalendarDemo variant="disabled" />,
    "With Booked Dates": <CalendarDemo variant="booked" />,
    "With Min and Max": <CalendarDemo variant="minmax" />,
    "With Default Selected": <CalendarDemo variant="defaultSelected" />,
    "Range with Default": <CalendarDemo variant="rangeDefault" />,
    "Controlled Mode": <CalendarDemo />,
  },
  card: {
    "Default": (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content</p>
        </CardContent>
      </Card>
    ),
    "With Footer": (
      <Card className="w-full max-w-sm">
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
      </Card>
    ),
    "Simple": (
      <Card className="w-full max-w-sm">
        <CardContent className="pt-6">
          <p>A simple card with only content.</p>
        </CardContent>
      </Card>
    ),
  },
  carousel: {
    "Default": <CarouselDemo />,
    "Two Per View": <CarouselDemo variant="two" />,
    "Three Per View": <CarouselDemo variant="three" />,
    "Autoplay": <CarouselDemo variant="autoplay" />,
    "Loop": <CarouselDemo variant="loop" />,
    "With Dots": <CarouselDemo variant="dots" />,
    "Vertical": <CarouselDemo variant="vertical" />,
  },
  checkbox: {
    "Default": <Checkbox />,
    "With Label": <Checkbox label="Accept terms and conditions" />,
    "Checked": <Checkbox defaultChecked label="I agree" />,
    "Disabled": <Checkbox disabled label="Disabled" />,
    "Disabled Checked": <Checkbox disabled defaultChecked label="Disabled checked" />,
    "Group": (
      <div className="flex flex-col gap-3">
        <Checkbox label="Option 1" />
        <Checkbox label="Option 2" />
        <Checkbox label="Option 3" />
      </div>
    ),
  },
  dialog: {
    "Default": (
      <Dialog>
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
      </Dialog>
    ),
    "With Form": (
      <Dialog>
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
      </Dialog>
    ),
  },
}
