import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  initialState: {
    banUnbanRemoveUser: {
      id: 0,
      name: '',
    },
    isBanUserModal: false,
    isDeleteUserModal: false,
    isUnbanUserModal: false,
    searchByUsername: '',
    userBlockStatus: 'Not selected',
  },
  name: 'usersReducer',
  reducers: {
    closeModal: state => {
      state.isBanUserModal = false
      state.isUnbanUserModal = false
      state.isDeleteUserModal = false
    },

    isBanUserModal: (state, action: PayloadAction<boolean>) => {
      state.isBanUserModal = action.payload
    },
    isDeleteUserModal: (state, action: PayloadAction<boolean>) => {
      state.isDeleteUserModal = action.payload
    },

    isUnbanUserModal: (state, action: PayloadAction<boolean>) => {
      state.isUnbanUserModal = action.payload
    },
    searchUsers: (state, action: PayloadAction<string>) => {
      state.searchByUsername = action.payload
    },
    setBanUnbanRemoveUser: (state, action: PayloadAction<{ id: number; name: string }>) => {
      state.banUnbanRemoveUser = action.payload
    },
    updateUserBlockStatus: (state, action: PayloadAction<string>) => {
      state.userBlockStatus = action.payload
    },
  },
})

export const usersActions = usersSlice.actions
