import ControlPanal from '../components/controlPanal/controlpanal'
import Overlay from '../components/viewport_overlay/overlay'
import Three_viewport from '../3d_viewport/three_viewport';
import '../App.css'
import FloatingScreen from '../components/floatingScreen/FloatingScreen';
import './mainViewport.css'
//TODO import { useAuth } from '../authcontext/authcontext';
//TODO const { user } = useAuth();
//! USE useAUTH to show setting

function MainViewport() {
  
  return (

        <div className='a'>
    <div className="App">
      
       
        <div>
          <div className='viewport'>
            <Three_viewport />
            <Overlay />
          </div>

          <div className='control'>
            <ControlPanal />
          </div>
        </div>
      
        
    </div>

<FloatingScreen/>
</div>
  )
}

export default MainViewport