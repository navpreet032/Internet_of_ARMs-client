import React, { useEffect, useRef, useState } from 'react';
import './FloatingScreen.css'; // Make sure to create a corresponding CSS file
import Draggable from 'react-draggable';
import {useSelector } from 'react-redux';
const FloatingScreen = () => {
  let errors = useSelector((state) => state.arm.get_ERRORS);
  let success = useSelector((state) => state.arm.get_SUCCESS);
  let data = useSelector((state) => state.arm.get_DATA);
  const [messages, setMessages] = useState([ ]);
  const messagesEndRef = useRef(null);
  const messageThreshold = 150; 
  const SERVERstatus = useSelector((state) => state.arm.get_IsSocketServer_online);
  useEffect(() => {
    // Function to add a new message
    const addMessage = (msg, type) => {
      setMessages((prevMessages) => {
        if (prevMessages.length >= messageThreshold) {
          return [{ msg, type }];
        }
        return [...prevMessages, { msg, type }];
      });
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // add new messages when the redux state changes
    if (data) {
      addMessage(data, 'data');
    }
    if (success) {
      addMessage(success, 'success');
      console.log("SUCCC ",success)
    }
    if (errors) {
      addMessage(errors, 'error');
      console.log("ERROR ",errors)
    }

  }, [data, success, errors]); // Dependency array

   
   const getMessageColor = (type) => {
    switch (type) {
      case 'data':
        return 'orange';
      case 'success':
        return 'green';
      case 'error':
        return 'red';
      default:
        return 'black';
    }
  };
 

  return (
    <Draggable handle='.handle' defaultPosition={{x: -600, y: 550 }}>
    <div className="status-display">
      <div className="header handle">
        <span>Terminal</span>
        <span>{SERVERstatus?"Online":"Offline"}</span>
      </div>
      <div className="content">
      {messages.map((message, index) => (
            <div 
              key={index} 
              className="message" 
              style={{ color: getMessageColor(message.type) }}
            >
              {message.msg}
            </div>
          ))}
          <div ref={messagesEndRef} />
      </div >
    </div>
    </Draggable>
  );
};

export default FloatingScreen;
