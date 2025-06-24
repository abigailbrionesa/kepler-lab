"use client";
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";

interface MercuryModelProps extends React.ComponentProps<"group"> {
  scale: number;
}

export const MercuryModel = forwardRef<Mesh, MercuryModelProps>(
  (props, ref) => {
    const { nodes, materials } = useGLTF("/models/mercury.glb") as any;
    const meshRef = useRef<Mesh>(null);

    useImperativeHandle(ref, () => meshRef.current!, []);

    const { scale, ...rest } = props;

    return (
      <group {...rest} dispose={null}>
        <mesh
          ref={meshRef}
          geometry={nodes.Cube008.geometry}
          material={materials["Default OBJ.005"]}
          scale={scale}
        />
      </group>
    );
  }
);

MercuryModel.displayName = "MercuryModel";

useGLTF.preload("/models/mercury.glb");
