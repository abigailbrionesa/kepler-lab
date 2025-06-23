import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

const VenusModel = (props) => {
  const { nodes, materials } = useGLTF('/models/venus.glb');
  const mesh = nodes.cylindrically_mapped_sphereMesh;

  return (
    <group {...props} dispose={null}>
      <mesh geometry={mesh.geometry} material={materials['Default OBJ']} />
    </group>
  );
};

useGLTF.preload('/models/venus.glb');

export default VenusModel;
