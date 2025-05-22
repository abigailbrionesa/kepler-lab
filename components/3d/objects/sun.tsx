import { SUN_RADIUS } from "@/lib/constants";

const Sun = () => {

    return (
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[SUN_RADIUS * 1, 32, 32]} />
            <meshStandardMaterial
                emissive="orange"
                emissiveIntensity={20}
            />
        </mesh>
    );
};

export default Sun;
