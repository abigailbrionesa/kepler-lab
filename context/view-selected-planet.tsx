"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type PlanetType = 
  | "Mercury"
  | "Venus"
  | "Earth"
  | "Mars"
  | "Jupiter"
  | "Saturn"
  | "Uranus"
  | "Neptune"


interface SelectedPlanetContextType {
  selectedPlanet: PlanetType | undefined;
  setSelectedPlanet: (planet: PlanetType | undefined) => void;
}

const defaultContext: SelectedPlanetContextType = {
  selectedPlanet: undefined,
  setSelectedPlanet: () => {
    throw new Error("setSelectedPlanet function must be used within SelectedPlanetProvider");
  },
};

export const SelectedPlanetContext = createContext<SelectedPlanetContextType>(defaultContext)

export const useSelectedPlanet = () => useContext(SelectedPlanetContext)

export const SelectedPlanetProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetType | undefined>(undefined);

  return (
    <SelectedPlanetContext.Provider value={{ selectedPlanet, setSelectedPlanet }}>
      {children}
    </SelectedPlanetContext.Provider>
  );
};
