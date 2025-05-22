import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Sun from "./objects/sun";
import Stars from "./objects/stars";
import Light from "./effects/light";
import type { Planet } from "@prisma/client";
import Planets from "./objects/planets";
import { SpaceControls } from "./effects/orbit-controls";
import { useSelectedDate } from "@/context/view-selected-date";

export default function SolarSystem({planets_data}: {planets_data: Planet[]}) {

  const { selectedDate } = useSelectedDate();

  return (
    <Suspense fallback={<div>Loading solar system...</div>}>
      <div className="w-full h-full bg-black z-0">
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
          <SpaceControls/>
          <Stars number={80000} size={3} />
            <Planets planets_data={planets_data} selected_date={selectedDate} />
          <Light />
        </Canvas>
      </div>
    </Suspense>
  )
}

 {/*   */}


   {/* <Grid />
            <Sun />
            <Planets />
            <Stars number={80000} size={3} />
            <Light />*/} 