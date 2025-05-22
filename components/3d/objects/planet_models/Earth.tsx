import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

const EarthModel = (props) => {
  const { nodes, materials } = useGLTF('/models/earth.glb') as unknown as GLTFResult;
  const mesh = nodes.Cube001;

  return (
    <group {...props} dispose={null}>
      <mesh geometry={mesh.geometry} material={materials['Default OBJ']} />
    </group>
  );
};

useGLTF.preload('/models/earth.glb');

export default EarthModel;