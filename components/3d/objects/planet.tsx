import { useMemo } from "react";
import EarthModel from "./planet_models/Earth";
import MarsModel from "./planet_models/Mars";
import JupiterModel from "./planet_models/Jupiter";
import MercuryModel from "./planet_models/Mercury";
import NeptuneModel from "./planet_models/Neptune";
import SaturnModel from "./planet_models/Saturn";
import UranusModel from "./planet_models/Uranus";
import { Badge } from "@/components/ui/badge"
import { SCALE_FACTOR_OBJECT, SCALE_FACTOR_ORBIT } from "@/lib/constants";
import { Html } from "@react-three/drei";
import { get_orbit_points, get_position_at_selected_date } from "@/lib/math";
import { Orbit } from "./orbit";

type PlanetProps = {
  name: string;
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

  const planet_model = useMemo(() => {
    switch (planet.name) {
      case "Earth":
        return <EarthModel />;
      case "Mars":
        return <MarsModel />;
      case "Jupiter":
        return <JupiterModel />;
      case "Mercury":
        return <MercuryModel />;
      case "Neptune":
        return <NeptuneModel />;
      case "Saturn":
        return <SaturnModel />;
      case "Uranus":
        return <UranusModel />;
      default:
        return null;
    }
  }, [planet.name]);

  const orbit_points = useMemo(() => {
    return get_orbit_points(planet.distance_from_sun, planet.eccentricity, planet.inclination, planet.argument_of_periapsis, planet.longitude_of_ascending_node)
  }, []);

  return (
    <>
      <group position={planet_position}>
        <Html
          center
          zIndexRange={[0, 0]}
          className="group relative transition-all cursor-pointer "
        >
          <Badge className="absolute -translate-x-1/2 bottom-3 ">{planet.name}</Badge>
           <span className="absolute border-2 border-white w-4 h-4 group-hover:w-6 group-hover:h-6 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all"
           style={{ backgroundColor: planet.color }}></span>
        </Html>
      </group>
      <Orbit points={orbit_points}/>

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
