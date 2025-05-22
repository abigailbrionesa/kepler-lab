import type { Planet as PlanetType } from "@prisma/client";
import Planet from "./planet";

export function Planets({planets_data, selected_date}: {planets_data : PlanetType[]; selected_date: Date} ) {
  
  return (
    <>
       {planets_data.map((planet, index) => (
        <Planet
          key={planet.index}
          name={planet.name}
          radius={planet.radius_km}
          distance_from_sun={planet.distance_from_sun_km}
          color={planet.color}
          eccentricity={planet.eccentricity}
          inclination={planet.inclination_rad}
          argument_of_periapsis={planet.argument_of_periapsis_rad}
          longitude_of_ascending_node={planet.longitude_ascending_node_rad}
          mean_anomaly={planet.mean_anomaly_rad}
          mean_motion={planet.mean_motion_rad}
          epoch={planet.epoch}
          selected_date={selected_date} 
        />
       ))}
    </>
  );
};

export default Planets;
