"use client"
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { useImperativeHandle, useRef, forwardRef } from "react";
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import type { Group } from "three";
interface NeptuneModelProps extends React.ComponentProps<"group"> {
  scale: number;
}
type GLTFResult = GLTF & {
  nodes: {
    Neptune: THREE.Mesh
  }
  materials: {
    ['Default OBJ.001']: THREE.MeshStandardMaterial
  }
}

export const NeptuneModel = forwardRef<Mesh | Group, NeptuneModelProps>(
  (props, ref) => {
    const { nodes, materials } = useGLTF("/models/neptune.glb") as unknown as GLTFResult;
    const meshRef = useRef<Mesh>(null);

    useImperativeHandle(ref, () => meshRef.current!, []);

    const { ...rest } = props;

    return (
      <group {...rest} dispose={null}>
        <mesh
          ref={meshRef}
          geometry={nodes.Neptune.geometry}
          material={materials["Default OBJ.001"]}
          scale={props.scale}
        />
      </group>
    );
  }
);

NeptuneModel.displayName = "NeptuneModel";
