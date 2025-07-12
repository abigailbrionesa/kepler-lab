"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface PivotContextType {
  isObjectPivot: boolean;
  setIsObjectPivot: (open: boolean) => void;
  togglePivot: () => void;
}

const defaultContext: PivotContextType = {
  isObjectPivot: true,
  setIsObjectPivot: () => {},
  togglePivot: () => {},
};

export const IsObjectPivotContext =
  createContext<PivotContextType>(defaultContext);

export const useIsObjectPivot = () => useContext(IsObjectPivotContext);

export const IsObjectPivotProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isObjectPivot, setIsObjectPivot] = useState(true);

  const togglePivot = () => {
    setIsObjectPivot((prev) => !prev);
  };

  return (
    <IsObjectPivotContext.Provider
      value={{ isObjectPivot, setIsObjectPivot, togglePivot }}
    >
      {children}
    </IsObjectPivotContext.Provider>
  );
};
