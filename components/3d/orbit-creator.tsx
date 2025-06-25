"use client";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Html } from "@react-three/drei";
import { get_orbit_points, get_position_at_selected_date } from "@/lib/math";
import { useRef } from "react";
import { useOccludableRefs } from "@/context/occludable-refs-context";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Mesh } from "three";
import { useState } from "react";
import type { Group } from "three";
import { useViewConfig } from "@/context/view-config-context";
import { Orbit } from "./objects/orbit";
import { useOrbitalParams } from "@/context/orbit-creator-params-context";


export default function OrbitCreator() {
  const {
    semiMajorAxis,
    eccentricity,
    orbitalPeriod,
    albedo,
    magnitude,
    diameter,
    inclination,
    argument_of_periapsis,
    longitude_of_ascending_node,
    mean_anomaly,
    mean_motion,
    epoch,
    name,
    color,
  } = useOrbitalParams();

  const planetRef = useRef<Mesh | Group>(null);
  const { refs, registerRef, unregisterRef } = useOccludableRefs();
  const [hidden, set] = useState<boolean>(false);
  const { viewConfig } = useViewConfig();

  const planet_position = useMemo(() => {
    return get_position_at_selected_date(
      semiMajorAxis,
      eccentricity,
      mean_motion,
      inclination,
      argument_of_periapsis,
      longitude_of_ascending_node,
      mean_anomaly,
      epoch,
      new Date("2000-01-01")
    );
  }, [
    semiMajorAxis,
    eccentricity,
    mean_motion,
    inclination,
    argument_of_periapsis,
    longitude_of_ascending_node,
    mean_anomaly,
    epoch,
  ]);

  const orbit_points = useMemo(() => {
    return get_orbit_points(
      semiMajorAxis,
      eccentricity,
      inclination,
      argument_of_periapsis,
      longitude_of_ascending_node
    );
  }, [
    semiMajorAxis,
    eccentricity,
    inclination,
    argument_of_periapsis,
    longitude_of_ascending_node,
  ]);

  const refCallback = useCallback(
    (el: Mesh | null) => {
      planetRef.current = el;
      if (el) {
        registerRef(planetRef);
      } else {
        unregisterRef(planetRef);
      }
    },
    [registerRef, unregisterRef]
  );

  return (
    <>
      <mesh ref={refCallback} position={planet_position}>
        <sphereGeometry args={[diameter / 2 / 1000, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <group position={planet_position}>
        <Html
          center
          zIndexRange={[2, 2]}
          onOcclude={set}
          className={cn(
            "transition-all duration-200 cursor-pointer z-50 group",
            hidden ? "opacity-0 scale-90" : "opacity-100 scale-100"
          )}
        >
          <div>
            {viewConfig.labels && (
              <Badge
                variant="outline"
                className="absolute group-hover:-translate-y-1 transition-all -translate-x-1/2 bottom-3 backdrop-blur bg-background/85"
              >
                {name}
              </Badge>
            )}
            <span
              className="absolute border-2 border-white w-4 h-4 group-hover:w-5 group-hover:h-5 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all"
              style={{ backgroundColor: color }}
            ></span>
          </div>
        </Html>
      </group>

      {viewConfig.orbits && <Orbit points={orbit_points} />}
    </>
  );
}
