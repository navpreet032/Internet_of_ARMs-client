import { useEffect, useState } from 'react';
import './overlayComponents.css'
import { MdOutlineLogout } from "react-icons/md";
import axios from 'axios';
import { useAuth } from '../../authcontext/authcontext';
import { useNavigate } from 'react-router';
import Dropdown from '../dropdown/dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { SET_recordingList } from '../../redux/arm_slice';

const SettingBox = ({ isHidden }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [UID, setUID] = useState("");
  const loadUid = async (Userid) => {
    try {
      const res = await axios.get(`api/user/${Userid}`);

      setUID(res.data.UID)

    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {

    var id = localStorage.getItem('USERid');
    loadUid(id)
  })
  const handelLogout = async () => {
    console.log("LOGOUT")
    await auth.logout()
    navigate('/login');
  }

  return (
    <div>
      {isHidden == false && (

        <div className='Settingcontainer'>
          <div className='input-container'>
            <label htmlFor="uid" className='label'>UID :</label>
            <text className='textBox'>{UID}</text>

          </div>
          <div className='input-container'>
            <label htmlFor="text2" className='label'>Text2</label>
            {/* <input type="text" id="text2" className='input' /> */}
          </div>
          <div className='button-container'>
            <MdOutlineLogout size={24} className='buttCont' onClick={handelLogout} />
          </div>
        </div>
      )}

    </div>
  );
};

const RecordingBox = ({ isHidden }) => {
  const SERVER = useSelector((state) => state.arm.get_SERVER_URL);
  const [recording_list, setRecording_list] = useState(['rec', 'rec2']);
  const [selectedOption, setSelectedOption] = useState(recording_list[0]);
  const dispatch = useDispatch();



  // get the recording names from db when component mounts

  useEffect(() => {
    const db_recordings = async () => await axios.get(`api/recording/recordings`).
      then((response) => {

        const recordings = Object.values(response.data);
        const recordingNames = recordings.map((recording) => recording.RecordingName);

        setRecording_list(recordingNames);
        dispatch(SET_recordingList([...recording_list]));

      });
    db_recordings();
  }, [isHidden == false]);




  return (
    <div>
      {!isHidden && (
        <div className='Recording-container'>
          <Dropdown options={recording_list}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption} />

        </div>
      )}
    </div>
  )
}

export { SettingBox, RecordingBox }