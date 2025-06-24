"use client";
import { useMemo } from "react";
import PlanetModel from "./planet_models/PlanetModel";
import { Badge } from "@/components/ui/badge";
import { Html } from "@react-three/drei";
import { get_orbit_points, get_position_at_selected_date } from "@/lib/math";
import { Orbit } from "./orbit";
import { useSelectedPlanet } from "@/context/view-selected-planet";
import type { PlanetType } from "@/context/view-selected-planet";
import { useSelectedDate } from "@/context/view-selected-date";
import { useRef } from "react";
import type { Object3D } from "three";
import { useOccludableRefs } from "@/context/occludable-refs-context";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Mesh } from "three";
import { useState } from "react";

type PlanetProps = {
  name: PlanetType;
  radius: number;
  distance_from_sun: number;
  color: string;
  eccentricity: number;
  inclination: number;
  argument_of_periapsis: number;
  longitude_of_ascending_node: number;
  mean_anomaly: number;
  mean_motion: number;
  epoch: number;
};

export default function Planet(planet: PlanetProps) {
  const { selectedPlanet, setSelectedPlanet } = useSelectedPlanet();
  const { selectedDate } = useSelectedDate();
  const planetRef = useRef<any>(null);
  const { refs, registerRef, unregisterRef } = useOccludableRefs();
  const [hidden, set] = useState<boolean>(false);

  const isSelected = selectedPlanet === planet.name;

  const planet_position = useMemo(() => {
    return get_position_at_selected_date(
      planet.distance_from_sun,
      planet.eccentricity,
      planet.mean_motion,
      planet.inclination,
      planet.argument_of_periapsis,
      planet.longitude_of_ascending_node,
      planet.mean_anomaly,
      planet.epoch,
      selectedDate
    );
  }, [selectedDate]);

  const orbit_points = useMemo(() => {
    return get_orbit_points(
      planet.distance_from_sun,
      planet.eccentricity,
      planet.inclination,
      planet.argument_of_periapsis,
      planet.longitude_of_ascending_node
    );
  }, []);

  const handlePlanetClick = () => {
    setSelectedPlanet(planet.name);
  };

  const occludeRefs = refs.current;

  const refCallback = useCallback(
    (el: Mesh | null) => {
      planetRef.current = el;
      if (el) {
        registerRef(planetRef);
      } else {
        unregisterRef(planetRef);
      }
    },
    [registerRef, unregisterRef]
  );
  return (
    <>
      {isSelected && (
        <PlanetModel
          ref={refCallback}
          name={planet.name}
          scale={planet.radius * 0.0003}
          position={planet_position}
          onClick={handlePlanetClick}
        />
      )}

      <group position={planet_position}>
        <Html
          center
          zIndexRange={[2, 2]}
          onOcclude={set}
          occlude={occludeRefs as React.RefObject<Object3D>[]}
          className={cn(
            "transition-all duration-200 cursor-pointer z-50",
            hidden ? "opacity-0 scale-90" : "opacity-100 scale-100"
          )}
        >
          <div onClick={handlePlanetClick}>
            <Badge className="absolute -translate-x-1/2 bottom-3 ">
              {planet.name}
            </Badge>
            <span
              className="absolute border-2 border-white w-4 h-4 group-hover:w-6 group-hover:h-6 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all"
              style={{ backgroundColor: planet.color }}
            ></span>
          </div>
        </Html>
      </group>

      <Orbit points={orbit_points} />
    </>
  );
}
