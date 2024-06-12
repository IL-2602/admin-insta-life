import { usersSlice } from '@/services/usersService/store/slice/users.slice'
import { combineSlices, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineSlices(usersSlice)

export const store = configureStore({
  reducer: rootReducer,
})
