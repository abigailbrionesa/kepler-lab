"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Sun from "./components/3d/objects/sun";
import Stars from "./components/3d/objects/stars";
import { Light } from "./components/3d/effects/light";
import Planets from "./components/3d/planets";
import { SpaceControls } from "./components/3d/effects/orbit-controls";
import planets_json from "./lib/data/planets.json";
import CustomObject from "./components/3d/custom-object";
import Asteroid from "./components/3d/asteroid";
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
        <CustomObject />
        <Asteroid />
        <Sun />
        <SpaceControls />
        <Stars number={80000} size={3} />
        <Planets planets_data={planets_data} />
        <Light />
      </Suspense>
    </Canvas>
  );
}
