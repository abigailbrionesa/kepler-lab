import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { ToneMapping } from "@react-three/postprocessing";
export const Light = () => {
  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight position={[150, 150, 150]} intensity={1} />
      <EffectComposer>
        <Bloom
          mipmapBlur
          luminanceThreshold={0.2}
          intensity={0.3}
          luminanceSmoothing={1}
        />
        <ToneMapping />
      </EffectComposer>
    </>
  );
};
{
  /*  import { TiltShift2 } from '@react-three/postprocessing';
import { ToneMapping } from '@react-three/postprocessing';
<TiltShift2 samples={4} blur={0.04} />   */
}
