"use client";
import { useMemo } from "react";
import PlanetModel from "./planet_models/PlanetModel";
import { Badge } from "@/components/ui/badge";
import { Html } from "@react-three/drei";
import { get_orbit_points, get_position_at_selected_date } from "@/lib/math";
import { Orbit } from "./orbit";
import { useSelectedPlanet } from "@/context/view-selected-planet";
import type { PlanetType } from "@/context/view-selected-planet";
import { useEffect } from "react";

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
  selected_date: Date;
};

export default function Planet(planet: PlanetProps) {
  const { selectedPlanet, setSelectedPlanet } = useSelectedPlanet();

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
      planet.selected_date
    );
  }, [planet.selected_date]);

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
    console.log(`${planet.name} was clicked`);
  };

  useEffect(() => {
    console.log(selectedPlanet, "is selected planet");
  }, [selectedPlanet]);

  return (
    <>
      <group position={planet_position}>
        <PlanetModel name={planet.name} scale={0.0002 * planet.radius} />

        <Html
          center
          zIndexRange={[0, 0]}
          className="group relative transition-all cursor-pointer z-50 "
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
{
  /*

      <mesh>
        <sphereGeometry
          args={[
            planet.radius * SCALE_FACTOR_OBJECT,
            16,
            16,
          ]}
        />
        <meshStandardMaterial color={planet.color || "orange"} />
      </mesh>



        <EarthModel
          scale={[
            planet.radius * SCALE_FACTOR_ORBIT,
            planet.radius * SCALE_FACTOR_ORBIT,
            planet.radius * SCALE_FACTOR_ORBIT,
          ]}
        /> */
}
