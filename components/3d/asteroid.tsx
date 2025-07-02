"use client";

import { useAsteroids } from "@/context/scene/asteroids-context";
import { useSelectedDate } from "@/context/scene/view-selected-date";
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
          id,
          distance_from_sun,
          eccentricity,
          inclination,
          argument_of_periapsis,
          longitude_of_ascending_node,
          mean_anomaly,
          magnitude,
          albedo,
          diameter,
          mean_motion,
          epoch,
          name,
          color,
        } = asteroid;

        return (
          <Object
            key={id}
            type="ASTEROID"
            selectedDate={selectedDate}
            params={{
              name: name,
              distance_from_sun: distance_from_sun,
              color: color,
              eccentricity: eccentricity,
              inclination: degToRad(inclination),
              argument_of_periapsis: degToRad(argument_of_periapsis),
              longitude_of_ascending_node: degToRad(
                longitude_of_ascending_node,
              ),
              magnitude: magnitude,
              diameter: diameter,
              albedo:albedo,
              mean_anomaly: degToRad(mean_anomaly),
              mean_motion: degToRad(mean_motion),
              epoch: epoch,
              id: id,
            }}
          />
        );
      })}
    </>
  );
}
