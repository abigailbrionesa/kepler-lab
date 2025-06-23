import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

const MarsModel = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/models/mars.glb');

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref} 
        geometry={nodes.Cube008.geometry}
        material={materials['Default OBJ.005']}
      />
    </group>
  );
});

useGLTF.preload('/models/mars.glb');

export default MarsModel;