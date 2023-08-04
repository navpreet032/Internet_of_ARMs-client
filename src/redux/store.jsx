import { configureStore } from '@reduxjs/toolkit'
import armslice from './arm_slice'

export default configureStore({
  reducer: {  arm: armslice},
})