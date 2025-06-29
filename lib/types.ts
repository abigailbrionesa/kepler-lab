import type { CameraControlsImpl } from "@react-three/drei";

export type AsteroidOption = { spkid: number; full_name: string };

export type AsteroidRow = {
  spkid: number;
  full_name: string;
  pha: string;
  sats: string;
  H: number;
  orbit_id: string;
  epoch_mjd: number;
  e: number;
  a: number;
  q: number;
  i: number;
  om: number;
  w: number;
  ma: number;
  n: number;
  ad: number;
  per_y: number;
  data_arc: string;
  condition_code: string;
  n_obs_used: number;
  epoch: number;
  epoch_cal: string;
  equinox: string;
  tp: number;
  per: string;
  moid: number;
  moid_ld: number;
  moid_jup: number;
  t_jup: number;
  class: string;
  producer: string;
  first_obs: string;
  last_obs: string;
  rms: number;
  albedo: number;
  diameter: number;
};

export type ObjectType = "NEA" | "PLANET" | "PHA" | "NEC";

export type NEOType = "NEA" | "NEC" | "PHA";

export type OrbitalParams = {
  name: string;
  color: string;
  semiMajorAxis: number;
  eccentricity: number;
  orbitalPeriod: number;
  albedo: number;
  magnitude: number;
  diameter: number;
  inclination: number;
  argument_of_periapsis: number;
  longitude_of_ascending_node: number;
  mean_anomaly: number;
  mean_motion: number;
  epoch: number;
  setParams: (params: Partial<OrbitalParams>) => void;
};

export type AsteroidParams = {
  spkid: string;
  full_name: string;
  semiMajorAxis: number;
  eccentricity: number;
  orbitalPeriod: number;
  albedo: number;
  magnitude: number;
  diameter: number;
  inclination: number;
  argument_of_periapsis: number;
  longitude_of_ascending_node: number;
  mean_anomaly: number;
  mean_motion: number;
  epoch: number;
};

export type CameraControlContextType = {
  cameraControlsRef: React.RefObject<CameraControlsImpl | null>;
  rotate: (theta: number, phi: number) => void;
  zoom: (amount: number) => void;
  dolly: (distance: number) => void;
  truck: (x: number, y: number) => void;
  moveTo: (position: [number, number, number]) => void;
};

export type PlanetType =
  | "Mercury"
  | "Venus"
  | "Earth"
  | "Mars"
  | "Jupiter"
  | "Saturn"
  | "Uranus"
  | "Neptune";

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

export type OrbitParams = {
  id: string;
  name: string;
  semiMajorAxis: number;
  eccentricity: number;
  orbitalPeriod: number;
  albedo: number;
  magnitude: number;
  diameter: number;
  inclination: number;
  argument_of_periapsis: number;
  longitude_of_ascending_node: number;
  mean_anomaly: number;
  mean_motion: number;
  epoch: number;
};

export type PlanetObject = {
  type: "PLANET";
  objectParams: {
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
  selectedDate: Date;
};

export type NEOObject = {
  type: NEOType;
  objectParams: {
    name: string;
    distance_from_sun: number;
    color: string;
    eccentricity: number;
    inclination: number;
    argument_of_periapsis: number;
    longitude_of_ascending_node: number;
    mean_anomaly: number;
    mean_motion: number;
    epoch: number;
    spkid?: string;
  };
  selectedDate: Date;
};

export type PlanetProps = (PlanetObject | NEOObject) & { custom?: boolean };
