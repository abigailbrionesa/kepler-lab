import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

const MercuryModel = (props) => {
  const { nodes, materials } = useGLTF('/models/mercury.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={(nodes.Cube008).geometry}
        material={materials['Default OBJ.005']}
      />
    </group>
  );
};

useGLTF.preload('/models/mercury.glb');

export default MercuryModel;
