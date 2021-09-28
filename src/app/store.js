import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import userReducer from './userSlice'

export default configureStore({
  reducer: {
    user: userReducer,
  },
  ...(process.env.NODE_ENV === 'development' && {
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  }),
})
