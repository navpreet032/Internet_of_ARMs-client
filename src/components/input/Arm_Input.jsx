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