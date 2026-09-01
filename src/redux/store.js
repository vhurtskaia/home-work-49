import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './slices/postsSlice'
import submissionsReducer from './slices/submissionsSlice'

// configureStore автоматично підключає Redux DevTools у dev-режимі
// та вмикає redux-thunk "з коробки" — саме тому createAsyncThunk
// у postsSlice працює без жодних додаткових налаштувань.
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    submissions: submissionsReducer,
  },
})
