import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

const JupiterModel = (props) => {
  const { nodes, materials } = useGLTF('/models/jupiter.glb');

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={(nodes.cubemap).geometry}
        material={materials.None}
      />
    </group>
  );
};

useGLTF.preload('/models/jupiter.glb');

export default JupiterModel;
