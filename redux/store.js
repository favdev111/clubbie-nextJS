import { configureStore } from '@reduxjs/toolkit'
import pitchReducer from './pitch.slice'

export const store = configureStore({
  reducer: {
    pitch: pitchReducer
  }
})

