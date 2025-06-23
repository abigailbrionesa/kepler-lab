"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Sun from "./objects/sun";
import Stars from "./objects/stars";
import { Light } from "./effects/light";
import Planets from "./objects/planets";
import { SpaceControls } from "./effects/orbit-controls";
import { useSelectedDate } from "@/context/view-selected-date";
import { useSelectedPlanet } from "@/context/view-selected-planet";
import { cn } from "@/lib/utils";
import SelectedPlanetHeader from "../panel/selected-planet-header";
import planets_json from "../../lib/data/planets.json";
import type { PlanetData } from "./objects/planets";

export default function SolarSystem() {
  const planets_data = planets_json as PlanetData[];

  const { selectedDate } = useSelectedDate();
  const { selectedPlanet,  } = useSelectedPlanet();

  return (
    <Suspense fallback={<div>Loading solar system...</div>}>
      <div
        className={cn(
          "w-full h-full text-white custom-border relative bg-black z-0",
          selectedPlanet ? "" : ""
        )}
      >
        {selectedPlanet && <SelectedPlanetHeader />}

        <Canvas
          gl={{ antialias: false }}
          camera={{
            position: [-1000, 500, 1000],
            near: 100,
            far: 100_000,
            fov: 45,
          }}
        >
          <Sun />
          <SpaceControls />
          <Stars number={80000} size={3} />
          <Planets planets_data={planets_data} selected_date={selectedDate} />
          <Light />
        </Canvas>
      </div>
    </Suspense>
  );
}

{
  /*   */
}

{
  /* <Grid />
            <Sun />
            <Planets />
            <Stars number={80000} size={3} />
            <Light />*/
}
