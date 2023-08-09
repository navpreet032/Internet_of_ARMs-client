/**
 * @file This file exports a Redux slice that manages the state of the robotic arm.
 * @name arm_slice.jsx
 * 
 * @requires createSlice from '@reduxjs/toolkit'
 * 
 * @exports armslice
 * @exports SET_playing_Or_paused
 * @exports SET_selectedrecording
 * @exports SET_recording_Or_saved
 * @exports SET_servoangles
 * @exports SET_inputText
 * 
 * @typedef {Object} ArmState
 * @property {boolean} get_isPlaying_or_paused - Indicates whether the robotic arm is playing or paused.
 * @property {boolean} get_isRecording_or_saved - Indicates whether the robotic arm is recording or saved.
 * @property {string} get_selectedRecording - The selected dropdown value.
 * @property {number[]} get_servoAngles - The servo angles.
 * @property {string} get_recordingList - The recordingList .
 * 
 * @typedef {Object} ArmReducers
 * @property {function} SET_playing_Or_paused - Sets the value of get_isPlaying_or_paused in the state.
 * @property {function} SET_recording_Or_saved - Sets the value of get_isRecording_or_saved in the state.
 * @property {function} SET_selectedrecording - Sets the value of get_selectedRecording in the state.
 * @property {function} SET_servoangles - Sets the value of get_servoAngles in the state.
 * @property {function} SET_recordingList- Sets the value of get_recordingList in the state.
 * 
 * @type {import('@reduxjs/toolkit').Slice<ArmState, ArmReducers>}
 */
import { createSlice } from '@reduxjs/toolkit'


export const  armslice = createSlice({
  name: 'arm',
  initialState: {
    get_isPlaying_or_paused: false,// play button is false, pause button is true
    get_isRecording_or_saved: false,// record button is false, save button is true
    get_selectedRecording: "",// get the selected dropdown value
    get_recordingList: [],// get the list of recordings
    get_servoAngles: [],// get the servo angles
    get_SERVER_URL: "<TYPE URL HERE>",// get the server url
  },
  reducers: {
    SET_playing_Or_paused: (state,action) => {
      state.get_isPlaying_or_paused = action.payload;
    },
    SET_recording_Or_saved: (state, action) => {
      state.get_isRecording_or_saved = action.payload;
    },
    SET_selectedrecording: (state, action) => {
      state.get_selectedRecording = action.payload;
    },
    SET_recordingList: (state, action) => {
      state.get_recordingList = action.payload;
    },
    SET_servoangles: (state, action) => {
        state.get_servoAngles = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { SET_playing_Or_paused, SET_selectedrecording, 
    SET_recording_Or_saved,SET_servoangles,SET_recordingList } = armslice.actions

export default armslice.reducer