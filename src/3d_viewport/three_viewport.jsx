/**
 * Renders a 3D viewport using React Three Fiber and Drei libraries.
 * The viewport displays an ARM_model component in a Stage with an environment and a grid.
 * The camera position, field of view, and fog are set.
 * The viewport also includes OrbitControls and postprocessing effects.
 * @returns {JSX.Element} The 3D viewport component.
 */

import { Canvas} from '@react-three/fiber'
import { Stage, Grid, OrbitControls, Environment, Loader } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { ARM_model } from './Arm_model'


function Three_viewport() {
  return (
    <>
          <Canvas gl={{ logarithmicDepthBuffer: true }} camera={{ position: [-15, 0, 10], fov: 28 }} style={{borderRadius:'8px'}}>
            <fog attach="fog" args={['#292826', 15, 21.5]} />
            <Stage intensity={0.5} environment={null} adjustCamera={false} >
              
              <ARM_model scale={[.25,.25,.25]} position={[0,-1.8,0]} />
              
            </Stage>
            <Grid renderOrder={-1} position={[0, -.85, 0]} infiniteGrid cellSize={0.6} cellThickness={0.6} sectionSize={3.3} sectionThickness={1.5} sectionColor={[9, 1, 1]} fadeDistance={30} />
             
            <OrbitControls autoRotate autoRotateSpeed={0.05} enableZoom={false} makeDefault minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={1} mipmapBlur />
            </EffectComposer>
            <Environment background path='https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/hdris/potsdamer-platz/'  files='potsdamer_platz_1k.hdr' blur={.8} />
            
          </Canvas>
          <Loader/>
          </>  
  )
}

export default Three_viewport