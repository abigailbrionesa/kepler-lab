import { Line } from "@react-three/drei";
import { Vector3 } from "three";

interface OrbitProps {
  points: Vector3[];
}

export const Orbit: React.FC<OrbitProps> = ({ points }) => {
  return (
    <Line
      points={points}
      color="#e6dfd7"
      lineWidth={1}
      opacity={0.2}
      transparent={true}
    />
  );
};
