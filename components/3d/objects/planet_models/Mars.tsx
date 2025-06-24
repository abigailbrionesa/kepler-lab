"use client"
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { useImperativeHandle, useRef, forwardRef } from "react";

interface MarsModelProps extends React.ComponentProps<"group"> {
  scale: number;
}

export const MarsModel = forwardRef<Mesh, MarsModelProps>((props, ref) => {
  const { nodes, materials } = useGLTF("/models/mars.glb") as any;
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
