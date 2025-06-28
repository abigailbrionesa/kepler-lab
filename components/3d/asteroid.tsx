"use client";

import { useAsteroids } from "@/context/asteroids-context";
import { useSelectedDate } from "@/context/view-selected-date";
import { degToRad } from "three/src/math/MathUtils.js";
import Object from "./objects/object";

export default function Asteroid() {
  const { asteroids } = useAsteroids();
  const { selectedDate } = useSelectedDate();

  if (asteroids.length === 0) return null;

  return (
    <>
      {asteroids.map((asteroid) => {
        const {
          spkid,
          semiMajorAxis,
          eccentricity,
          inclination,
          argument_of_periapsis,
          longitude_of_ascending_node,
          mean_anomaly,
          mean_motion,
          epoch,
          full_name,
        } = asteroid;

        const color = "#f5d300";

        return (
          <Object
            key={spkid}
            type="NEA"
            selectedDate={selectedDate}
            objectParams={{
              name: full_name,
              distance_from_sun: semiMajorAxis * 149597871,
              color: color,
              eccentricity: eccentricity,
              inclination: degToRad(inclination),
              argument_of_periapsis: degToRad(argument_of_periapsis),
              longitude_of_ascending_node: degToRad(longitude_of_ascending_node),
              mean_anomaly: degToRad(mean_anomaly),
              mean_motion: degToRad(mean_motion),
              epoch: epoch,
              spkid: spkid,
            }}
          />
        );
      })}
    </>
  );
}
