import { configureStore } from '@reduxjs/toolkit'
import lukobaReducer from './LukobaSlice'

export const store = configureStore({
  reducer: {
    movieoData : lukobaReducer
  },
})