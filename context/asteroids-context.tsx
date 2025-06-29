"use client";
import React, { createContext, useContext, useState } from "react";
import type { AsteroidParams } from "@/lib/types";

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
