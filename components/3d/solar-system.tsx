import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Sun from "./objects/sun";
import Stars from "./objects/stars";
import Light from "./effects/light";
const SolarSystem = () => {

  return (
      <Suspense
        fallback={
          <div>hola</div>
        }
      >
        <div className={`w-full h-full bg-black z-0`}>
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
            <Sun/>
            <Stars number={80000} size={3} />
            <Light />
          </Canvas>
        </div>
      </Suspense>
  );
};

export default SolarSystem;

   {/* <Grid />
            <Sun />
            <Planets />
            <Stars number={80000} size={3} />
            <Light />*/} 