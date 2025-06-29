import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { ToneMapping } from "@react-three/postprocessing";
import { Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export const Light = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[150, 150, 150]} intensity={1} />
      <EffectComposer>
        <Bloom
          mipmapBlur
          luminanceThreshold={0.2}
          luminanceSmoothing={0.5}
          intensity={3}
        />
        <ToneMapping />
        <Vignette
          offset={0.3}
          darkness={1}
          eskil={false}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </>
  );
};
