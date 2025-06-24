"use client"
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";

interface UranusModelProps extends React.ComponentProps<"group"> {
  scale: number;
}

export const UranusModel = forwardRef<Mesh, UranusModelProps>((props, ref) => {
  const { nodes, materials } = useGLTF("/models/uranus.glb") as any;
  const meshRef = useRef<Mesh>(null);

  useImperativeHandle(ref, () => meshRef.current!, []);

  const { scale, ...rest } = props;

  return (
    <group {...rest} dispose={null}>
      <mesh
        ref={meshRef}
        geometry={nodes.Uranus.geometry}
        material={materials["Default OBJ.001"]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={scale}
      />
    </group>
  );
});

UranusModel.displayName = "UranusModel";

useGLTF.preload("/models/uranus.glb");
