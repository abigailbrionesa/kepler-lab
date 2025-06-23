import React, { memo } from 'react';
import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing';
import { N8AO } from '@react-three/postprocessing';
import { TiltShift2 } from '@react-three/postprocessing';
import { ToneMapping } from '@react-three/postprocessing';

const Light: React.FC = memo(() => {
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

      <TiltShift2 samples={4} blur={0.04} />
      <ToneMapping />
      </EffectComposer>
    </>
  );
});

export default Light;