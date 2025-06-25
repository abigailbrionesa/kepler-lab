import { Line } from "@react-three/drei";
import { Vector3 } from "three";

interface OrbitProps {
  points: Vector3[];
}

export const Orbit: React.FC<OrbitProps> = ({ points }) => {
  return (
    <Line
      points={points}
      color="white"
      lineWidth={1}
      opacity={0.2}
      transparent={true}
      dashed={false}
    />
  );
};
