"use client";
import { createContext, useContext, useRef, useCallback } from "react";
import CameraControls from "camera-controls";
import { CameraControls as CameraControlsImpl } from "@react-three/drei";
import type { CameraControlContextType } from "@/lib/types";

const CameraControlContext = createContext<
  CameraControlContextType | undefined
>(undefined);

export const CameraControlProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cameraControlsRef = useRef<CameraControls | null>(null);

  const rotate = useCallback((theta: number, phi: number) => {
    cameraControlsRef.current?.rotate(theta, phi, true);
  }, []);

  const zoom = useCallback((amount: number) => {
    cameraControlsRef.current?.zoom(amount, true);
  }, []);

  const dolly = useCallback((distance: number) => {
    cameraControlsRef.current?.dolly(distance, true);
  }, []);

  const truck = useCallback((x: number, y: number) => {
    cameraControlsRef.current?.truck(x, y, true);
  }, []);

  const moveTo = useCallback((position: [number, number, number]) => {
    cameraControlsRef.current?.moveTo(...position, true);
  }, []);

  return (
    <CameraControlContext.Provider
      value={{ cameraControlsRef, rotate, zoom, dolly, truck, moveTo }}
    >
      {children}
    </CameraControlContext.Provider>
  );
};

export const useCameraControls = () => {
  const context = useContext(CameraControlContext);
  if (!context) {
    throw new Error("CameraControlProvider");
  }
  return context;
};
