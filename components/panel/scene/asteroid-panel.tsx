"use client";
import { Accordion, AccordionItem } from "@/components/ui/shadcn/accordion";
import DraggablePanel from "../../ui/draggable-menu";
import { AsteroidSelector } from "../../ui/asteroid-selector";
import { useAsteroids } from "@/context/scene/asteroids-context";
import DraggableMenuItem from "../../ui/draggable-menu-item";
import DeleteButton from "../../ui/delete-button";
import NameAndColor from "@/components/ui/name-and-color";

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
            <Accordion type="multiple" className="w-full">
              {asteroids.map((asteroid) => (
                <AccordionItem
                  className="border-b-0"
                  value={asteroid.id}
                  key={asteroid.id}
                >
                  <DraggableMenuItem
                    accordionValue={asteroid.id}
                    title={
                      <NameAndColor
                        name={asteroid.name}
                        color={asteroid.color}
                      />
                    }
                  >
                    <div className="pl-2">
                      <DraggableMenuItem
                        accordionValue={`orbital-${asteroid.id}`}
                        title={
                          <span className="star-point">Orbital Parameters</span>
                        }
                      >
                        <ul className="text-muted-foreground pl-2 space-y-1">
                          <li>Semi-Major Axis: {asteroid.distance_from_sun}</li>
                          <li>Eccentricity: {asteroid.eccentricity}</li>
                          <li>Orbital Period: {asteroid.orbital_period}</li>
                          <li>Inclination: {asteroid.inclination}</li>
                          <li>
                            Argument of Periapsis:{" "}
                            {asteroid.argument_of_periapsis}
                          </li>
                          <li>
                            Longitude of Ascending Node:{" "}
                            {asteroid.longitude_of_ascending_node}
                          </li>
                          <li>Mean Anomaly: {asteroid.mean_anomaly}</li>
                          <li>Mean Motion: {asteroid.mean_motion}</li>
                          <li>Epoch: {asteroid.epoch}</li>
                        </ul>
                      </DraggableMenuItem>

                      <DraggableMenuItem
                        accordionValue={`physical-${asteroid.id}`}
                        title={
                          <span className="star-point">
                            Physical Parameters
                          </span>
                        }
                      >
                        <ul className="text-muted-foreground space-y-1 pl-2">
                          <li>Magnitude: {asteroid.magnitude}</li>
                          <li>Albedo: {asteroid.albedo}</li>
                          <li>Diameter: {asteroid.diameter}</li>
                        </ul>
                      </DraggableMenuItem>
                      <DeleteButton
                        className="mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeAsteroid(asteroid.id);
                        }}
                      />
                    </div>
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
