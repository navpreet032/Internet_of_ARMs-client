/**
 * A component that renders an input field for the robotic arm control panel.
 * @param {function} onChange - A function that will be called when the input value changes.
 * @param {string} placeholder - The placeholder text to display in the input field.
 * @param {object} style - An optional object containing CSS styles to apply to the input field.
 * @returns {JSX.Element} - A JSX element representing the input field.
 */
import React from 'react'
import './Arm_Input.css';

function Arm_Input({onChange, placeholder,style}) {
  return (
    <div>
    <input type="text" placeholder={placeholder} onChange={onChange} style={style}/>
    </div>
  )
}

export default Arm_Input