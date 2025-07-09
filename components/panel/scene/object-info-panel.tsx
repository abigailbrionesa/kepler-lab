"use client";
import { Accordion } from "@/components/ui/shadcn/accordion";
import DraggablePanel from "@/components/ui/draggable-menu";
import DraggableMenuItem from "@/components/ui/draggable-menu-item";
import { useSelectedPlanet } from "@/context/scene/view-selected-planet";

export function ObjectInfoPanel({
  dragConstraints,
}: {
  dragConstraints: React.RefObject<HTMLDivElement | null>;
}) {
  const { selectedPlanet } = useSelectedPlanet();

  return (
    <DraggablePanel
      dragConstraints={dragConstraints}
      title={<span className="uppercase text-3xl">{selectedPlanet || "Planet"}</span>}
      position="left-1/2 top-1/2"
      transparent={false}
    >
      <div className="flex flex-col justify-between items-center px-4 pt-1 pb-1">
        <h2 className="text-sm font-medium ">{selectedPlanet}</h2>

        <p className="text-sm font-medium">Information about</p>
      </div>

      <Accordion type="multiple" className="w-full">
        <DraggableMenuItem accordionValue={"hola"} title={"title"}>
          <div className="pl-4">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-muted-foreground">
                label
              </label>
            </div>
            fewf
          </div>
        </DraggableMenuItem>
      </Accordion>
    </DraggablePanel>
  );
}
