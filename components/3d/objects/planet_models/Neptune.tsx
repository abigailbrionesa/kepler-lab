"use client";
import { useGLTF } from "@react-three/drei";
import { useImperativeHandle, useRef, forwardRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import type { Group } from "three";

type GLTFResult = GLTF & {
  nodes: {
    Neptune: THREE.Mesh;
  };
  materials: {
    ["Default OBJ.001"]: THREE.MeshStandardMaterial;
  };
};

export const NeptuneModel = forwardRef<
  Group,
  React.ComponentProps<"group">
>((props, ref) => {
  const { nodes, materials } = useGLTF(
    "/models/neptune.glb"
  ) as unknown as GLTFResult;

  const groupRef = useRef<Group>(null);
  useImperativeHandle(ref, () => groupRef.current!, []);

  return (
    <group {...props} ref={groupRef} dispose={null}>
      <mesh
        geometry={nodes.Neptune.geometry}
        material={materials["Default OBJ.001"]}
      />
    </group>
  );
});

NeptuneModel.displayName = "NeptuneModel";
