import { ChangeEvent } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { usersSlice } from '@/services/usersService/store/slice/users.slice'

export const useContainer = () => {
  const dispatch = useAppDispatch()

  const handleSearchInput = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(usersSlice.actions.searchUsers(evt.target.value))
  }

  return { handleSearchInput }
}
