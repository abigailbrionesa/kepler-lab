"use client";
import React, { createContext, useContext, useState } from "react";
import type { AsteroidProps } from "@/lib/types";

const AsteroidContext = createContext<{
  asteroids: AsteroidProps[];
  addAsteroid: (asteroid: AsteroidProps) => void;
  removeAsteroid: (id: string) => void;
}>({
  asteroids: [],
  addAsteroid: () => {},
  removeAsteroid: () => {},
});

export const useAsteroids = () => useContext(AsteroidContext);

export const AsteroidProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [asteroids, setAsteroids] = useState<AsteroidProps[]>([]);

  const addAsteroid = (asteroid: AsteroidProps) => {
    setAsteroids((prev) => {
      const exists = prev.some((a) => a.id === asteroid.id);
      return exists ? prev : [...prev, asteroid];
    });
  };

  const removeAsteroid = (id: string) => {
    setAsteroids((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AsteroidContext.Provider
      value={{ asteroids, addAsteroid, removeAsteroid }}
    >
      {children}
    </AsteroidContext.Provider>
  );
};
