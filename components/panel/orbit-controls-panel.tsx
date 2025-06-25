"use client";
import { useEffect, useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import DraggablePanel from "../ui/draggable-menu";
import DraggableMenuItem from "../ui/draggable-menu-item";
import { useOrbitalParams } from "@/context/orbit-creator-params-context";

export function OrbitalControlsPanel({
  dragConstraints,
}: {
  dragConstraints: React.RefObject<HTMLDivElement | null>;
}) {
  const {
    semiMajorAxis,
    eccentricity,
    orbitalPeriod,
    albedo,
    magnitude,
    diameter,
    inclination,
    argument_of_periapsis,
    longitude_of_ascending_node,
    mean_anomaly,
    mean_motion,
    epoch,
    setParams,
  } = useOrbitalParams();

  const [localParams, setLocalParams] = useState({
    semiMajorAxis,
    eccentricity,
    orbitalPeriod,
    albedo,
    magnitude,
    diameter,
    inclination,
    argument_of_periapsis,
    longitude_of_ascending_node,
    mean_anomaly,
    mean_motion,
    epoch,
  });

  useEffect(() => {
    setParams(localParams);
  }, [localParams]);

  const handleChange = (field: keyof typeof localParams, value: number) => {
    setLocalParams((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DraggablePanel
      dragConstraints={dragConstraints}
      title="Orbital Parameters"
    >
      <Accordion
        type="single"
        collapsible
        defaultValue="orbital-params"
        className="w-full"
      >
        <DraggableMenuItem
          accordionValue="orbital-params"
          title="Orbital Parameters"
          subtitle="Set values manually"
        >
          <div className="space-y-4 pt-2">
            <ParamSlider
              label="Semi-Major Axis (km)"
              id="semiMajorAxis"
              min={57900000}
              max={4515000000}
              step={100000}
              value={localParams.semiMajorAxis}
              onChange={(val) => handleChange("semiMajorAxis", val)}
            />
            <ParamSlider
              label="Eccentricity"
              id="eccentricity"
              min={0}
              max={1}
              step={0.01}
              value={localParams.eccentricity}
              onChange={(val) => handleChange("eccentricity", val)}
            />
            <ParamSlider
              label="Orbital Period (years)"
              id="orbitalPeriod"
              min={0.1}
              max={20}
              step={0.1}
              value={localParams.orbitalPeriod}
              onChange={(val) => handleChange("orbitalPeriod", val)}
            />
            <ParamSlider
              label="Albedo"
              id="albedo"
              min={0}
              max={1}
              step={0.01}
              value={localParams.albedo}
              onChange={(val) => handleChange("albedo", val)}
            />
            <ParamSlider
              label="Magnitude"
              id="magnitude"
              min={0}
              max={30}
              step={0.1}
              value={localParams.magnitude}
              onChange={(val) => handleChange("magnitude", val)}
            />
            <ParamSlider
              label="Diameter (km)"
              id="diameter"
              min={0.01}
              max={20000}
              step={1}
              value={localParams.diameter}
              onChange={(val) => handleChange("diameter", val)}
            />
            <ParamSlider
              label="Inclination (rad)"
              id="inclination"
              min={0}
              max={Math.PI}
              step={0.01}
              value={localParams.inclination}
              onChange={(val) => handleChange("inclination", val)}
            />
            <ParamSlider
              label="Argument of Periapsis (rad)"
              id="argument_of_periapsis"
              min={0}
              max={2 * Math.PI}
              step={0.01}
              value={localParams.argument_of_periapsis}
              onChange={(val) => handleChange("argument_of_periapsis", val)}
            />
            <ParamSlider
              label="Longitude of Asc. Node (rad)"
              id="longitude_of_ascending_node"
              min={0}
              max={2 * Math.PI}
              step={0.01}
              value={localParams.longitude_of_ascending_node}
              onChange={(val) =>
                handleChange("longitude_of_ascending_node", val)
              }
            />
            <ParamSlider
              label="Mean Anomaly (rad)"
              id="mean_anomaly"
              min={0}
              max={2 * Math.PI}
              step={0.01}
              value={localParams.mean_anomaly}
              onChange={(val) => handleChange("mean_anomaly", val)}
            />
            <ParamSlider
              label="Mean Motion (rad/day)"
              id="mean_motion"
              min={0}
              max={1}
              step={0.001}
              value={localParams.mean_motion}
              onChange={(val) => handleChange("mean_motion", val)}
            />
            <ParamSlider
              label="Epoch (JD)"
              id="epoch"
              min={2000000}
              max={3000000}
              step={1}
              value={localParams.epoch}
              onChange={(val) => handleChange("epoch", val)}
            />

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() =>
                setLocalParams({
                  semiMajorAxis: 1,
                  eccentricity: 0.5,
                  orbitalPeriod: 1,
                  albedo: 0.5,
                  magnitude: 10,
                  diameter: 1,
                  inclination: 0.0592,
                  argument_of_periapsis: 0.9573,
                  longitude_of_ascending_node: 1.3381,
                  mean_anomaly: 3.1765,
                  mean_motion: 0.027958,
                  epoch: 2451545,
                })
              }
            >
              Reset to defaults
            </Button>
          </div>
        </DraggableMenuItem>
      </Accordion>
    </DraggablePanel>
  );
}

function ParamSlider({
  label,
  id,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor={id}>{label}</Label>
        <span className="text-xs text-muted-foreground">
          {value.toFixed(2)}
        </span>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(vals) => onChange(vals[0])}
        className="w-full"
      />
    </div>
  );
}
