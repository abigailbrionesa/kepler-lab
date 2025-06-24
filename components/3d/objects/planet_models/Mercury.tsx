"use client";
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import type { Group } from "three";
interface MercuryModelProps extends React.ComponentProps<"group"> {
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


export const MercuryModel = forwardRef<Mesh | Group, MercuryModelProps>(
  (props, ref) => {
    const { nodes, materials } = useGLTF("/models/mercury.glb") as unknown as GLTFResult;
    const meshRef = useRef<Mesh>(null);

    useImperativeHandle(ref, () => meshRef.current!, []);

    const { scale, ...rest } = props;

    return (
      <group {...rest} dispose={null}>
        <mesh
          ref={meshRef}
          geometry={nodes.cylindrically_mapped_sphereMesh.geometry} material={materials['Default OBJ']}
          scale={scale}
        />
      </group>
    );
  }
);

MercuryModel.displayName = "MercuryModel";

useGLTF.preload("/models/mercury.glb");
