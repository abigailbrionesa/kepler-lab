"use client";
import React, { createContext, useContext, useState } from "react";

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

const AsteroidContext = createContext<{
  asteroids: AsteroidParams[];
  addAsteroid: (asteroid: AsteroidParams) => void;
  removeAsteroid: (spkid: string) => void;
}>({
  asteroids: [],
  addAsteroid: () => {},
  removeAsteroid: () => {},
});

export const useAsteroids = () => useContext(AsteroidContext);

export const AsteroidProvider = ({ children }: { children: React.ReactNode }) => {
  const [asteroids, setAsteroids] = useState<AsteroidParams[]>([]);

  const addAsteroid = (asteroid: AsteroidParams) => {
    setAsteroids((prev) => {
      const exists = prev.some((a) => a.spkid === asteroid.spkid);
      return exists ? prev : [...prev, asteroid];
    });
  };

  const removeAsteroid = (spkid: string) => {
    setAsteroids((prev) => prev.filter((a) => a.spkid !== spkid));
  };

  return (
    <AsteroidContext.Provider value={{ asteroids, addAsteroid, removeAsteroid }}>
      {children}
    </AsteroidContext.Provider>
  );
};
