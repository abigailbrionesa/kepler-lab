import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ReactNode } from "react";

type DraggableMenuItemProps = {
  accordionValue: string;
  title: string | ReactNode;
  subtitle?: string;
  children: ReactNode;
};

export default function DraggableMenuItem({
  accordionValue,
  title,
  subtitle,
  children,
}: DraggableMenuItemProps) {
  return (
    <AccordionItem value={accordionValue} className="border-b-0">
      <AccordionTrigger className="py-2 hover:no-underline">
        <div className="flex flex-col items-start text-left">
          <h3 className="text-sm font-medium">{title}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}
