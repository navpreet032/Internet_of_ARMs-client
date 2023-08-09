/**
 * Main entry point of the Robotic Arm application.
 * Renders the App component wrapped in a Provider component from react-redux.
 * @module main
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './redux/store'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { Detector } from 'react-detect-offline'
import { toast } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    
    <App />
    </Provider>
  </React.StrictMode>,
)
