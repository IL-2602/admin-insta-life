import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { usersActions } from '@/services/usersService/store/slice/users.slice'
import { useTranslation } from '@/shared/hooks/useTranslation'

export const useContainer = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const userBlockStatus = useAppSelector(state => state.usersReducer.userBlockStatus)

  const statusOptions = ['Not selected', 'Blocked', 'Not Blocked']

  const handleBlockStatus = (status: string) => {
    dispatch(usersActions.updateUserBlockStatus(status))
  }

  return { handleBlockStatus, statusOptions, t, userBlockStatus }
}
