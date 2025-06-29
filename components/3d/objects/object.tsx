"use client";
import { useMemo } from "react";
import PlanetModel from "./planet_models/planet-model";
import { Badge } from "@/components/ui/shadcn/badge";
import { Html } from "@react-three/drei";
import { get_orbit_points, get_position_at_selected_date } from "@/lib/math";
import { Orbit } from "./orbit";
import { useSelectedPlanet } from "@/context/scene/view-selected-planet";
import { useRef } from "react";
import type { Object3D } from "three";
import { useOccludableRefs } from "@/context/scene/occludable-refs-context";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Mesh } from "three";
import { useState } from "react";
import { useTransition, animated as a3 } from "@react-spring/three";
import type { Group } from "three";
import { useViewConfig } from "@/context/scene/view-config-context";
import { useSelectedAsteroidSpkid } from "@/context/scene/view-selected-asteroid-spkid";
import type { PlanetProps } from "@/lib/types";

export default function Object(props: PlanetProps) {
  const { viewConfig } = useViewConfig();

  const { selectedPlanet, setSelectedPlanet } = useSelectedPlanet(); //call selectedplanet
  const { selectedAsteroidSpkid, setSelectedAsteroidSpkid } =
    useSelectedAsteroidSpkid(); //call selectedplanet

  const { refs, registerRef, unregisterRef } = useOccludableRefs(); //get refs, (planetModel if planet) and sun

  const objectRef = useRef<Mesh | Group>(null); // occludable if planet, get refs (sun) always

  const [hidden, set] = useState<boolean>(false); //for html animation

  const isCustom = props.custom === true;
  const isPlanet = !isCustom && props.type === "PLANET";
  const isNEO = props.type !== "PLANET";

  let isSelected = false;
  if (isPlanet) {
    isSelected = selectedPlanet === props.objectParams.name;
  } else if (isNEO) {
    isSelected = selectedAsteroidSpkid === props.objectParams.spkid;
  }

  const object_position = useMemo(() => {
    return get_position_at_selected_date(
      props.objectParams.distance_from_sun,
      props.objectParams.eccentricity,
      props.objectParams.mean_motion,
      props.objectParams.inclination,
      props.objectParams.argument_of_periapsis,
      props.objectParams.longitude_of_ascending_node,
      props.objectParams.mean_anomaly,
      props.objectParams.epoch,
      props.selectedDate,
    );
  }, [
    props.objectParams.distance_from_sun,
    props.objectParams.eccentricity,
    props.objectParams.mean_motion,
    props.objectParams.inclination,
    props.objectParams.argument_of_periapsis,
    props.objectParams.longitude_of_ascending_node,
    props.objectParams.mean_anomaly,
    props.objectParams.epoch,
    props.selectedDate,
  ]);
  const orbit_points = useMemo(() => {
    return get_orbit_points(
      props.objectParams.distance_from_sun,
      props.objectParams.eccentricity,
      props.objectParams.inclination,
      props.objectParams.argument_of_periapsis,
      props.objectParams.longitude_of_ascending_node,
    );
  }, [
    props.objectParams.distance_from_sun,
    props.objectParams.eccentricity,
    props.objectParams.inclination,
    props.objectParams.argument_of_periapsis,
    props.objectParams.longitude_of_ascending_node,
  ]);

  const handleObjectClick = () => {
    if (isPlanet) {
      setSelectedPlanet(props.objectParams.name);
    } else if (isNEO) {
      setSelectedAsteroidSpkid(props.objectParams.spkid);
    }
  };

  const occludeRefs = refs.current;

  const refCallback = useCallback(
    (el: Group | null) => {
      objectRef.current = el;
      if (isPlanet) {
        if (el) {
          registerRef(objectRef);
        } else {
          unregisterRef(objectRef);
        }
      }
    },
    [isPlanet, registerRef, unregisterRef],
  );

  const planetTransitions = useTransition(isPlanet && isSelected, {
    from: { scale: 0, opacity: 0 },
    enter: {
      scale: isPlanet ? 0.3 + props.objectParams.radius * 0.00001 : 0,
      opacity: 1,
    },
    leave: { scale: 0, opacity: 0 },
    config: { tension: 300, friction: 30 },
  });

  return (
    <>
      {isPlanet &&
        planetTransitions((style, item) =>
          item ? (
            <a3.group
              scale={style.scale}
              position={object_position}
              onClick={handleObjectClick}
            >
              <PlanetModel
                ref={refCallback}
                name={props.objectParams.name}
                scale={1}
              />
            </a3.group>
          ) : null,
        )}

      <group position={object_position}>
        <Html
          center
          zIndexRange={[2, 2]}
          onOcclude={set}
          occlude={occludeRefs as React.RefObject<Object3D>[]}
          className={cn(
            "transition-all duration-200 cursor-pointer z-50 group ",
            hidden ? "opacity-0 scale-90" : "opacity-100 scale-100",
          )}
        >
          <div onClick={handleObjectClick}>
            {viewConfig.labels && (
              <Badge
                variant={"outline"}
                className="absolute group-hover:-translate-y-1 transition-all -translate-x-1/2
             bottom-3  backdrop-blur- bg-background/85"
              >
                {props.objectParams.name}
              </Badge>
            )}
            <span
              className="absolute border w-4 h-4 group-hover:w-5 group-hover:h-5 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all"
              style={{ backgroundColor: props.objectParams.color }}
            ></span>
          </div>
        </Html>
      </group>

      {viewConfig.orbits && <Orbit points={orbit_points} />}
    </>
  );
}
