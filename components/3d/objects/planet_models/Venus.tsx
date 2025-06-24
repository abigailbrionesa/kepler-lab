"use client"
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { useImperativeHandle, useRef, forwardRef } from "react";

interface VenusModelProps extends React.ComponentProps<"group"> {
  scale: number;
}

export const VenusModel = forwardRef<Mesh, VenusModelProps>((props, ref) => {
  const { nodes, materials } = useGLTF("/models/venus.glb") as any;
  const meshRef = useRef<Mesh>(null);

  useImperativeHandle(ref, () => meshRef.current!, []);

  const { scale, ...rest } = props;

  return (
    <group {...rest} dispose={null}>
      <mesh
        ref={meshRef}
        geometry={nodes.cylindrically_mapped_sphereMesh.geometry}
        material={materials["Default OBJ"]}
        scale={scale}
      />
    </group>
  );
});

VenusModel.displayName = "VenusModel";

useGLTF.preload("/models/venus.glb");

