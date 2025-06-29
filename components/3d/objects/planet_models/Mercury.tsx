"use client";
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import type { Group } from "three";

type GLTFResult = GLTF & {
  nodes: {
    cylindrically_mapped_sphereMesh: THREE.Mesh;
  };
  materials: {
    ["Default OBJ"]: THREE.MeshStandardMaterial;
  };
};

export const MercuryModel = forwardRef<Group, React.ComponentProps<"group">>(
  (props, ref) => {
    const { nodes, materials } = useGLTF(
      "/models/mercury.glb",
    ) as unknown as GLTFResult;

    const groupRef = useRef<Group>(null);
    useImperativeHandle(ref, () => groupRef.current!, []);

    return (
      <group {...props} ref={groupRef} dispose={null}>
        <mesh
          geometry={nodes.cylindrically_mapped_sphereMesh.geometry}
          material={materials["Default OBJ"]}
        />
      </group>
    );
  },
);

MercuryModel.displayName = "MercuryModel";

useGLTF.preload("/models/mercury.glb");
