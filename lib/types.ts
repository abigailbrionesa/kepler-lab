
export type NEOType = "NEA" | "NEC" | "PHA";

export type PlanetType = 
  | "Mercury"
  | "Venus"
  | "Earth"
  | "Mars"
  | "Jupiter"
  | "Saturn"
  | "Uranus"
  | "Neptune"


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