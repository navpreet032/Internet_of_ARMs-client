import React from 'react';
import './Arm_Button.css';

function Arm_Button({props,onClick,style}) {
  return (
    <div className= 'upload_button'>
                    <button onClick={onClick} style={style}>{props.text}</button>
                </div>
  )
}

export default Arm_Button