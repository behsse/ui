import { Button } from "@/ui/components/Button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/ui/components/Accordion"
import { Alert, AlertTitle, AlertDescription } from "@/ui/components/Alert"
import Info from "@/ui/icons/Info"
import AlertCircle from "@/ui/icons/AlertCircle"
import CheckCircle from "@/ui/icons/CheckCircle"
import AlertTriangle from "@/ui/icons/AlertTriangle"

// Previews pour chaque composant (preview principal)
export const componentPreviews: Record<string, React.ReactNode> = {
  button: (
    <Button>Button</Button>
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
    <div className="text-muted-foreground text-sm">
      Avatar preview - À ajouter
    </div>
  ),

  alert: (
    <Alert className="w-full max-w-md">
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
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
}
