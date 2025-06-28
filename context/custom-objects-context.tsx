"use client"
import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

const defaultParams = (): OrbitParams => ({
  id: uuidv4(),
  name: `Custom Object`,
  semiMajorAxis: 252600000,
  eccentricity: 0.5,
  orbitalPeriod: 1,
  albedo: 0.5,
  magnitude: 10,
  diameter: 1,
  inclination: 0.0592,
  argument_of_periapsis: 0.9573,
  longitude_of_ascending_node: 1.3381,
  mean_anomaly: 3.1765,
  mean_motion: 0.027958,
  epoch: 2451545,
});

const CustomObjectsContext = createContext<{
  objects: OrbitParams[];
  addObject: () => void;
  updateObject: (id: string, field: keyof OrbitParams, value: number | string) => void;
  removeObject: (id: string) => void;
}>({
  objects: [],
  addObject: () => {},
  updateObject: () => {},
  removeObject: () => {},
});

export const useCustomObjects = () => useContext(CustomObjectsContext);

export const CustomObjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const [objects, setObjects] = useState<OrbitParams[]>([]);

  const addObject = () => {
    setObjects((prev) => [...prev, defaultParams()]);
  };

  const updateObject = (id: string, field: keyof OrbitParams, value: number | string) => {
    setObjects((prev) =>
      prev.map((obj) =>
        obj.id === id ? { ...obj, [field]: value } : obj
      )
    );
  };

  const removeObject = (id: string) => {
    setObjects((prev) => prev.filter((obj) => obj.id !== id));
  };

  return (
    <CustomObjectsContext.Provider value={{ objects, addObject, updateObject, removeObject }}>
      {children}
    </CustomObjectsContext.Provider>
  );
};
