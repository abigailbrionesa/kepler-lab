import Object from "./objects/object";
import { useSelectedDate } from "@/context/scene/view-selected-date";
import type { PlanetData } from "@/lib/types";

export function Planets({ planets_data }: { planets_data: PlanetData[] }) {
  const { selectedDate } = useSelectedDate();

  return (
    <>
      {planets_data.map((planet) => (
        <Object
          key={planet.index}
          objectParams={{
            name: planet.name,
            radius: planet.radius_km,
            distance_from_sun: planet.distance_from_sun_km,
            color: planet.color,
            eccentricity: planet.eccentricity,
            inclination: planet.inclination_rad,
            argument_of_periapsis: planet.argument_of_periapsis_rad,
            longitude_of_ascending_node: planet.longitude_ascending_node_rad,
            mean_anomaly: planet.mean_anomaly_rad,
            mean_motion: planet.mean_motion_rad,
            epoch: planet.epoch,
          }}
          type="PLANET"
          selectedDate={selectedDate}
        />
      ))}
    </>
  );
}

export default Planets;
