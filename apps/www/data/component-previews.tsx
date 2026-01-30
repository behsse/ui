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
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerHandle
} from "@/ui/components/Drawer"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuGroup
} from "@/ui/components/DropdownMenu"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from "@/ui/components/HoverCard"
import { Input } from "@/ui/components/Input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator
} from "@/ui/components/Select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from "@/ui/components/Pagination"
import { Progress } from "@/ui/components/Progress"
import { InputOTPDemo } from "@/app/components/InputOTPDemo"
import Search from "@/ui/icons/Search"
import ChevronLeft from "@/ui/icons/ChevronLeft"
import ChevronRight from "@/ui/icons/ChevronRight"
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

  dropdownmenu: (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),

  drawer: (
    <Drawer>
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
    </Drawer>
  ),

  select: (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  ),

  input: (
    <Input placeholder="Enter your email" className="max-w-sm" />
  ),

  inputotp: (
    <InputOTPDemo />
  ),

  hovercard: (
    <HoverCard>
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
    </HoverCard>
  ),

  pagination: (
    <Pagination>
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
    </Pagination>
  ),

  progress: (
    <Progress value={60} className="w-3/4" />
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
  dropdownmenu: {
    "Default": (
      <DropdownMenu>
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
      </DropdownMenu>
    ),
    "With Shortcuts": (
      <DropdownMenu>
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
      </DropdownMenu>
    ),
    "With Submenu": (
      <DropdownMenu>
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
      </DropdownMenu>
    ),
    "With Groups": (
      <DropdownMenu>
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
      </DropdownMenu>
    ),
  },
  drawer: {
    "Default": (
      <Drawer>
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
      </Drawer>
    ),
    "Bottom with Handle": (
      <Drawer>
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
      </Drawer>
    ),
    "Left Side": (
      <Drawer>
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
      </Drawer>
    ),
    "With Overlay": (
      <Drawer>
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
      </Drawer>
    ),
  },
  select: {
    "Default": (
      <Select>
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
      </Select>
    ),
    "With Groups": (
      <Select>
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
      </Select>
    ),
    "Disabled": (
      <Select disabled>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    ),
    "Disabled Items": (
      <Select>
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
      </Select>
    ),
    "With Label": (
      <div className="grid w-full max-w-sm gap-1.5">
        <label className="text-sm font-medium">Framework</label>
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
      </div>
    ),
    "Controlled": (
      <Select defaultValue="apple">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  inputotp: {
    "Default": <InputOTPDemo />,
    "With Separator": <InputOTPDemo variant="separator" />,
    "Pattern": <InputOTPDemo variant="alphanumeric" />,
    "Disabled": <InputOTPDemo variant="disabled" />,
    "With Placeholder": <InputOTPDemo variant="placeholder" />,
    "Controlled": <InputOTPDemo variant="controlled" />,
  },
  input: {
    "Default": (
      <Input placeholder="Enter your email" />
    ),
    "With Label": (
      <div className="grid w-full max-w-sm gap-1.5">
        <label htmlFor="email-label" className="text-sm font-medium">Email</label>
        <Input id="email-label" type="email" placeholder="Email" />
      </div>
    ),
    "Types": (
      <div className="grid w-full max-w-sm gap-4">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="number" placeholder="Number" />
        <Input type="tel" placeholder="Phone" />
        <Input type="url" placeholder="URL" />
      </div>
    ),
    "Disabled": (
      <Input disabled placeholder="Disabled" />
    ),
    "With Error": (
      <div className="grid w-full max-w-sm gap-1.5">
        <label htmlFor="email-err" className="text-sm font-medium">Email</label>
        <Input id="email-err" type="email" placeholder="Email" className="border-destructive focus-visible:ring-destructive" />
        <p className="text-sm text-destructive">Please enter a valid email address.</p>
      </div>
    ),
    "With Icon": (
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-8" placeholder="Search..." />
      </div>
    ),
    "File": (
      <div className="grid w-full max-w-sm gap-1.5">
        <label htmlFor="picture" className="text-sm font-medium">Picture</label>
        <Input id="picture" type="file" />
      </div>
    ),
    "Inline with Button": (
      <div className="flex w-full max-w-sm gap-2">
        <Input type="email" placeholder="Email" />
        <Button>Subscribe</Button>
      </div>
    ),
    "Grid": (
      <div className="grid grid-cols-2 w-full max-w-sm gap-4">
        <div className="grid gap-1.5">
          <label htmlFor="first" className="text-sm font-medium">First name</label>
          <Input id="first" placeholder="First name" />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="last" className="text-sm font-medium">Last name</label>
          <Input id="last" placeholder="Last name" />
        </div>
      </div>
    ),
    "Required": (
      <div className="grid w-full max-w-sm gap-1.5">
        <label htmlFor="username-req" className="text-sm font-medium">
          Username <span className="text-destructive">*</span>
        </label>
        <Input id="username-req" placeholder="Username" required />
      </div>
    ),
    "With Prefix": (
      <div className="flex w-full max-w-sm">
        <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
          https://
        </span>
        <Input className="rounded-l-none" placeholder="example.com" />
      </div>
    ),
  },
  hovercard: {
    "Default": (
      <HoverCard>
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
      </HoverCard>
    ),
    "Top": (
      <HoverCard>
        <HoverCardTrigger asChild>
          <a href="#" className="text-sm font-medium underline underline-offset-4">
            Hover me (top)
          </a>
        </HoverCardTrigger>
        <HoverCardContent side="top">
          <p className="text-sm">This card appears above the trigger.</p>
        </HoverCardContent>
      </HoverCard>
    ),
    "Left": (
      <HoverCard>
        <HoverCardTrigger asChild>
          <a href="#" className="text-sm font-medium underline underline-offset-4">
            Hover me (left)
          </a>
        </HoverCardTrigger>
        <HoverCardContent side="left">
          <p className="text-sm">This card appears to the left.</p>
        </HoverCardContent>
      </HoverCard>
    ),
    "Right": (
      <HoverCard>
        <HoverCardTrigger asChild>
          <a href="#" className="text-sm font-medium underline underline-offset-4">
            Hover me (right)
          </a>
        </HoverCardTrigger>
        <HoverCardContent side="right">
          <p className="text-sm">This card appears to the right.</p>
        </HoverCardContent>
      </HoverCard>
    ),
  },
  pagination: {
    "Default": (
      <Pagination>
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
      </Pagination>
    ),
    "With More Pages": (
      <Pagination>
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
      </Pagination>
    ),
    "First & Last": (
      <Pagination>
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
      </Pagination>
    ),
    "Simple": (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
    "With Icons Only": (
      <Pagination>
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
      </Pagination>
    ),
    "Active States": (
      <Pagination>
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
      </Pagination>
    ),
  },
  progress: {
    "Default": (
      <Progress value={60} className="w-full max-w-sm" />
    ),
    "With Label": (
      <div className="space-y-2 w-full max-w-sm">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>45%</span>
        </div>
        <Progress value={45} />
      </div>
    ),
    "Sizes": (
      <div className="space-y-4 w-full max-w-sm">
        <Progress value={30} className="h-1" />
        <Progress value={50} className="h-2" />
        <Progress value={70} className="h-3" />
        <Progress value={90} className="h-4" />
      </div>
    ),
    "Colors": (
      <div className="space-y-4 w-full max-w-sm">
        <Progress value={60} />
        <Progress value={45} className="[&>div]:bg-green-500 bg-green-500/20" />
        <Progress value={75} className="[&>div]:bg-orange-500 bg-orange-500/20" />
        <Progress value={30} className="[&>div]:bg-destructive bg-destructive/20" />
      </div>
    ),
    "Empty": (
      <Progress value={0} className="w-full max-w-sm" />
    ),
    "Complete": (
      <Progress value={100} className="w-full max-w-sm" />
    ),
  },
}
