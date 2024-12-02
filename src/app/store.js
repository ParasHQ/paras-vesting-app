import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import userReducer from './userSlice'

export default configureStore({
  reducer: {
    user: userReducer,
  },
  ...(import.meta.env.VITE_NODE_ENV === 'development' && {
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  }),
})
