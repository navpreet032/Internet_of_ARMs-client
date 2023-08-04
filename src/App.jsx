import { useDispatch } from 'react-redux';
import './App.css'
import ControlPanal from './components/controlPanal/controlpanal'
import Overlay from './components/viewport_overlay/overlay'
import Three_viewport from './3d_viewport/three_viewport';



function App() {

  // push on the api to AWS 
  // set dropdown add delete icon and functionality
  
 
  return (
    <div className="App">

    <div className='viewport'>
    <Three_viewport/>
    
    <Overlay/>
    </div>
    
    <div className='control'>
    <ControlPanal/>
    </div>
    </div>
  )
}

export default App
