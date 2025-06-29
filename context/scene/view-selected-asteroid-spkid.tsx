"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SelectedAsteroidSpkidType {
  selectedAsteroidSpkid: string | undefined;
  setSelectedAsteroidSpkid: (spkid: string | undefined) => void;
}

const SelectedAsteroidSpkidContext = createContext<SelectedAsteroidSpkidType>({
  selectedAsteroidSpkid: undefined,
  setSelectedAsteroidSpkid: () => {
    throw new Error(
      "setSelectedAsteroidSpkid must be used within a SelectedAsteroidSpkidProvider",
    );
  },
});

export const useSelectedAsteroidSpkid = () =>
  useContext(SelectedAsteroidSpkidContext);

export const SelectedAsteroidSpkidProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedAsteroidSpkid, setSelectedAsteroidSpkid] = useState<
    string | undefined
  >(undefined);

  return (
    <SelectedAsteroidSpkidContext.Provider
      value={{ selectedAsteroidSpkid, setSelectedAsteroidSpkid }}
    >
      {children}
    </SelectedAsteroidSpkidContext.Provider>
  );
};
