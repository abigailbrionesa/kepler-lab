"use client"
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import type { Group } from "three";

interface JupiterModelProps extends React.ComponentProps<"group"> {
  scale: number;
}

type GLTFResult = GLTF & {
  nodes: {
    cubemap: THREE.Mesh
  }
  materials: {
    None: THREE.MeshStandardMaterial
  }
}


export const JupiterModel = forwardRef<Mesh | Group, JupiterModelProps>((props, ref) => {
  const { nodes, materials } = useGLTF("/models/jupiter.glb") as unknown as GLTFResult;
  const meshRef = useRef<Mesh>(null);

  useImperativeHandle(ref, () => meshRef.current!, []);

  const { scale, ...rest } = props;

  return (
    <group {...rest} dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.cubemap.geometry}
        material={materials.None}
        scale={scale}
      />
    </group>
  );
});

JupiterModel.displayName = "JupiterModel";

useGLTF.preload("/models/jupiter.glb");
