import { useSelectedPlanet } from "@/context/scene/view-selected-planet";
import { Button } from "../ui/shadcn/button";
import { useIsObjectPivot } from "@/context/scene/view-is-object-pivot";
import { X } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/shadcn/toggle-group";

function SelectedPlanetHeader() {
  const { selectedPlanet, setSelectedPlanet } = useSelectedPlanet();
  const { isObjectPivot, setIsObjectPivot } = useIsObjectPivot();

  return (
    <div className="w-full absolute z-10 border-b-1  border-secondary backdrop-blur-sm  ">
      <div className="flex justify-between items-center">
        <h1 className="uppercase tracking-widest px-l-4 lg:px-6">
          {selectedPlanet}
        </h1>

        <div className="gap-4 flex items-center">
          <span className="text-xs">Rotate around</span>
          <ToggleGroup
            type="single"
            variant="outline"
            value={isObjectPivot ? "planet" : "sun"}
            onValueChange={(val) => {
              if (val) setIsObjectPivot(val === "planet");
            }}
          >
            <ToggleGroupItem
              value="planet"
              className="px-4"
              aria-label="Rotate around planet"
            >
              Planet
            </ToggleGroupItem>
            <ToggleGroupItem value="sun" aria-label="Rotate around sun">
              Sun
            </ToggleGroupItem>
          </ToggleGroup>

          <Button
            onClick={() => setSelectedPlanet(undefined)}
            className="rounded-none "
          >
            <X />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SelectedPlanetHeader;
