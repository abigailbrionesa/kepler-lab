"use client";
import { useGLTF } from "@react-three/drei";
import { useImperativeHandle, useRef, forwardRef } from "react";
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

export const VenusModel = forwardRef<
  Group,
  React.ComponentProps<"group">
>((props, ref) => {
  const { nodes, materials } = useGLTF(
    "/models/venus.glb"
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
});

VenusModel.displayName = "VenusModel";

useGLTF.preload("/models/venus.glb");
