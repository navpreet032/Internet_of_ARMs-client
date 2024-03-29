import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SET_selectedrecording } from '../../redux/arm_slice';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

/**
 * A dropdown component that allows the user to select an option from a list of options.
 * @param {Object} options - An array of options to be displayed in the dropdown.
 * @returns {JSX.Element} - A dropdown component with the selected option displayed.
 */
function Dropdown({ options, selectedOption, setSelectedOption}) {
  const dispatch = useDispatch();

  const handleOptionChange = event => {
    console.log(event.target.value)
    setSelectedOption(event.target.value);
    dispatch(SET_selectedrecording(event.target.value));
  };
  

  return (
    <div className="dropdown">
      <select value={selectedOption} onChange={handleOptionChange}>
        {options.map(option => (
          <>
          <option key={option} value={option}>{option} </option>
          </>
        ))}
      </select>
      
     
      <style jsx>{`
        .dropdown select {
            font-family: 'Poppins', sans-serif;
          background-color: #292826;
          color: white;
          border: 2px solid #ff6f41;
          border-radius: 4px;
          padding: 8px;
          font-size: 16px;
          font-weight: medium;
          appearance: none;
          outline: none;
          cursor: pointer;
          align-items: center;
          height: 2.5rem;
          width: 8rem;
          transition: all 0.2s ease-in-out;
          overflow-x: auto;
  
  /* Allow horizontal scrolling */
  white-space: nowrap;
   /* Hide scrollbar for Chrome, Safari and Opera */
   &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge, and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
        }
        
        .dropdown select:hover {
            width: 8.5rem;
            height: 3rem;
        }
      `}</style>
    </div>
  );
}
export default Dropdown;