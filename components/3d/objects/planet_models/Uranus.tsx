"use client";
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
import type { Group } from "three";

type GLTFResult = GLTF & {
  nodes: {
    Uranus: THREE.Mesh;
  };
  materials: {
    ["Default OBJ.001"]: THREE.MeshStandardMaterial;
  };
};

export const UranusModel = forwardRef<Group, React.ComponentProps<"group">>(
  (props, ref) => {
    const { nodes, materials } = useGLTF(
      "/models/uranus.glb",
    ) as unknown as GLTFResult;

    const groupRef = useRef<Group>(null);
    useImperativeHandle(ref, () => groupRef.current!, []);

    return (
      <group {...props} ref={groupRef} dispose={null}>
        <mesh
          geometry={nodes.Uranus.geometry}
          material={materials["Default OBJ.001"]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    );
  },
);

UranusModel.displayName = "UranusModel";

useGLTF.preload("/models/uranus.glb");
