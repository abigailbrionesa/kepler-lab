"use client";
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import type { Group } from "three";

type GLTFResult = GLTF & {
  nodes: {
    Saturn001: THREE.Mesh;
    RingsTop: THREE.Mesh;
    RingsBottom: THREE.Mesh;
  };
  materials: {
    None: THREE.MeshStandardMaterial;
    SaturnRings: THREE.MeshStandardMaterial;
  };
};

export const SaturnModel = forwardRef<Group, React.ComponentProps<"group">>(
  (props, ref) => {
    const { nodes, materials } = useGLTF(
      "/models/saturn.glb",
    ) as unknown as GLTFResult;

    const groupRef = useRef<Group>(null);
    useImperativeHandle(ref, () => groupRef.current!, []);

    return (
      <group ref={groupRef} {...props} dispose={null}>
        <mesh geometry={nodes.Saturn001.geometry} material={materials.None} />
        <mesh
          geometry={nodes.RingsTop.geometry}
          material={materials.SaturnRings}
        />
        <mesh
          geometry={nodes.RingsBottom.geometry}
          material={materials.SaturnRings}
        />
      </group>
    );
  },
);

SaturnModel.displayName = "SaturnModel";

useGLTF.preload("/models/saturn.glb");
