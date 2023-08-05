/**
 * A button component for the robotic arm control panel.
 * @param {Object} props - The props object containing the text to display on the button.
 * @param {function} onClick - The function to execute when the button is clicked.
 * @param {Object} style - The style object to apply to the button.
 * @returns {JSX.Element} - A button element with the specified text and style.
 */
import React from 'react';
import './Arm_Button.css';

function Arm_Button({ props, onClick, style }) {
  return (
    <div className='upload_button'>
      <button onClick={onClick} style={style}>{props.text}</button>
    </div>
  )
}

export default Arm_Button