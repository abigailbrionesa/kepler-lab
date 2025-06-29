"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ViewConfigOptions {
  grid: boolean;
  lines: boolean;
  labels: boolean;
  orbits: boolean;
}

interface ViewConfigContextType {
  viewConfig: ViewConfigOptions;
  toggleOption: (option: keyof ViewConfigOptions) => void;
  resetConfig: () => void;
}

const defaultConfig: ViewConfigOptions = {
  grid: true,
  lines: true,
  labels: true,
  orbits: true,
};

const defaultContext: ViewConfigContextType = {
  viewConfig: defaultConfig,
  toggleOption: () => {},
  resetConfig: () => {},
};

export const ViewConfigContext =
  createContext<ViewConfigContextType>(defaultContext);

export const useViewConfig = () => useContext(ViewConfigContext);

export const ViewConfigProvider = ({ children }: { children: ReactNode }) => {
  const [viewConfig, setViewConfig] =
    useState<ViewConfigOptions>(defaultConfig);

  const toggleOption = (option: keyof ViewConfigOptions) => {
    setViewConfig((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const resetConfig = () => {
    setViewConfig(defaultConfig);
  };

  return (
    <ViewConfigContext.Provider
      value={{ viewConfig, toggleOption, resetConfig }}
    >
      {children}
    </ViewConfigContext.Provider>
  );
};
