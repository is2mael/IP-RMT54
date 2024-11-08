import { configureStore } from '@reduxjs/toolkit'
import ilgramsReducer from '../features/ilGram'

export default configureStore({
  reducer: {
    ilgrams: ilgramsReducer,
  },
})