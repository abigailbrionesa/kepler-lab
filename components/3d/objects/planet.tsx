import { useMemo } from "react";
import EarthModel from "../../../public/planet_models/Earth";
import MarsModel from "../../../public/planet_models/Mars";
import JupiterModel from "../../../public/planet_models/Jupiter";
import MercuryModel from "../../../public/planet_models/Mercury";
import NeptuneModel from "../../../public/planet_models/Neptune";
import SaturnModel from "../../../public/planet_models/Saturn";
import UranusModel from "../../../public/planet_models/Uranus";
import { SCALE_FACTOR_ORBIT } from "@/lib/constants";
import { Html } from "@react-three/drei";
import { get_position_at_selected_date } from "@/lib/math";

const selected_date = new Date("2023-10-01T00:00:00Z");

export default function Planet(
  name: string,
  radius: number, // kilometers
  distance_from_sun: number, // kilometers
  color: string,
  eccentricity: number,
  inclination: number, // radians
  argument_of_periapsis: number, // radians
  longitude_of_ascending_node: number, // radians
  mean_anomaly: number, // radians
  mean_motion: number,
  epoch: number, // julian date
) {
  
  const planet_position = useMemo(() => {
    return get_position_at_selected_date(
      distance_from_sun,
      eccentricity,
      mean_motion,
      inclination,
      argument_of_periapsis,
      longitude_of_ascending_node,
      mean_anomaly,
      epoch,
      selected_date
    );
  }, [selected_date]);

  const planet_model = useMemo(() => {
    switch (name) {
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
  }, [name]);

  return (
    <>
      <group position={[100, 200, 300]}>
        <EarthModel
          scale={[
            radius * SCALE_FACTOR_ORBIT,
            radius * SCALE_FACTOR_ORBIT,
            radius * SCALE_FACTOR_ORBIT,
          ]}
        />
        <Html
          center
          zIndexRange={[0, 0]}
          className="group relative transition-all cursor-pointer"
        >
          <p>{name}</p>
        </Html>
      </group>
    </>
  );
};
