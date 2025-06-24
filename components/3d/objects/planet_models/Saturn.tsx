"use client";
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";

interface SaturnModelProps extends React.ComponentProps<"group"> {
  scale: number;
}

export const SaturnModel = forwardRef<Mesh, SaturnModelProps>((props, ref) => {
  const { nodes, materials } = useGLTF("/models/saturn.glb") as any;
  const meshRef = useRef<Mesh>(null);

  useImperativeHandle(ref, () => meshRef.current!, []);

  const { scale, ...rest } = props;

  return (
    <group {...rest} dispose={null}>
      <group position={[-1165.45, -451.019, -1165.45]} scale={scale}>
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
          geometry={nodes.mesh_0.geometry}
          material={materials.None}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_0_1.geometry}
          material={materials.None}
        />
      </group>
    </group>
  );
});

SaturnModel.displayName = "SaturnModel";

useGLTF.preload("/models/saturn.glb");
