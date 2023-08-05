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
import { SET_servoangles } from '../../redux/arm_slice';
import axios from 'axios';
import './controlpanal.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//BUG : the circular slider is not working properly. It's value +- 1 from the actual value.
const ControlPanal = () => {
    
    
    const dispatch = useDispatch();
    const selected_recording = useSelector((state) => state.arm.get_selectedRecording);
    const SERVER = useSelector((state) => state.arm.get_SERVER_URL);

    const [s1, setS1] = useState(0);
    const [s2, setS2] = useState(0);
    const [s3, setS3] = useState(0);
    const [s4, setS4] = useState(90);

    const showToastMessage = (type) => {
        if (type === 'uploaded') {
            toast.success('Uploaded Successfully !', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (type === 'notuploaded') {
            toast.error('Upload Failed !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

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
    const handleSliderChanges = () => {
        dispatch(SET_servoangles([s1, s2, s3, s4]));
    }

    // Loads servo angles from the database when the component mounts.

    useEffect(() => {
        /**
         * set the servo angles to the values in the database
         * set the slider values to the values in the database
         * call the handleSliderChanges function
         * @returns {object} the servo angles from the database
         */
        const get_data = async () => {
            const data = await axios.get(`${SERVER}/arms/`).then((res) => res.data).catch(() => {
                toast.error('Connection with Db failed !', {
                    position: toast.POSITION.TOP_RIGHT
                });
            })

            if (Array.isArray(data) && data.length > 0) {
                const  ServoAngles  = data[0].ServoAngles;

                if (typeof (ServoAngles) === 'object') {
                    const { s1, s2, s3, s4 } = ServoAngles;
                    setS1(s1);
                    setS2(s2);
                    setS3(s3);
                    setS4(s4);

                    handleSliderChanges();
                } else {
                    console.error('Invalid ServoAngles:', ServoAngles);
                }
            } else {
                console.error('No data found:', data);
            }
        };

        get_data();
    }, []);


    // Loads servo angles from the database when the user selects a recording.

    useEffect(() => {
        /**
         * 
         * @param {string} recordingId(name) of the recording to be selected
         * @returns {object} the servo angles of the selected recording 
         */
        const handleRecordingSelect = async (recordingId) => {
            const recording = await axios
                .get(`${SERVER}/arms/${recordingId}`)
                .then((res) => res.data)
                .catch((err) => {
                    toast.error('Cannot get selected Recording !', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    console.log(err);
                });

            if (Array.isArray(recording) && recording.length > 0) {
                const { s1, s2, s3, s4 } = recording[0].ServoAngles;
                setS1(s1);
                setS2(s2);
                setS3(s3);
                setS4(s4);
            }
        };

        /**
         * call the handleRecordingSelect function when the user selects a recording.
         * call the handleUpload function when new recording is selected
         *  @param {string} selected_recording - the name of the selected recording
         */
        if (selected_recording) {
            handleRecordingSelect(selected_recording);
            handleUpload('handleRecordingSelect');
            console.log("upload ", selected_recording)

        }
        else {
            setS1(0);
            setS2(0);
            setS3(0);
            setS4(90);
        }
    }, [selected_recording]);

    const ServoAngles = useSelector(state => state.arm.get_servoAngles);// get the servo angles from the redux store    

    const handleUpload = async (calledby) => {
    /**
     * Handles uploading servo angles to the database.
     * @param {string} calledby - the function that called the handleUpload function
     * @returns {void}
     */

        await axios.put(`${SERVER}/arms/`, {
            RecordingName: "",
            ServoAngles: { "s1": ServoAngles[0], "s2": ServoAngles[1], "s3": ServoAngles[2], "s4": ServoAngles[3] }
        }).then((response) => {
            //console.log(response);
            if (calledby !== 'handleRecordingSelect') {
                showToastMessage('uploaded');
            }
        }
        ).catch((error) => {
            console.log(error);
            showToastMessage('notuploaded');
        }
        );

    }





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
                    onChange={(e) => { setS4(e); handleSliderChanges() }}

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
                            <Slider value={s1} onChange={(_, value) => { setS1(value); handleSliderChanges() }} max={181} min={0} />
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
                            <Slider value={s2} onChange={(_, value) => { setS2(value); handleSliderChanges() }} max={181} min={0} />
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
                            <Slider value={s3} onChange={(_, value) => { setS3(value); handleSliderChanges() }} max={181} min={0} />
                        </Box>
                    </ThemeProvider>
                </div>

                <div className='upload_button'>
                    <Arm_Button props={{ text: 'upload' }} onClick={handleUpload} />
                </div>


            </div>

        </div>
    )
};

export default ControlPanal;