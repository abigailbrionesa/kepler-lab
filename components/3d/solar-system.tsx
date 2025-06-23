"use client"
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Sun from "./objects/sun";
import Stars from "./objects/stars";
import Light from "./effects/light";
import type { PlanetData } from "./objects/planets";
import Planets from "./objects/planets";
import { SpaceControls } from "./effects/orbit-controls";
import { useSelectedDate } from "@/context/view-selected-date";
import { useSelectedPlanet } from "@/context/view-selected-planet";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function SolarSystem({ planets_data }: { planets_data: PlanetData[] }) {

  const { selectedDate } = useSelectedDate();
  const { selectedPlanet, setSelectedPlanet } = useSelectedPlanet();

  return (
    <Suspense fallback={<div>Loading solar system...</div>}>
      <div className={cn("w-full h-full text-white custom-border relative bg-black z-0", selectedPlanet ? "" : "")}>

        {selectedPlanet && (
          <div className="w-full absolute z-10 p-2 shadow-lg">
            <div className="w-full flex justify-between p-1 custom-border items-center">
            {selectedPlanet}
            <Button variant={"ghost"} onClick={() => setSelectedPlanet(undefined)} className="float-right">Cerrar</Button>
            </div>
          </div>
        )}

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
  )
}

{/*   */ }


{/* <Grid />
            <Sun />
            <Planets />
            <Stars number={80000} size={3} />
            <Light />*/} 