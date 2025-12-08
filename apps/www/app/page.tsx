import { Button } from "../ui/components/Button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/Accordion";
import CommandCode from "./components/CommandCode";
import ThemeColor from "./components/ThemeColor";

export default function Home() {
  return (
    <div className="px-8">
      <Button asChild>
        <a href="/components-list">Components list</a>
      </Button>
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1" defaultOpen>
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>
            Contenu de la section 1
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" defaultOpen>
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>
            Contenu de la section 2
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
