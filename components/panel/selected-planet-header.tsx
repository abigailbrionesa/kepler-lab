import { useSelectedPlanet } from "@/context/view-selected-planet";
import { Button } from "../ui/button";
import { useIsObjectPivot } from "@/context/view-is-object-pivot";

function SelectedPlanetHeader() {
  const { selectedPlanet, setSelectedPlanet } = useSelectedPlanet();
  const { isObjectPivot, togglePivot } = useIsObjectPivot();
  return (
    <div className="w-full absolute z-10 p-2 shadow-lg">
    
      <div className="w-full flex justify-between p-1 custom-border items-center">
      <div>hola</div>
       

        <div className="bg-orange-600 text-white p-5 py-3">{selectedPlanet} </div>
        <Button
          variant={"ghost"}
          onClick={() => setSelectedPlanet(undefined)}
          className="float-right"
        >
          Cerrar X
        </Button>

          <Button
          variant="ghost"
          size="sm"
          className="gap-1.5"
          onClick={togglePivot}
        >
          <span className="ml-2">
            {isObjectPivot ? "Rotating around object" : "Rotating around sun"}
          </span>
        </Button>
      </div>
    </div>
  );
}

export default SelectedPlanetHeader;
