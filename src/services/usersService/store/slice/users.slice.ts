import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  initialState: {
    searchByUsername: '',
  },
  name: 'usersReducer',
  reducers: {
    searchUsers: (state, action: PayloadAction<string>) => {
      state.searchByUsername = action.payload
    },
  },
})

export const { searchUsers } = usersSlice.actions
