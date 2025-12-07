"use client";

import React, { createContext, useContext, useState } from "react";

type TutorialContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openTutorial: () => void;
};

const TutorialContext = createContext<TutorialContextType>({
  isOpen: true,
  setIsOpen: () => {},
  openTutorial: () => {},
});

export function TutorialProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const openTutorial = () => setIsOpen(true);

  return (
    <TutorialContext.Provider value={{ isOpen, setIsOpen, openTutorial }}>
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  return useContext(TutorialContext);
}
