import { useState } from 'react'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { BAN_USER, GET_USER, GET_USERS, REMOVE_USER, UNBAN_USER } from '@/services/queries/users'
import {
  BanUserMutation,
  BanUserMutationVariables,
  GetUsersQuery,
  GetUsersQueryVariables,
  RemoveUserMutation,
  RemoveUserMutationVariables,
  UnbanUserMutation,
  UnbanUserMutationVariables,
} from '@/services/queries/users.generated'
import { SortDirection, UserBlockStatus } from '@/services/types'
import { usersActions } from '@/services/usersService/store/slice/users.slice'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { HeadCellSort } from '@/shared/ui/Table/Table'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
} from '@/widgets/usersList/publ/usersList/constants/constants'
import { useMutation, useQuery } from '@apollo/client'

export type ModalType = 'BAN' | 'REMOVE' | 'UNBAN'

export const useContainer = () => {
  const base64password = getFromLocalStorage('base64credentials', '')

  const isBanUserModal = useAppSelector(state => state.usersReducer.isBanUserModal)
  const isDeleteUserModal = useAppSelector(state => state.usersReducer.isDeleteUserModal)
  const isUnbanUserModal = useAppSelector(state => state.usersReducer.isUnbanUserModal)
  const banUnbanRemoveUser = useAppSelector(state => state.usersReducer.banUnbanRemoveUser)
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE_NUMBER)
  const [currentSize, setCurrentSize] = useState<number>(INITIAL_PAGE_SIZE)
  const [sort, setSort] = useState<HeadCellSort>({ direction: 'Asc', key: 'createdAt' })

  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.usersReducer)

  const currentBlockStatus: Record<string, UserBlockStatus> = {
    Blocked: UserBlockStatus.Blocked,
    'Not Blocked': UserBlockStatus.Unblocked,
    'Not selected': UserBlockStatus.All,
  }

  const { data, loading: isLoading } = useQuery<GetUsersQuery, GetUsersQueryVariables>(GET_USERS, {
    context: { base64password },
    variables: {
      pageNumber: currentPage,
      pageSize: currentSize,
      searchTerm: state.searchByUsername.trim(),
      sortBy: sort.key,
      sortDirection: SortDirection[sort.direction],
      statusFilter: currentBlockStatus[state.userBlockStatus],
    },
  })
  const [banUser, { loading: loadingBan }] = useMutation<BanUserMutation, BanUserMutationVariables>(
    BAN_USER
  )
  const [unbanUser, { loading: loadingUnban }] = useMutation<
    UnbanUserMutation,
    UnbanUserMutationVariables
  >(UNBAN_USER)
  const [removeUser, { loading: loadingRemoveUser }] = useMutation<
    RemoveUserMutation,
    RemoveUserMutationVariables
  >(REMOVE_USER)

  const users = data?.getUsers.users
  const pagination = data?.getUsers.pagination

  const handlePageNumber = (pageNumber: number) => {
    setCurrentPage(pageNumber)

    if (currentSize !== INITIAL_PAGE_SIZE) {
      setCurrentSize(INITIAL_PAGE_SIZE)
    }
  }

  const handlePageSize = (pageSize: string) => {
    setCurrentSize(+pageSize)

    if (pagination?.pagesCount !== INITIAL_PAGE_NUMBER && currentSize !== pagination?.totalCount) {
      setCurrentPage(INITIAL_PAGE_NUMBER)
    }
  }

  const closeModal = () => {
    dispatch(usersActions.closeModal())
    dispatch(usersActions.setBanUnbanRemoveUser({ id: 0, name: '' }))
  }

  const openModal = (modal: ModalType, id: number, name: string) => {
    dispatch(usersActions.setBanUnbanRemoveUser({ id, name }))
    if (modal === 'BAN') {
      dispatch(usersActions.isBanUserModal(true))
    } else if (modal === 'UNBAN') {
      dispatch(usersActions.isUnbanUserModal(true))
    } else {
      dispatch(usersActions.isDeleteUserModal(true))
    }
  }
  const handleSortTable = (sort: HeadCellSort | null) =>
    sort ? setSort(sort) : setSort({ direction: 'Desc', key: 'createdAt' })

  const clearModalState = () => {
    dispatch(usersActions.closeModal())
    dispatch(usersActions.setBanUnbanRemoveUser({ id: 0, name: '' }))
  }
  const banU = (userId: number, reason: string) => {
    banUser({
      context: { base64password },
      refetchQueries: [
        {
          context: { base64password },
          query: GET_USER,
          variables: {
            banReason: reason,
            userId: userId,
          },
        },
      ],
      variables: { banReason: reason, userId },
    }).then(() => {
      clearModalState()
    })
  }
  const unbanU = async (userId: number) => {
    unbanUser({
      context: { base64password },
      refetchQueries: [
        {
          context: { base64password },
          query: GET_USER,
          variables: {
            userId: userId,
          },
        },
      ],
      variables: { userId: userId },
    }).then(() => {
      clearModalState()
    })
  }
  const deleteU = (userId: number) => {
    removeUser({
      context: { base64password },
      refetchQueries: [
        {
          context: { base64password },
          query: GET_USER,
          variables: {
            userId: userId,
          },
        },
      ],
      variables: { userId: userId },
    }).then(() => {
      clearModalState()
    })
  }

  return {
    banU,
    banUnbanRemoveUser,
    closeModal,
    currentPage,
    currentSize,
    deleteU,
    handlePageNumber,
    handlePageSize,
    handleSortTable,
    isBanUserModal,
    isDeleteUserModal,
    isLoading,
    isUnbanUserModal,
    loadingBan,
    loadingRemoveUser,
    loadingUnban,
    openModal,
    pagination,
    sort,
    state,
    t,
    unbanU,
    users,
  }
}
