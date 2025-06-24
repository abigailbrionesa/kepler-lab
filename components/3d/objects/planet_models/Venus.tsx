"use client"
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { useImperativeHandle, useRef, forwardRef } from "react";
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import type { Group } from "three";

interface VenusModelProps extends React.ComponentProps<"group"> {
  scale: number;
}

type GLTFResult = GLTF & {
  nodes: {
    cylindrically_mapped_sphereMesh: THREE.Mesh
  }
  materials: {
    ['Default OBJ']: THREE.MeshStandardMaterial
  }
}


export const VenusModel = forwardRef<Mesh | Group, VenusModelProps>((props, ref) => {
  const { nodes, materials } = useGLTF("/models/venus.glb") as unknown as GLTFResult;
  const meshRef = useRef<Mesh>(null);

  useImperativeHandle(ref, () => meshRef.current!, []);

  const { scale, ...rest } = props;

  return (
    <group {...rest} dispose={null}>
      <mesh
        ref={meshRef}
        geometry={nodes.cylindrically_mapped_sphereMesh.geometry}
        material={materials["Default OBJ"]}
        scale={scale}
      />
    </group>
  );
});

VenusModel.displayName = "VenusModel";

useGLTF.preload("/models/venus.glb");

