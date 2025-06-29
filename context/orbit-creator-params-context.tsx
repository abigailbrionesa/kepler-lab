"use client";
import { createContext, useContext, useState } from "react";
import type { OrbitalParams } from "@/lib/types";


const OrbitalParamsContext = createContext<OrbitalParams | null>(null);

export function OrbitCreatorParamsProvider({ children }: { children: React.ReactNode }) {
  const [params, setParamsState] = useState<Omit<OrbitalParams, "setParams">>({
    name: "Custom",
    color: "red",
    semiMajorAxis: 0.47,
    eccentricity: 0.2,
    orbitalPeriod: 0.24,
    albedo: 0.5,
    magnitude: 10,
    diameter: 6052 * 2,
    inclination: 0.0592,
    argument_of_periapsis: 0.9573,
    longitude_of_ascending_node: 1.3381,
    mean_anomaly: 3.1765,
    mean_motion: 0.027958,
    epoch: 2451545,
  });

  const setParams = (updates: Partial<OrbitalParams>) => {
    setParamsState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <OrbitalParamsContext.Provider value={{ ...params, setParams }}>
      {children}
    </OrbitalParamsContext.Provider>
  );
}

export const useOrbitalParams = () => {
  const context = useContext(OrbitalParamsContext);
  if (!context) throw new Error("useOrbitalParams?");
  return context;
};
