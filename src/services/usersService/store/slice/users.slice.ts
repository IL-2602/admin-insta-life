import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  initialState: {
    searchByUsername: '',
    userBlockStatus: 'Not selected',
  },
  name: 'usersReducer',
  reducers: {
    searchUsers: (state, action: PayloadAction<string>) => {
      state.searchByUsername = action.payload
    },
    updateUserBlockStatus: (state, action: PayloadAction<string>) => {
      state.userBlockStatus = action.payload
    },
  },
})

export const usersActions = usersSlice.actions
