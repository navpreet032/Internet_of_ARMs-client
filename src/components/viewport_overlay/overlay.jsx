import React, { useEffect, useState } from 'react'
import Arm_Button from '../button/Arm_Button';
import Arm_Input from '../input/Arm_Input';
import Dropdown from '../dropdown/dropdown';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';

import './overlay.css';
import { SET_recordingList, SET_playing_Or_paused, SET_recording_Or_saved } from '../../redux/arm_slice';
import axios from 'axios';


function Overlay() {

  const dispatch = useDispatch();
  const SERVER = useSelector((state) => state.arm.get_SERVER_URL);

  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPause_button, setIsPause_button] = useState('play');
  const [isSave_button, setIsSave_button] = useState('record');
  const [inputText, setInputText] = useState('');
  const [recording_list, setRecording_list] = useState(['rec', 'rec2']);


  const get_servoAngles = useSelector(state => state.arm.get_servoAngles);
// get the recording names from db when component mounts
  useEffect(() => {
    const db_recordings = async () => await axios.get(`${SERVER}/getrecordings`).
      then((response) => {


        const recordings = Object.values(response.data);
        const recordingNames = recordings.map((recording) => recording.RecordingName);

        setRecording_list(recordingNames);
        dispatch(SET_recordingList([...recording_list]));

      });
    db_recordings();
  }, []);

  // upload the recording to db
  const upload_recording = async (req,res) => {
    await axios.post(`${SERVER}/arms/${inputText}`, {
      RecordingName: inputText,
      ServoAngles: {"s1":get_servoAngles[0],"s2":get_servoAngles[1],"s3":get_servoAngles[2],"s4":get_servoAngles[3]}
    }).then((response) => {
      console.log(response);
    }
    ).catch((error) => {
      console.log(error);
    } 
    );
  }

  const handleRecordClick = () => {
    setIsRecording(!isRecording);
    setIsSave_button(isRecording ? 'record' : 'save');
    dispatch(SET_recording_Or_saved("record"));
    console.log("record pressed")
  };

  const handleSaveClick = () => {
    setIsRecording(!isRecording);
    setIsSave_button(isRecording ? 'record' : 'save');
    dispatch(SET_recording_Or_saved("save"));
    setRecording_list([...recording_list, inputText]);
    dispatch(SET_recordingList([...recording_list]));

    upload_recording();
    
    console.log("save pressed")
  }

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
    setIsPause_button(isPlaying ? 'play' : 'pause');
    dispatch(SET_playing_Or_paused("play"));
    console.log("play pressed")
  }

  const handlePauseClick = () => {
    setIsPlaying(!isPlaying);
    setIsPause_button(isPlaying ? 'play' : 'pause');
    dispatch(SET_playing_Or_paused("pause"));
    console.log("pause pressed")
  }

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    console.log(inputText)

  }
  const handleClearClick = () => {
    setIsRecording(!isRecording);
    setInputText('');
    setIsSave_button(isRecording ? 'record' : 'save');
  }



  return (
    <div>

      <div className='dropdown'>
        <Dropdown options={recording_list} />
      </div>
      <div className="play_button">
        <Arm_Button props={{ text: isPause_button }} onClick={!isPlaying ? handlePlayClick : handlePauseClick} />
      </div>

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