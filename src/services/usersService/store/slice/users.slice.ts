import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  initialState: {
    users: [],
  },
  name: 'users',
  reducers: {
    searchUsers: (state, action: PayloadAction<any>) => {},
  },
})

export const { searchUsers } = usersSlice.actions
