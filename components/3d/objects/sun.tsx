"use client";

import { useRef, useEffect } from "react";
import { Object3D } from "three";
import { useOccludableRefs } from "@/context/occludable-refs-context";
import { SUN_RADIUS } from "@/lib/constants";

const Sun = () => {
  const meshRef = useRef<Object3D>(null);
  const { registerRef, unregisterRef } = useOccludableRefs();

  useEffect(() => {
    registerRef(meshRef);
    return () => {
      unregisterRef(meshRef);
      console.log("unregistering sun")
    };
  }, [registerRef, unregisterRef]);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[SUN_RADIUS * 1, 32, 32]} />
      <meshStandardMaterial emissive="orange" emissiveIntensity={20} />
    </mesh>
  );
};

export default Sun;
