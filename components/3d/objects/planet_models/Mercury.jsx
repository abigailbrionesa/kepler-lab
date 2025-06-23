import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

const MercuryModel = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/models/mercury.glb');

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref} // ✅ Ref is now forwarded to the mesh
        geometry={nodes.Cube008.geometry}
        material={materials['Default OBJ.005']}
      />
    </group>
  );
});

useGLTF.preload('/models/mercury.glb');

export default MercuryModel;