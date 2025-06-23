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
import * as THREE from "three"

export const SpaceControls = () => {
  const { selectedPlanet,  } = useSelectedPlanet();
  const { selectedDate,  } = useSelectedDate();
    
  const controlsRef = useRef<any>(null);
  const lastCameraPositionRef = useRef<any>(null);
  const [movingToTarget, setMovingToTarget] = useState(false);

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
    if (!planetPosition) return null;

    const offsetPosition = planetPosition.clone();

    offsetPosition.add(new THREE.Vector3(0, 30, 60)); 

    return offsetPosition;
  }, [planetPosition]);

  useEffect(() => {
    if (selectedPlanet && controlsRef.current) {
      const camera = controlsRef.current.object;

      lastCameraPositionRef.current = camera.position.clone();

      setMovingToTarget(true);
    }

    if (!selectedPlanet && lastCameraPositionRef.current && controlsRef.current) {
      setMovingToTarget(true);
    }
  }, [selectedPlanet]);


  useFrame(() => {
    const camera = controlsRef.current.object;

    if (controlsRef.current && movingToTarget) {
      let destination = selectedPlanet && targetCameraPosition ? targetCameraPosition : lastCameraPositionRef.current;

      if (destination) {
        camera.position.lerp(destination, 0.1);
        controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.1);

        if (camera.position.distanceTo(destination) < 0.1) {
          camera.position.copy(destination); 
          setMovingToTarget(false);
        }

        controlsRef.current.update();
      }
    }
  });


{/* */}
  return <OrbitControls ref={controlsRef} enableZoom={true} />;
};
