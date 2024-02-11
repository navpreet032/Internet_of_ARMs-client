import React, { useEffect, useState } from 'react'
import Arm_Button from '../button/Arm_Button';
import Arm_Input from '../input/Arm_Input';

import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import './overlay.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SET_recordingList, SET_playing_Or_paused, SET_recording_Or_saved, SET_ERRORS, SET_SUCCESS } from '../../redux/arm_slice';
import axios from 'axios';
import { VscSettingsGear } from "react-icons/vsc";
import { PiRecordLight } from "react-icons/pi";
import { GiRadarDish } from "react-icons/gi";
import {SettingBox,RecordingBox} from './overlayComponents';


/**
 * Overlay component that displays the robotic arm controls and recording options.
 * @returns {JSX.Element} Overlay component
 */
function Overlay() {

  const dispatch = useDispatch();
  

  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPause_button, setIsPause_button] = useState('play');
  const [isSave_button, setIsSave_button] = useState('record');
  const [inputText, setInputText] = useState('');
  const [recording_list, setRecording_list] = useState(['rec', 'rec2']);
  const [hideSettings,sethideSettings] = useState(true)
  const [hideRecordings,sethideRecordings] = useState(true)
  const get_servoAngles = useSelector(state => state.arm.get_servoAngles);
  const get_SocketServerState = useSelector(state => state.arm.get_IsSocketServer_online);

  /**
   * Uploads the recording to the database.
   * Updates the recording list and dispatches the list to the store.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  const upload_recording = async (req, res) => {
    await axios.post(`api/recording/recordings`, {
      servoAngles: { "s1": get_servoAngles[0], "s2": get_servoAngles[1], "s3": get_servoAngles[2], "s4": get_servoAngles[3] },
      RecordingName: inputText
    }).then((response) => {
      console.log(response);
      // when new recodrging is saved successfully then only update the list and dispatch
      setRecording_list([...recording_list, inputText]);
      dispatch(SET_recordingList([...recording_list]));
      dispatch(SET_SUCCESS("Successfully saved recording !"))
      toast.success('Successfully saved recording !', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    ).catch((error) => {
      console.log(error);
      toast.error('Failed to save recording !', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    );
  }

  /**
   * Handles the record button click event.
   */
  const handleRecordClick = () => {
    setIsRecording(!isRecording);
    setIsSave_button(isRecording ? 'record' : 'save');
    dispatch(SET_recording_Or_saved("record"));
    console.log("record pressed")
  };

  /**
   * Handles the save button click event.
   */
  const handleSaveClick = () => {
    setIsRecording(!isRecording);
    setIsSave_button(isRecording ? 'record' : 'save');
    dispatch(SET_recording_Or_saved("save"));
    

    upload_recording();
    
    console.log("save pressed")
  }

  /**
   * Handles the play button click event.
   */
  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
    setIsPause_button(isPlaying ? 'play' : 'pause');
    dispatch(SET_playing_Or_paused("play"));
    console.log("play pressed")
  }

  /**
   * Handles the pause button click event.
   */
  const handlePauseClick = () => {
    setIsPlaying(!isPlaying);
    setIsPause_button(isPlaying ? 'play' : 'pause');
    dispatch(SET_playing_Or_paused("pause"));
    console.log("pause pressed")
  }

  /**
   * Handles the input change event.
   * @param {Object} e - The event object.
   */
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    console.log(inputText)

  }

  /**
   * Handles the clear button click event.
   */
  const handleClearClick = () => {
    setIsRecording(!isRecording);
    setInputText('');
    setIsSave_button(isRecording ? 'record' : 'save');
  }

  const handleHideSettings =()=>{
    sethideSettings(!hideSettings)
    
  }
  const handelHideRecordings=()=>{
    sethideRecordings(!hideRecordings)
  }


  return (
    <div className='main'>
<div className='setting_list'>
<div class={get_SocketServerState? "wifi-symbol":"hidden"}>
  <div class="wifi-circle first"></div>
  <div class="wifi-circle second"></div>
  <div class="wifi-circle third"></div>	
  <div class="wifi-circle fourth"></div>
</div>
<VscSettingsGear size={24} className='button_list settingButt' onClick = {handleHideSettings} />
<PiRecordLight size={24} className='button_list' onClick={handelHideRecordings}/>
<GiRadarDish size={24}  color='#272727da'/>
</div>
<SettingBox isHidden={hideSettings}  />
<RecordingBox isHidden={hideRecordings}/>

      <div className='dropdown'>
       
      </div>
      {/* <div className="play_button">
        <Arm_Button props={{ text: isPause_button }} onClick={!isPlaying ? handlePlayClick : handlePauseClick} />
      </div> */}

      <div className={`record_button ${isRecording ? 'pressed' : ''}`}>
        <Arm_Button props={{ text: isSave_button }} onClick={!isRecording ? handleRecordClick : handleSaveClick} />
      </div>

      <div className={`arm_input ${isRecording ? 'expanded' : ''}`}>
        <Arm_Input placeholder={"type here"} onChange={handleInputChange} />
        <ClearIcon className='clearicon' onClick={handleClearClick}/>
      </div>

    </div>
  )
}

export default Overlay