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

export const SpaceControls = () => {
  const { selectedPlanet } = useSelectedPlanet();
  const { selectedDate } = useSelectedDate();
  const { isObjectPivot } = useIsObjectPivot();

  const controlsRef = useRef<any>(null);
  const lastCameraPositionRef = useRef<any>(null);
  const [movingToTarget, setMovingToTarget] = useState(false);
  const [targetDestination, setTargetDestination] = useState<THREE.Vector3>(
    new THREE.Vector3(0, 0, 0)
  );

  const [destinationVector, setDestinationVector] =
    useState<THREE.Vector3 | null>(null);

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
  }, [selectedPlanet, selectedDate]);

  const targetCameraPosition = useMemo(() => {
    if (!planetPosition) return null;

    const direction = planetPosition.clone().normalize();
    const distanceToPlanet = planetPosition.length();
    const cameraDistance = distanceToPlanet + planet?.radius_km * 0.2;
    const offsetPosition = direction.clone().multiplyScalar(cameraDistance);

    return offsetPosition;
  }, [planetPosition, isObjectPivot]);

  useEffect(() => {
    if (selectedPlanet && controlsRef.current) {
      const camera = controlsRef.current.object;

      lastCameraPositionRef.current = camera.position.clone();

      setMovingToTarget(true);
    }

    if (
      !selectedPlanet &&
      lastCameraPositionRef.current &&
      controlsRef.current
    ) {
      setMovingToTarget(true);
    }
  }, [selectedPlanet]);

  useEffect(() => {
    const newTarget =
      isObjectPivot && planetPosition
        ? planetPosition
        : new THREE.Vector3(0, 0, 0);

    setTargetDestination(newTarget);
  }, [isObjectPivot, planetPosition]);

  useFrame(() => {
    const camera = controlsRef.current.object;

    if (controlsRef.current) {
      if (movingToTarget) {
        let destination =
          selectedPlanet && targetCameraPosition
            ? targetCameraPosition
            : lastCameraPositionRef.current;

        if (destination) {
          camera.position.lerp(destination, 0.1);

          if (camera.position.distanceTo(destination) < 0.1) {
            camera.position.copy(destination);
            setDestinationVector(destination);
            setMovingToTarget(false);
          }

          controlsRef.current.update();
        }
      }

      if (targetDestination) {
        controlsRef.current.target.lerp(targetDestination, 0.1);

        if (controlsRef.current.target.distanceTo(targetDestination) < 0.01) {
          controlsRef.current.target.copy(targetDestination);
        }

        controlsRef.current.update();
      }
    }
  });

  return (
    <>
      <OrbitControls ref={controlsRef} enableZoom={true} />

      {destinationVector && (
        <mesh position={destinationVector}>
          <sphereGeometry args={[100, 16, 16]} />
          <meshBasicMaterial color="red" />
        </mesh>
      )}
    </>
  );
};
