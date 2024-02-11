/**
 * This component renders the control panel for the robotic arm.
 * It includes sliders for controlling the servo angles and a button for uploading the servo angles to the database.
 * @returns {JSX.Element} The ControlPanal component
 */

import React, { useEffect, useState } from 'react';
import CircularSlider from '@fseehawer/react-circular-slider';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Arm_Button from '../button/Arm_Button';
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_SUCCESS, SET_DATA, SET_ERRORS, SET_SUCCESS, SET_isSocketServerOnline, SET_servoangles } from '../../redux/arm_slice';
import axios from 'axios';
import './controlpanal.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useWebSocket from 'react-use-websocket';


//BUG : the circular slider is not working properly. It's value +- 1 from the actual value.
const ControlPanal = () => {
    
    let lastSentTime = new Date.now();
    const RateLimiterThreshold = 150;//ms

    const WS_URL = 'ws://localhost:3300/';
    const dispatch = useDispatch();
    const selected_recording = useSelector((state) => state.arm.get_selectedRecording);
    const isPaused = useSelector((state) => state.arm.get_isPlaying_or_paused);
    const SERVER = useSelector((state) => state.arm.get_SERVER_URL);

    const [s1, setS1] = useState(0);
    const [s2, setS2] = useState(0);
    const [s3, setS3] = useState(0);
    const [s4, setS4] = useState(90);
    

    

    // theme for slider
    const theme = createTheme({
        components: {
            MuiSlider: {
                styleOverrides: {
                    thumb: {
                        color: '#FFFF',
                    },
                    track: {
                        color: '#FF6F41',

                    },
                    rail: {
                        color: 'rgba(255, 255, 255, 0.3)',
                    },
                },
            },
        },
    });

    /**
     * This function is called when any of the sliders are changed. It dispatches an action to update the servo angles in the Redux store.
    */
    const handleSliderChanges = (servo) => {
        dispatch(CLEAR_SUCCESS())
        const currSentTime = Date.now();
        if(currSentTime - lastSentTime > RateLimiterThreshold){
        if(servo === "s1"){
        sendSliderValue(s1.toString());
        dispatch(SET_DATA("SERVO 1: " +s1    ));
        }
        if(servo === "s2"){
            sendSliderValue(s2);
            dispatch(SET_DATA("SERVO 2: " +s2));
        }
        if(servo === "s3"){
            sendSliderValue(s3);
            dispatch(SET_DATA("SERVO 3: " +s3));
        }
        if(servo === "s4"){
            sendSliderValue(s4);
            dispatch(SET_DATA("SERVO 4: " +s4));
        }
        lastSentTime = currSentTime;
    }
        dispatch(SET_servoangles([s1, s2, s3, s4]));
        
    }

   

    // Loads servo angles from the database when the user selects a recording.

    useEffect(() => {
        /**
         * 
         * @param {string} recordingId(name) of the recording to be selected
         * @returns {object} the servo angles of the selected recording 
         */
        const handleRecordingSelect = async (selectedrecordingId) => {
            
            const recording = await axios
                .get(`api/recording/recordings?recordingName=${selectedrecordingId}`)
                .then((res) => res.data)
                .catch((err) => {
                    dispatch(SET_ERRORS("Can't get : "+selectedrecordingId))
                    console.log(err);
                });

            if (Array.isArray(recording) && recording.length > 0) {
               
                const { s1, s2, s3, s4 } = recording[0].servoAngles;
                setS1(s1);
                setS2(s2);
                setS3(s3);
                setS4(s4);
                dispatch(SET_SUCCESS("applied changes : "+recording[0].RecordingName))
                console.log("handleRecordingSelect"+selectedrecordingId)
            }
        };

        /**
         * call the handleRecordingSelect function when the user selects a recording.
         * call the handleUpload function when new recording is selected
         *  @param {string} selected_recording - the name of the selected recording
         */
        if (selected_recording) {
            handleRecordingSelect(selected_recording);
         
        }
        else {
            setS1(0);
            setS2(0);
            setS3(0);
            setS4(90);
        }
    }, [selected_recording]);

    

    const options = React.useMemo(() => ({
        onOpen: () => {
        sendMessage("0xaa55");console.log('[open] Connection established'),
        dispatch(SET_isSocketServerOnline(true))
    },
        onClose: (event) => {
          if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
          } else {
            
            dispatch(SET_isSocketServerOnline(false));
            console.log('[close] Connection died');
          }
        },
      
        onMessage: (event) => {
          console.log(`[message] Data received from server: ${event.data.text()}`);
          if (typeof event.data !== "string") {
            // Assuming the message is a JSON string
            event.data.text().then(text =>{
                const obj = JSON.parse(text);

                console.log("out " + obj["data"]); 
            })
            
          }
        },
        onError: (event) => console.log(`[error] ${event.message}`),
        shouldReconnect: (closeEvent) => true, // Will attempt to reconnect on all close events
        reconnectAttempts: 10, 
        reconnectInterval: 3000, 
        
      }), []);
    
      const { sendMessage } = useWebSocket('ws://localhost:3300', options);
    
      const sendSliderValue = (servo) => {
        const message = JSON.stringify({ event: "message", data: servo });
        sendMessage(message);
        console.log(`Message sent: ${message}`);
      };

    return (
        <div className="control_main ">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />


            <div className='rotation_slider'>

                <CircularSlider
                    width={200}
                    label="deg"
                    appendToValue="°"
                    labelBottom={true}
                    labelColor="white"
                    knobColor="#ff6f41"
                    progressColorFrom="white"
                    progressColorTo="#ff6f41"
                    trackColor="rgba(255, 255, 255, 0.3)"
                    hideKnob={true}
                    progressSize={8}
                    progressLineCap="round"
                    startAngle={0}
                    endAngle={180}
                    trackSize={8}
                    thumbSize={12}
                    min={0}
                    max={180}
                    initialValue={s4}
                    dataIndex={s4}
                    onChange={(e) => { setS4(e); handleSliderChanges("s4") }}

                />

            </div>

            <div className='linear_slider'>
                <div className='s1'>
                    <p>servo 1 <span style={{ fontSize: '1.4em', color: '#ffff', fontWeight: 'normal' }}>{s1}<span style={{ color: '#292826' }}>°</span></span>
                    </p>
                    <div className='servo_icon'>
                        <img src="servo2.png" />
                    </div>

                    <ThemeProvider theme={theme}>
                        <Box sx={{ width: 300 }} color={'red'}>
                            <Slider value={s1} onChange={(_, value) => { setS1(value); handleSliderChanges("s1") }} max={120} min={0} />
                        </Box>
                    </ThemeProvider>

                </div>

                <div className='s2'>
                    <p>servo 2 <span style={{ fontSize: '1.4em', color: '#ffff', fontWeight: 'normal' }}>{s2}<span style={{ color: '#292826' }}>°</span></span>
                    </p>
                    <div className='servo_icon'>
                        <img src="servo2.png" />
                    </div>
                    <ThemeProvider theme={theme}>
                        <Box sx={{ width: 300 }} color={'red'}>
                            <Slider value={s2} onChange={(_, value) => { setS2(value); handleSliderChanges("s2") }} max={180} min={40} />
                        </Box>
                    </ThemeProvider>
                </div>

                <div className='s3'>
                    <p>servo 3 <span style={{ fontSize: '1.4em', color: '#ffff', fontWeight: 'normal' }}>{s3}<span style={{ color: '#292826' }}>°</span></span> </p>
                    <div className='servo_icon'>
                        <img src="servo2.png" />
                    </div>
                    <ThemeProvider theme={theme}>
                        <Box sx={{ width: 300 }} color={'red'}>
                            <Slider value={s3} onChange={(_, value) => { setS3(value); handleSliderChanges("s3") }} max={120} min={20} />
                        </Box>
                    </ThemeProvider>
                </div>

                <div className='upload_button'>
                    <Arm_Button props={{ text: 'upload' }} />
                </div>


            </div>

        </div>
    )
};

export default ControlPanal;