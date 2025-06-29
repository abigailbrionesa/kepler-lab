"use client";
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import type { Group } from "three";

type GLTFResult = GLTF & {
  nodes: {
    cubemap: THREE.Mesh;
  };
  materials: {
    None: THREE.MeshStandardMaterial;
  };
};

export const JupiterModel = forwardRef<Group, React.ComponentProps<"group">>(
  (props, ref) => {
    const { nodes, materials } = useGLTF(
      "/models/jupiter.glb",
    ) as unknown as GLTFResult;

    const groupRef = useRef<Group>(null);
    useImperativeHandle(ref, () => groupRef.current!, []);

    return (
      <group {...props} ref={groupRef} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cubemap.geometry}
          material={materials.None}
        />
      </group>
    );
  },
);

JupiterModel.displayName = "JupiterModel";

useGLTF.preload("/models/jupiter.glb");
