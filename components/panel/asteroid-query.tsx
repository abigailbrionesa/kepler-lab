"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DraggableMenuItem from "../ui/draggable-menu-item";
import { Checkbox } from "@/components/ui/checkbox";
import isEqual from "lodash/isEqual";
import { useDebounce } from "use-debounce";
import { ParamSlider } from "../ui/param-slider";

export default function AsteroidQuery() {
  const [semiMajorAxisUI, setSemiMajorAxisUI] = useState<number[]>([0.5, 5]);
  const [eccentricityUI, setEccentricityUI] = useState<number[]>([0, 1]);
  const [orbitalPeriodUI, setOrbitalPeriodUI] = useState<number[]>([0.5, 10]);
  const [albedoUI, setAlbedoUI] = useState<number[]>([0, 1]);
  const [magnitudeUI, setMagnitudeUI] = useState<number[]>([5, 25]);
  const [diameterUI, setDiameterUI] = useState<number[]>([0.1, 10]);
  const [showOnlyHazardous, setShowOnlyHazardous] = useState<boolean>(false);

  const [debouncedSemiMajorAxis] = useDebounce(semiMajorAxisUI, 1500);
  const [debouncedEccentricity] = useDebounce(eccentricityUI, 1500);
  const [debouncedOrbitalPeriod] = useDebounce(orbitalPeriodUI, 1500);
  const [debouncedAlbedo] = useDebounce(albedoUI, 1500);
  const [debouncedMagnitude] = useDebounce(magnitudeUI, 1500);
  const [debouncedDiameter] = useDebounce(diameterUI, 1500);

  useEffect(() => {
    console.log("Filters updated:", {
      semiMajorAxis: debouncedSemiMajorAxis,
      eccentricity: debouncedEccentricity,
      orbitalPeriod: debouncedOrbitalPeriod,
      albedo: debouncedAlbedo,
      magnitude: debouncedMagnitude,
      diameter: debouncedDiameter,
    });
  }, [
    debouncedSemiMajorAxis,
    debouncedEccentricity,
    debouncedOrbitalPeriod,
    debouncedAlbedo,
    debouncedMagnitude,
    debouncedDiameter,
  ]);

  const isUpdatingFilters =
    !isEqual(semiMajorAxisUI, debouncedSemiMajorAxis) ||
    !isEqual(eccentricityUI, debouncedEccentricity) ||
    !isEqual(orbitalPeriodUI, debouncedOrbitalPeriod) ||
    !isEqual(albedoUI, debouncedAlbedo) ||
    !isEqual(magnitudeUI, debouncedMagnitude) ||
    !isEqual(diameterUI, debouncedDiameter);

  return (
    <DraggableMenuItem
      accordionValue="filters"
      title={
        <>
          Filters
          {isUpdatingFilters && (
            <span className="ml-2 text-xs text-muted-foreground italic">
              (updating...)
            </span>
          )}
        </>
      }
      subtitle="Orbital & physical parameters"
    >
      <div className="space-y-4 pt-2">
        <ParamSlider
          label="Semi-Major Axis (AU)"
          id="semi-major-axis"
          min={0.1}
          max={10}
          step={0.1}
          value={semiMajorAxisUI}
          onChange={setSemiMajorAxisUI}
          type="range"
        />

        <ParamSlider
          label="Eccentricity"
          id="eccentricity"
          min={0}
          max={1}
          step={0.01}
          value={eccentricityUI}
          onChange={setEccentricityUI}
          type="range"
        />

        <ParamSlider
          label="Orbital Period (years)"
          id="orbital-period"
          min={0.1}
          max={20}
          step={0.1}
          value={orbitalPeriodUI}
          onChange={setOrbitalPeriodUI}
          type="range"
        />

        <ParamSlider
          label="Albedo"
          id="albedo"
          min={0}
          max={1}
          step={0.01}
          value={albedoUI}
          onChange={setAlbedoUI}
          type="range"
        />

        <ParamSlider
          label="Magnitude"
          id="magnitude"
          min={0}
          max={30}
          step={0.5}
          value={magnitudeUI}
          onChange={setMagnitudeUI}
          type="range"
        />

        <ParamSlider
          label="Diameter (km)"
          id="diameter"
          min={0.01}
          max={50}
          step={0.01}
          value={diameterUI}
          onChange={setDiameterUI}
          type="range"
        />

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-4"
          onClick={() => {
            setSemiMajorAxisUI([0.5, 5]);
            setEccentricityUI([0, 1]);
            setOrbitalPeriodUI([0.5, 10]);
            setAlbedoUI([0, 1]);
            setMagnitudeUI([5, 25]);
            setDiameterUI([0.1, 10]);
            setShowOnlyHazardous(false);
          }}
        >
          Reset Filters
        </Button>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="hazardous"
            checked={showOnlyHazardous}
            onCheckedChange={(checked) =>
              setShowOnlyHazardous(checked as boolean)
            }
          />
          <Label htmlFor="hazardous" className="text-sm">
            Show only hazardous objects
          </Label>
        </div>
      </div>
    </DraggableMenuItem>
  );
}
