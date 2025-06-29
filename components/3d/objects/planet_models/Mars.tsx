"use client";
import { useGLTF } from "@react-three/drei";
import { useImperativeHandle, useRef, forwardRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import type { Group } from "three";

type GLTFResult = GLTF & {
  nodes: {
    Cube008: THREE.Mesh;
  };
  materials: {
    ["Default OBJ.005"]: THREE.MeshStandardMaterial;
  };
};

export const MarsModel = forwardRef<Group, React.ComponentProps<"group">>(
  (props, ref) => {
    const { nodes, materials } = useGLTF(
      "/models/mars.glb",
    ) as unknown as GLTFResult;

    const groupRef = useRef<Group>(null);
    useImperativeHandle(ref, () => groupRef.current!, []);

    return (
      <group {...props} ref={groupRef} dispose={null}>
        <mesh
          geometry={nodes.Cube008.geometry}
          material={materials["Default OBJ.005"]}
        />
      </group>
    );
  },
);

MarsModel.displayName = "MarsModel";

useGLTF.preload("/models/mars.glb");
