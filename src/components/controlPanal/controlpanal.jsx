import React, { memo, useEffect, useRef, useState } from 'react';
import CircularSlider from '@fseehawer/react-circular-slider';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Arm_Button from '../button/Arm_Button';
import { useSelector, useDispatch } from 'react-redux';
import { SET_servoangles } from '../../redux/arm_slice';
import axios from 'axios';
import './controlpanal.css';

//BUG : the circular slider is not working properly. It's value +- 1 from the actual value.
const ControlPanal = () => {

    const dispatch = useDispatch();
    const selected_recording = useSelector((state) => state.arm.get_selectedRecording);
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
    const handleSliderChanges = () => {
        dispatch(SET_servoangles([s1, s2, s3, s4]));
    }

    // Load servo angles from the database when the component mounts
    useEffect(() => {
        const get_data = async () => {
            const response = await axios.get(`${SERVER}/arms/`);
            const data = response.data;

            if (Array.isArray(data) && data.length > 0) {
                const { ServoAngles } = data[0];

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

    // Update servo angles when the user selects a recording
    useEffect(() => {

        const handleRecordingSelect = async (recordingId) => {
            const recording = await axios
                .get(`${SERVER}/arms/${recordingId}`)
                .then((res) => res.data)
                .catch((err) => {
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

        if (selected_recording) {
            handleRecordingSelect(selected_recording);
            
        }
        else{
            setS1(0);
            setS2(0);
            setS3(0);
            setS4(90);
        }
    }, [selected_recording]);

    // post servo angles to the database when the user clicks the upload button
    const ServoAngles = useSelector(state => state.arm.get_servoAngles);
    
    const handleUpload = async () => {
        
        console.log(ServoAngles)
        const response = await axios.put(`${SERVER}/arms/`,{
            RecordingName: "",
            ServoAngles: {"s1":ServoAngles[0],"s2":ServoAngles[1],"s3":ServoAngles[2],"s4":ServoAngles[3]}
    }).then((response) => {
      console.log(response);
    }
    ).catch((error) => {
      console.log(error);
    } 
    );
  }
        
    


    
    return (
        <div className='control_main'>

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
                    <Arm_Button props={{ text: 'upload' }} onClick= {handleUpload} />
                </div>


            </div>

        </div>
    )
};

export default ControlPanal;