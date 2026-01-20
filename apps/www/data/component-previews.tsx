import { Button } from "@/ui/components/Button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/ui/components/Accordion"

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
}
