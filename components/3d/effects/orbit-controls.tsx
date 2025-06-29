"use client";

import { useEffect, useMemo, useRef } from "react";

import * as THREE from "three";
import { CameraControls } from "@react-three/drei";

import { useCameraControls } from "@/context/scene/camera-control-context";
import { useIsObjectPivot } from "@/context/scene/view-is-object-pivot";
import { useSelectedDate } from "@/context/scene/view-selected-date";
import { useSelectedPlanet } from "@/context/scene/view-selected-planet";

import { get_position_at_selected_date } from "@/lib/math";
import planets_data from "../../../lib/data/planets.json";

const ORIGIN = new THREE.Vector3(0, 0, 0);

export const SpaceControls = () => {
  const { selectedPlanet } = useSelectedPlanet();
  const { selectedDate } = useSelectedDate();
  const { isObjectPivot } = useIsObjectPivot();

  const { cameraControlsRef } = useCameraControls();

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
      selectedDate,
    );
  }, [selectedPlanet, selectedDate, planet]);

  const targetCameraPosition = useMemo(() => {
    if (!planetPosition || !planet) return null;

    const direction = planetPosition.clone().normalize();

    const distanceToPlanet = planetPosition.length();

    const cameraDistance = distanceToPlanet * 0.7 + planet.radius_km * 0.2;

    // const fixedCameraDistance = 1000;

    return direction.clone().multiplyScalar(cameraDistance);
  }, [planetPosition, planet]);

  useEffect(() => {
    if (!cameraControlsRef.current) return;

    const controls = cameraControlsRef.current;

    if (selectedPlanet && planetPosition && targetCameraPosition) {
      lastCameraPositionRef.current = controls.camera.position.clone();
      controls.setLookAt(
        targetCameraPosition.x,
        targetCameraPosition.y,
        targetCameraPosition.z,
        planetPosition.x,
        planetPosition.y,
        planetPosition.z,
        true,
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
        true,
      );
    }
  }, [selectedPlanet, planetPosition, targetCameraPosition]);

  useEffect(() => {
    if (!cameraControlsRef.current) return;

    const controls = cameraControlsRef.current;

    const newPosition =
      isObjectPivot && planetPosition ? planetPosition : ORIGIN;

    controls.setTarget(newPosition.x, newPosition.y, newPosition.z, true);
  }, [isObjectPivot, planetPosition]);

  return (
    <>
      <CameraControls
        ref={cameraControlsRef}
        enabled
        minDistance={900}
        maxDistance={50000}
      />
    </>
  );
};
