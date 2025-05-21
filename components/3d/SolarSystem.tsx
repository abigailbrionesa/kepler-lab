import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

const SolarSystem = () => {

  return (
      <Suspense
        fallback={
          <>
          </>
        }
      >
        <div className={`w-full h-full`}>
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