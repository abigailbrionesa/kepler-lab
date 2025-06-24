"use client";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSelectedPlanet } from "@/context/view-selected-planet";
import { useSelectedDate } from "@/context/view-selected-date";
import { useMemo } from "react";
import { get_position_at_selected_date } from "@/lib/math";
import planets_data from "../../../lib/data/planets.json";
import { useEffect } from "react";
import { useState } from "react";
import * as THREE from "three";
import { useIsObjectPivot } from "@/context/view-is-object-pivot";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { CameraControls } from "@react-three/drei";
import type CameraControlsImpl from 'camera-controls';

const ORIGIN = new THREE.Vector3(0, 0, 0);

export const SpaceControls = () => {
  const { selectedPlanet } = useSelectedPlanet();
  const { selectedDate } = useSelectedDate();
  const { isObjectPivot } = useIsObjectPivot();

  const controlsRef = useRef<CameraControlsImpl | null>(null);
  const lastCameraPositionRef = useRef<THREE.Vector3 | null>(null);
  
  const planet = planets_data.find((p) => p.name === selectedPlanet);

  const planetPosition = useMemo(() => {
    if (!selectedPlanet || !planet) return null;

    return get_position_at_selected_date(
      planet.distance_from_sun_km,
      planet.eccentricity,
      planet.mean_motion_rad,
      planet.inclination_rad,
      planet.argument_of_periapsis_rad,
      planet.longitude_ascending_node_rad,
      planet.mean_anomaly_rad,
      planet.epoch,
      selectedDate
    );
  }, [selectedPlanet, selectedDate, planet]);

  const targetCameraPosition = useMemo(() => {
    if (!planetPosition || !planet) return null;

    const direction = planetPosition.clone().normalize();
    const distanceToPlanet = planetPosition.length();
    const cameraDistance = distanceToPlanet + planet.radius_km * 0.2;

    return direction.clone().multiplyScalar(cameraDistance);
  }, [planetPosition, planet]);

  useEffect(() => {
    if (!controlsRef.current) return;

    const controls = controlsRef.current;

    if (selectedPlanet && planetPosition && targetCameraPosition) {
      lastCameraPositionRef.current = controls.camera.position.clone();
      controls.setLookAt(
        targetCameraPosition.x,
        targetCameraPosition.y,
        targetCameraPosition.z,
        planetPosition.x,
        planetPosition.y,
        planetPosition.z,
        true
      );
    }

    if (!selectedPlanet && lastCameraPositionRef.current) {
      const lastPos = lastCameraPositionRef.current;
      controls.setLookAt(
        lastPos.x,
        lastPos.y,
        lastPos.z,
        ORIGIN.x,
        ORIGIN.y,
        ORIGIN.z,
        true
      );
    }
  }, [selectedPlanet, planetPosition, targetCameraPosition]);

  useEffect(() => {
    if (!controlsRef.current) return;

    const controls = controlsRef.current;

    const newTarget = isObjectPivot && planetPosition ? planetPosition : ORIGIN;

    controls.setTarget(newTarget.x, newTarget.y, newTarget.z, true);
  }, [isObjectPivot, planetPosition]);

  return (
    <>
      <CameraControls ref={controlsRef} />
    </>
  );
};
