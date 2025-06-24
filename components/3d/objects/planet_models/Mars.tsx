"use client"
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { useImperativeHandle, useRef, forwardRef } from "react";
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import type { Group } from "three";

interface MarsModelProps extends React.ComponentProps<"group"> {
  scale: number;
}

type GLTFResult = GLTF & {
  nodes: {
    Cube008: THREE.Mesh
  }
  materials: {
    ['Default OBJ.005']: THREE.MeshStandardMaterial
  }
}

export const MarsModel = forwardRef<Mesh | Group, MarsModelProps>((props, ref) => {
  const { nodes, materials } = useGLTF("/models/mars.glb") as unknown as GLTFResult;
  const meshRef = useRef<Mesh>(null);

  useImperativeHandle(ref, () => meshRef.current!, []);

  const { ...rest } = props;

  return (
    <group {...rest} dispose={null}>
      <mesh
        ref={meshRef}
        geometry={nodes.Cube008.geometry}
        material={materials["Default OBJ.005"]}
        scale={props.scale}
      />
    </group>
  );
});

MarsModel.displayName = "MarsModel";

useGLTF.preload("/models/mars.glb");
