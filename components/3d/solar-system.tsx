"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Sun from "./objects/sun";
import Stars from "./objects/stars";
import { Light } from "./effects/light";
import Planets from "./objects/planets";
import { SpaceControls } from "./effects/orbit-controls";
import planets_json from "../../lib/data/planets.json";
import OrbitCreator from "./orbit-creator";
import Asteroid from "./asteroid";
import type { PlanetData } from "@/lib/types";

export default function SolarSystem() {
  const planets_data = planets_json as PlanetData[];

  return (
    <Canvas
      gl={{ antialias: false }}
      camera={{
        position: [-1000, 500, 1000],
        near: 100,
        far: 100_000,
        fov: 45,
      }}
    >
      <Suspense fallback={null}>
        <OrbitCreator/>
        <Asteroid/>
        <Sun />
        <SpaceControls />
        <Stars number={80000} size={3} />
        <Planets planets_data={planets_data} />
        <Light />
      </Suspense>
    </Canvas>
  );
}
