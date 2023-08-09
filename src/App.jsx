/**
 * This is the main component of the Robotic Arm application.
 * It renders the 3D viewport and the control panel components.
 * It also checks the network status and displays a toast notification accordingly.
 * @returns {JSX.Element} The App component.
 */

import './App.css'
import ControlPanal from './components/controlPanal/controlpanal'
import Overlay from './components/viewport_overlay/overlay'
import Three_viewport from './3d_viewport/three_viewport';

import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';



/**
 * This is the main component of the Robotic Arm application.
 * It renders the 3D viewport and the control panel components.
 * 
 * @returns {JSX.Element} The App component.
 */
function App() {
  const [isConnected, setIsConnected] = useState(true);

  const showNetworkStatus = () => {
    if (isConnected) {
      toast.success('Connected to Network !', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else {
      toast.error('No Network !', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }

  const isOnline = async() => {  
    await fetch("https://www.google.com/", {mode: 'no-cors'}).then(() => {
      setIsConnected(true);

      console.log("connected")
      
    }).catch(() => {
      setIsConnected(false);
      console.log("dissconnected")

    }

    );
  }

  useEffect(() => { 
    showNetworkStatus();
  }, [isConnected]);

  useEffect(() => {
    const interval = setInterval(() => {
      isOnline();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
 

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

