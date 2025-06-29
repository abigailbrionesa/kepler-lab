import { useRef, useEffect } from "react";
import { Object3D, TextureLoader } from "three";
import { useOccludableRefs } from "@/context/occludable-refs-context";
import { SUN_RADIUS } from "@/lib/constants";
import { useLoader } from "@react-three/fiber";

const Sun = () => {
  const meshRef = useRef<Object3D>(null);
  const { registerRef, unregisterRef } = useOccludableRefs();

  const sunTexture = useLoader(TextureLoader, "/textures/sun-texture.jpg");

  useEffect(() => {
    registerRef(meshRef);
    return () => {
      unregisterRef(meshRef);
    };
  }, [registerRef, unregisterRef]);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[SUN_RADIUS, 16, 16]} />
      <meshStandardMaterial
        map={sunTexture}
        emissiveMap={sunTexture}
        emissive={"#d49000"}
        emissiveIntensity={3}
        toneMapped={true}
      />
    </mesh>
  );
};

export default Sun;
