import { ChangeEvent } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { usersActions } from '@/services/usersService/store/slice/users.slice'

export const useContainer = () => {
  const dispatch = useAppDispatch()

  const handleSearchInput = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(usersActions.searchUsers(evt.target.value))
  }

  return { handleSearchInput }
}
