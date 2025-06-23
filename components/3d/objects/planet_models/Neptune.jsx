import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

const NeptuneModel = (props) => {
  const { nodes, materials } = useGLTF('/models/neptune.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={(nodes.Neptune).geometry}
        material={materials['Default OBJ.001']}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
};

useGLTF.preload('/models/neptune.glb');

export default NeptuneModel;
