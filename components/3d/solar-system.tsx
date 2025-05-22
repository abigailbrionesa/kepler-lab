import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Sun from "./objects/sun";
import Stars from "./objects/stars";
import Light from "./effects/light";
import type { Planet } from "@prisma/client";
import Planets from "./objects/planets";

export default function SolarSystem(planets_data: Planet[]) {
  console.log(planets_data)
  return (
    <Suspense fallback={<div>Loading solar system...</div>}>
      <div className="w-full h-full bg-black z-0">
        <Canvas
          gl={{ antialias: false }}
          frameloop="demand"
          camera={{
            position: [-1000, 500, 1000],
            near: 100,
            far: 100_000,
            fov: 45,
          }}
        >
          <Sun />
          <Stars number={80000} size={3} />
            <Planets planets_data={planets_data} />
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