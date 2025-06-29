"use client";
import { Accordion, AccordionItem } from "@/components/ui/shadcn/accordion";
import DraggablePanel from "../../ui/draggable-menu";
import { AsteroidSelector } from "../../ui/asteroid-selector";
import { useAsteroids } from "@/context/scene/asteroids-context";
import DraggableMenuItem from "../../ui/draggable-menu-item";
import DeleteButton from "../../ui/delete-button";

export function AsteroidsPanel({
  dragConstraints,
}: {
  dragConstraints: React.RefObject<HTMLDivElement | null>;
}) {
  const { asteroids, removeAsteroid } = useAsteroids();

  return (
    <DraggablePanel
      dragConstraints={dragConstraints}
      title="Select Asteroids"
      position="left-80 top-5"
      width="w-72"
    >
      <>
        <AsteroidSelector className="py-4" />

        {asteroids.length > 0 ? (
          <>
            <h3 className="text-sm font-medium">Selected Asteroids:</h3>
            <Accordion type="multiple" className="w-full">
              {asteroids.map((asteroid) => (
                <AccordionItem value={asteroid.spkid} key={asteroid.spkid}>
                  <DraggableMenuItem
                    accordionValue={asteroid.spkid}
                    title={asteroid.full_name}
                  >
                    <DeleteButton
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAsteroid(asteroid.spkid);
                      }}
                    />
                  </DraggableMenuItem>
                </AccordionItem>
              ))}
            </Accordion>
          </>
        ) : (
          <p className="text-sm pb-4">No asteroids selected yet.</p>
        )}
      </>
    </DraggablePanel>
  );
}
