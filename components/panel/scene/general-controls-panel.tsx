"use client";
import DraggablePanel from "../../ui/draggable-menu";
import { CameraControlsPanel } from "./camera-controls-panel";
import DraggableMenuItem from "../../ui/draggable-menu-item";
import DateSelector from "./date-selector";
import { Accordion } from "@/components/ui/shadcn/accordion";
import type { RefObject } from "react";

export default function GeneralControlsPanel({
  dragConstraints,
}: {
  dragConstraints: RefObject<HTMLDivElement | null>;
}) {
  return (
    <>
      <DraggablePanel
        position="left-5 top-5"
        dragConstraints={dragConstraints}
        title="General Controls"
      >
        <Accordion
          type="single"
          collapsible
          defaultValue="date-controls"
          className="w-full"
        >
          <DateSelector />
          <DraggableMenuItem
            accordionValue="camera-controls"
            title="Camera Controls"
            subtitle="dolly, zoom, rotate"
          >
            <div className="space-y-4 pt-2">
              <CameraControlsPanel />
            </div>
          </DraggableMenuItem>
        </Accordion>
      </DraggablePanel>
    </>
  );
}
