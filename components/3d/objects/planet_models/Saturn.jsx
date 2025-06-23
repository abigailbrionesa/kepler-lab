import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

const SaturnModel = (props) => {
  const { nodes, materials } = useGLTF('/models/saturn.glb');

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={(nodes.Saturn001).geometry}
        material={materials.None}
      />
      <mesh
        geometry={(nodes.RingsTop).geometry}
        material={materials.SaturnRings}
      />
      <mesh
        geometry={(nodes.RingsBottom).geometry}
        material={materials.SaturnRings}
      />
    </group>
  );
};

useGLTF.preload('/models/saturn.glb');

export default SaturnModel;
