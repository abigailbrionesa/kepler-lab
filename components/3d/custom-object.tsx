"use client";
import Object from "./objects/object";
import { useSelectedDate } from "@/context/scene/view-selected-date";
import { useCustomObjects } from "@/context/scene/custom-objects-context";

export default function CustomObject() {
  const { selectedDate } = useSelectedDate();
  const { objects } = useCustomObjects();

  return (
    <>
      {objects.map((obj) => (
        <Object
          key={obj.id}
          type="ASTEROID"
          selectedDate={selectedDate}
          params={{
            name: obj.name,
            id: obj.id,
            distance_from_sun: obj.distance_from_sun,
            color: obj.color,
            albedo: obj.albedo,
            magnitude: obj.magnitude,
            diameter: obj.diameter,
            eccentricity: obj.eccentricity,
            inclination: obj.inclination,
            argument_of_periapsis: obj.argument_of_periapsis,
            longitude_of_ascending_node: obj.longitude_of_ascending_node,
            mean_anomaly: obj.mean_anomaly,
            mean_motion: obj.mean_motion,
            epoch: obj.epoch,
          }}
          custom
        />
      ))}
    </>
  );
}
