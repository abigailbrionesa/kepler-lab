import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

interface NeptuneModelProps extends React.ComponentProps<'group'> {
  scale: number;
  visible?: boolean;
}


export const NeptuneModel = forwardRef<Mesh, NeptuneModelProps>((props, ref) => {
  const { nodes, materials } = useGLTF('/models/neptune.glb') as any;

  const { scale, visible = true, ...rest } = props;

  return (
    <group {...rest} dispose={null}>
      <mesh
        ref={ref}
        geometry={nodes.Neptune.geometry}
        material={materials['Default OBJ.001']}
        rotation={[Math.PI / 2, 0, 0]}
        scale={scale}
        visible={visible} 
      />
    </group>
  );
});
