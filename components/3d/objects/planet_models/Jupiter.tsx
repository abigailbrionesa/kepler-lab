"use client"
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";

interface JupiterModelProps extends React.ComponentProps<"group"> {
  scale: number;
}

export const JupiterModel = forwardRef<Mesh, JupiterModelProps>((props, ref) => {
  const { nodes, materials } = useGLTF("/models/jupiter.glb") as any;
  const meshRef = useRef<Mesh>(null);

  useImperativeHandle(ref, () => meshRef.current!, []);

  const { scale, ...rest } = props;

  return (
    <group {...rest} dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes["Node_#0"].geometry}
        material={materials.None}
        scale={scale}
      />
    </group>
  );
});

JupiterModel.displayName = "JupiterModel";

useGLTF.preload("/models/jupiter.glb");
