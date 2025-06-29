"use client";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import DraggablePanel from "../ui/draggable-menu";
import DraggableMenuItem from "../ui/draggable-menu-item";
import { Plus } from "lucide-react";
import { useCustomObjects } from "@/context/custom-objects-context";
import DeleteButton from "../ui/delete-button";
import { ParamSlider } from "../ui/param-slider";

export function OrbitalControlsPanel({
  dragConstraints,
}: {
  dragConstraints: React.RefObject<HTMLDivElement | null>;
}) {
  const { objects, addObject, updateObject, removeObject } = useCustomObjects();

  const handleChange = (
    id: string,
    field: keyof (typeof objects)[0],
    value: number
  ) => {
    updateObject(id, field, value);
  };

  return (
    <DraggablePanel
      dragConstraints={dragConstraints}
      title="Orbit Creator"
      position="left-160 top-5"
    >
      <div className="flex justify-between items-center px-4 pt-1 pb-1">
        <h2 className="text-sm font-medium text-muted-foreground">
          Create Object
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={addObject}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Accordion type="multiple" className="w-full">
        {objects.map((obj) => (
          <DraggableMenuItem
            key={obj.id}
            accordionValue={obj.id}
            title={`${obj.name}`}
            subtitle="Category"
          >
            <div className="pl-4">
              <DraggableMenuItem
                accordionValue={`orbital-${obj.id}`}
                title="Orbital Parameters"
                subtitle="Set orbital values"
              >
                <div className="space-y-4 pt-2">
                  <ParamSlider
                    label="Semi-Major Axis (km)"
                    id={`semiMajorAxis-${obj.id}`}
                    min={57900000}
                    max={4515000000}
                    step={100000}
                    value={obj.semiMajorAxis}
                    onChange={(val: number) =>
                      handleChange(obj.id, "semiMajorAxis", val as number)
                    }
                  />
                  <ParamSlider
                    label="Eccentricity"
                    id={`eccentricity-${obj.id}`}
                    min={0}
                    max={1}
                    step={0.01}
                    value={obj.eccentricity}
                    onChange={(val: number) =>
                      handleChange(obj.id, "eccentricity", val as number)
                    }
                  />
                  <ParamSlider
                    label="Inclination (rad)"
                    id={`inclination-${obj.id}`}
                    min={0}
                    max={Math.PI}
                    step={0.01}
                    value={obj.inclination}
                    onChange={(val: number) =>
                      handleChange(obj.id, "inclination", val as number)
                    }
                  />
                  <ParamSlider
                    label="Argument of Periapsis (rad)"
                    id={`argument_of_periapsis-${obj.id}`}
                    min={0}
                    max={2 * Math.PI}
                    step={0.01}
                    value={obj.argument_of_periapsis}
                    onChange={(val: number) =>
                      handleChange(
                        obj.id,
                        "argument_of_periapsis",
                        val as number
                      )
                    }
                  />
                  <ParamSlider
                    label="Longitude of Asc. Node (rad)"
                    id={`longitude_of_ascending_node-${obj.id}`}
                    min={0}
                    max={2 * Math.PI}
                    step={0.01}
                    value={obj.longitude_of_ascending_node}
                    onChange={(val: number) =>
                      handleChange(
                        obj.id,
                        "longitude_of_ascending_node",
                        val as number
                      )
                    }
                  />
                  <ParamSlider
                    label="Mean Anomaly (rad)"
                    id={`mean_anomaly-${obj.id}`}
                    min={0}
                    max={2 * Math.PI}
                    step={0.01}
                    value={obj.mean_anomaly}
                    onChange={(val: number) =>
                      handleChange(obj.id, "mean_anomaly", val as number)
                    }
                  />
                  <ParamSlider
                    label="Mean Motion (rad/day)"
                    id={`mean_motion-${obj.id}`}
                    min={0}
                    max={1}
                    step={0.001}
                    value={obj.mean_motion}
                    onChange={(val: number) =>
                      handleChange(obj.id, "mean_motion", val as number)
                    }
                  />
                  <ParamSlider
                    label="Epoch (JD)"
                    id={`epoch-${obj.id}`}
                    min={2000000}
                    max={3000000}
                    step={1}
                    value={obj.epoch}
                    onChange={(val: number) =>
                      handleChange(obj.id, "epoch", val as number)
                    }
                  />
                </div>
              </DraggableMenuItem>

              <DraggableMenuItem
                accordionValue={`physical-${obj.id}`}
                title="Physical Parameters"
                subtitle="Set physical values"
              >
                <div className="space-y-4 pt-2">
                  <ParamSlider
                    label="Albedo"
                    id={`albedo-${obj.id}`}
                    min={0}
                    max={1}
                    step={0.01}
                    value={obj.albedo}
                    onChange={(val: number) =>
                      handleChange(obj.id, "albedo", val as number)
                    }
                  />
                  <ParamSlider
                    label="Magnitude"
                    id={`magnitude-${obj.id}`}
                    min={0}
                    max={30}
                    step={0.1}
                    value={obj.magnitude}
                    onChange={(val: number) =>
                      handleChange(obj.id, "magnitude", val as number)
                    }
                  />
                  <ParamSlider
                    label="Diameter (km)"
                    id={`diameter-${obj.id}`}
                    min={0.01}
                    max={20000}
                    step={1}
                    value={obj.diameter}
                    onChange={(val: number) =>
                      handleChange(obj.id, "diameter", val as number)
                    }
                  />
                </div>
              </DraggableMenuItem>
              <DeleteButton
                className="mt-2"
                onClick={() => removeObject(obj.id)}
              />
            </div>
          </DraggableMenuItem>
        ))}
      </Accordion>
    </DraggablePanel>
  );
}
