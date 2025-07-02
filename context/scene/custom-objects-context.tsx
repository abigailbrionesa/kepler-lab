"use client";
import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { AsteroidProps } from "@/lib/types";
import { getRandomColor } from "@/lib/utils";


const defaultParams = (): AsteroidProps => ({
  id: uuidv4(),
  name: `Custom Object`,
  distance_from_sun: 252600000,
  eccentricity: 0.5,
  orbital_period: 1,
  albedo: 0.5,
  magnitude: 10,
  diameter: 1,
  inclination: 0.0592,
  argument_of_periapsis: 0.9573,
  longitude_of_ascending_node: 1.3381,
  mean_anomaly: 3.1765,
  mean_motion: 0.027958,
  epoch: 2451545,
  color: getRandomColor(),
});

const CustomObjectsContext = createContext<{
  objects: AsteroidProps[];
  addObject: () => void;
  updateObject: (
    id: string,
    field: keyof AsteroidProps,
    value: number | string,
  ) => void;
  removeObject: (id: string) => void;
}>({
  objects: [],
  addObject: () => {},
  updateObject: () => {},
  removeObject: () => {},
});

export const useCustomObjects = () => useContext(CustomObjectsContext);

export const CustomObjectsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [objects, setObjects] = useState<AsteroidProps[]>([]);

  const addObject = () => {
    setObjects((prev) => {
      const customCount = prev.filter((obj) =>
        obj.name.startsWith("Custom Object"),
      ).length;
      const newName = `Custom Object ${customCount + 1}`;
      return [
        ...prev,
        {
          ...defaultParams(),
          name: newName,
        },
      ];
    });
  };

  const updateObject = (
    id: string,
    field: keyof AsteroidProps,
    value: number | string,
  ) => {
    setObjects((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, [field]: value } : obj)),
    );
  };

  const removeObject = (id: string) => {
    setObjects((prev) => prev.filter((obj) => obj.id !== id));
  };

  return (
    <CustomObjectsContext.Provider
      value={{ objects, addObject, updateObject, removeObject }}
    >
      {children}
    </CustomObjectsContext.Provider>
  );
};
