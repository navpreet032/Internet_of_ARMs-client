import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Stage, Grid, OrbitControls, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { ARM_model } from './Arm_model'

function Three_viewport() {
  return (
    
          <Canvas gl={{ logarithmicDepthBuffer: true }} camera={{ position: [-15, 0, 10], fov: 25 }}>
            <fog attach="fog" args={['#292826', 15, 21.5]} />
            <Stage intensity={0.5} environment="city"  adjustCamera={false} >
              <ARM_model scale={[.25,.25,.25]} position={[0,0,0]}/>
              {/* <ARM_model scale={[.25,.25,.25]} position={[-0.4,-0.4,-2.5]}/> */}
            </Stage>
            <Grid renderOrder={-1} position={[0.1, -0.5, 0.1]} infiniteGrid cellSize={0.6} cellThickness={0.6} sectionSize={2.5} sectionThickness={1.5} sectionColor={'#292826'} fadeDistance={30} />
            <OrbitControls autoRotate autoRotateSpeed={0.05} enableZoom={false} makeDefault minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={1} mipmapBlur />
            </EffectComposer>
            <Environment background preset="sunset" blur={0.8} />
          </Canvas>
        
  )
}

export default Three_viewport