import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

const MarsModel = (props) => {
  const { nodes, materials } = useGLTF('/models/mars.glb');

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={(nodes.Cube008).geometry}
        material={materials['Default OBJ.005']}
      />
    </group>
  );
};

useGLTF.preload('/models/mars.glb');

export default MarsModel;
