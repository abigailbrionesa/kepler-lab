"use client";

import { createContext, useContext, useRef } from "react";
import { Object3D } from "three";
import type { ReactNode } from "react";
import type { RefObject } from "react";

type OccludableRefsContextType = {
  refs: React.RefObject<RefObject<Object3D | null>[]>;
  registerRef: (ref: RefObject<Object3D | null>) => void;
  unregisterRef: (ref: RefObject<Object3D | null>) => void;
};

const OccludableRefsContext = createContext<OccludableRefsContextType | undefined>(undefined);

export const useOccludableRefs = () => {
  const context = useContext(OccludableRefsContext);
  if (!context) {
    throw new Error("OccludableRefsProvider");
  }
  return context;
};


export const OccludableRefsProvider = ({ children }: { children: ReactNode }) => {
  const refs = useRef<RefObject<Object3D | null>[]>([]);

  const logRefs = () => {
    console.log("Current Refs:", refs.current.map(ref => ref.current));
  };

  const registerRef = (ref: RefObject<Object3D | null>) => {
    if (!refs.current.includes(ref)) {
      refs.current.push(ref);
      console.log("Registered Ref:", ref);
      logRefs();
    }
  };

  const unregisterRef = (ref: RefObject<Object3D | null>) => {
    const index = refs.current.indexOf(ref);
    if (index !== -1) {
      refs.current.splice(index, 1);
      console.log("Unregistered Ref:", ref);
      logRefs();
    }
  };

  return (
    <OccludableRefsContext.Provider value={{ refs, registerRef, unregisterRef }}>
      {children}
    </OccludableRefsContext.Provider>
  );
};
