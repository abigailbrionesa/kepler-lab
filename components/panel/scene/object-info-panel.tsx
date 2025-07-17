"use client";
import { Accordion } from "@/components/ui/shadcn/accordion";
import DraggablePanel from "@/components/ui/draggable-menu";
import DraggableMenuItem from "@/components/ui/draggable-menu-item";
import { useSelectedPlanet } from "@/context/scene/view-selected-planet";
import planets_json from "../../../lib/data/planets.json";
import type { PlanetData } from "@/lib/types";
import { Label } from "@/components/ui/shadcn/label";

export function ObjectInfoPanel({
  dragConstraints,
}: {
  dragConstraints: React.RefObject<HTMLDivElement | null>;
}) {
  const { selectedPlanet } = useSelectedPlanet();
  if (selectedPlanet === null || selectedPlanet === undefined) { return null }
  const planet = (planets_json as PlanetData[]).find(
    (p) => p.name === selectedPlanet
  );

  if (!planet) {
    return null
  }
  return (
    <DraggablePanel
      dragConstraints={dragConstraints}
      title={
        <span className="uppercase text-3xl">{selectedPlanet || "Planet"}</span>
      }
      position="left-1/2 top-1/2"
      transparent={false}
    >
      <Accordion type="multiple" className="w-full space-y-2">
        <DraggableMenuItem
          accordionValue="physical"
          title="Physical Properties"
        >
          <PlanetDataItem label="Mass (kg)" value={planet.mass_kg} />
          <PlanetDataItem label="Diameter (km)" value={planet.diameter_km} />
          <PlanetDataItem
            label="Density (kg/m³)"
            value={planet.density_kg_m3}
          />
          <PlanetDataItem label="Gravity (m/s²)" value={planet.gravity_m_s2} />
        </DraggableMenuItem>

        <DraggableMenuItem
          accordionValue="orbit"
          title="Orbital Characteristics"
        >
          <PlanetDataItem
            label="Distance from Sun (AU)"
            value={planet.distance_from_sun_au}
          />
          <PlanetDataItem label="Period (days)" value={planet.period_days} />
          <PlanetDataItem label="Eccentricity" value={planet.eccentricity} />
          <PlanetDataItem
            label="Inclination (°)"
            value={planet.inclination_deg}
          />
        </DraggableMenuItem>

        <DraggableMenuItem
          accordionValue="rotation"
          title="Rotation & Axial Tilt"
        >
          <PlanetDataItem
            label="Rotation Period (h)"
            value={planet.rotation_period_hours}
          />
          <PlanetDataItem
            label="Obliquity (°)"
            value={planet.obliquity_to_orbit_deg}
          />
          <PlanetDataItem
            label="Length of Day (h)"
            value={planet.length_of_day_hours}
          />
        </DraggableMenuItem>

        <DraggableMenuItem accordionValue="misc" title="Other">
          <PlanetDataItem
            label="Number of Moons"
            value={planet.number_of_moons}
          />
          <PlanetDataItem
            label="Mean Temperature (°C)"
            value={planet.mean_temperature_c}
          />
          <PlanetDataItem
            label="Escape Velocity (km/s)"
            value={planet.escape_velocity_km_s}
          />
        </DraggableMenuItem>
      </Accordion>
    </DraggablePanel>
  );
}

function PlanetDataItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex justify-between items-center py-1 border-b last:border-none">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
