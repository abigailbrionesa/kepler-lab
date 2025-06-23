import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

const UranusModel = (props) => {
  const { nodes, materials } = useGLTF('/models/uranus.glb');

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={(nodes.Uranus).geometry}
        material={materials['Default OBJ.001']}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
};

useGLTF.preload('/models/uranus.glb');

export default UranusModel;
