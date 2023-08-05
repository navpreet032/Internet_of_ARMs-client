/**
 * This is the main component of the Robotic Arm application.
 * It renders the 3D viewport and the control panel components.
 * @returns {JSX.Element} The App component.
 */

import './App.css'
import ControlPanal from './components/controlPanal/controlpanal'
import Overlay from './components/viewport_overlay/overlay'
import Three_viewport from './3d_viewport/three_viewport';

import { toast } from 'react-toastify';
import { Detector } from "react-detect-offline";



function App() {
  


  return (
    <div className="App">
 <Detector
  render={({ online }) => (
    online ? toast.success('Connected to Network !', {
      position: toast.POSITION.TOP_RIGHT
  }) : 
    toast.error('No Network !', {
      position: toast.POSITION.TOP_RIGHT
  })
  )}
/>
    <div className='viewport'>
    <Three_viewport />
    <Overlay/>
    </div>
    
    <div className='control'>
    <ControlPanal/>
    </div>
    </div>
  )
}
export default  App;

