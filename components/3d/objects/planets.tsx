import Planet from "./planet";
import type { PlanetType } from "@/context/view-selected-planet";

export type PlanetData = {
  id: number;
  name: PlanetType;
  mass_kg: number;
  diameter_km: number;
  radius_km: number;
  density_kg_m3: number;
  gravity_m_s2: number;
  escape_velocity_km_s: number;
  rotation_period_hours: number;
  length_of_day_hours: number;
  distance_from_sun_km: number;
  distance_from_sun_au: number;
  perihelion_km: number;
  perihelion_au: number;
  aphelion_km: number;
  aphelion_au: number;
  period_days: number;
  velocity_km_s: number;
  inclination_deg: number;
  inclination_rad: number;
  eccentricity: number;
  obliquity_to_orbit_deg: number;
  obliquity_to_orbit_rad: number;
  mean_temperature_c: number;
  longitude_ascending_node_deg: number;
  longitude_ascending_node_rad: number;
  longitude_perihelion_deg: number;
  longitude_perihelion_rad: number;
  argument_of_periapsis_rad: number;
  mean_motion_rad: number;
  mean_longitude_deg: number;
  mean_longitude_rad: number;
  mean_anomaly_deg: number;
  mean_anomaly_rad: number;
  number_of_moons: number;
  epoch: number;
  color: string;
  index: number;
};

export function Planets({planets_data}: {planets_data : PlanetData[]} ) {
  
  return (
    <>
       {planets_data.map((planet, ) => (
        <Planet
          key={planet.index}
          name={planet.name}
          radius={planet.radius_km * 0.009}
          distance_from_sun={planet.distance_from_sun_km}
          color={planet.color}
          eccentricity={planet.eccentricity}
          inclination={planet.inclination_rad}
          argument_of_periapsis={planet.argument_of_periapsis_rad}
          longitude_of_ascending_node={planet.longitude_ascending_node_rad}
          mean_anomaly={planet.mean_anomaly_rad}
          mean_motion={planet.mean_motion_rad}
          epoch={planet.epoch}
        />
       ))}
    </>
  );
};

export default Planets;
