"use client";
import CelestialObject from "./objects/celestial_object";
import { useOrbitalParams } from "@/context/orbit-creator-params-context";

export default function OrbitCreator() {
  const {
    semiMajorAxis,
    eccentricity,
    orbitalPeriod,
    albedo,
    magnitude,
    diameter,
    inclination,
    argument_of_periapsis,
    longitude_of_ascending_node,
    mean_anomaly,
    mean_motion,
    epoch,
    name,
    color,
  } = useOrbitalParams();

  return (
    <CelestialObject
      semiMajorAxis={semiMajorAxis}
      eccentricity={eccentricity}
      orbitalPeriod={orbitalPeriod}
      albedo={albedo}
      magnitude={magnitude}
      diameter={diameter}
      inclination={inclination}
      argument_of_periapsis={argument_of_periapsis}
      longitude_of_ascending_node={longitude_of_ascending_node}
      mean_anomaly={mean_anomaly}
      mean_motion={mean_motion}
      epoch={epoch}
      name={name}
      color={color}
    />
  );
}
