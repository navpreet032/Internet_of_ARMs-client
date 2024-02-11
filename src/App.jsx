/**
 * This is the main component of the Robotic Arm application.
 * It renders the 3D viewport and the control panel components.
 * It also checks the network status and displays a toast notification accordingly.
 * @returns {JSX.Element} The App component.
 */

import './App.css'


import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Home from './home/home';
import Login from './login/register/login';
import Signup from './signup/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainViewport from './main_Viewport/mainViewport';
import ProtectedRoute from './authcontext/protectedRoute'; // Adjust the impor

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

  const isOnline = async () => {
    await fetch("https://www.google.com/", { mode: 'no-cors' }).then(() => {
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


    <div >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/viewport" element={
            <ProtectedRoute >
                
              <MainViewport />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </div>
  )
}
export default App;

