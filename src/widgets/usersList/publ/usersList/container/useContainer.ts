import { useState } from 'react'

import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { GET_USERS } from '@/services/queries/users'
import { GetUsersQuery, GetUsersQueryVariables } from '@/services/queries/users.generated'
import { SortDirection, UserBlockStatus } from '@/services/types'
import { useTranslation } from '@/shared/hooks/useTranslation'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
} from '@/widgets/usersList/publ/usersList/constants/constants'
import { useQuery } from '@apollo/client'

export const useContainer = () => {
  const base64password = getFromLocalStorage('base64credentials', '')

  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE_NUMBER)
  const [currentSize, setCurrentSize] = useState<number>(INITIAL_PAGE_SIZE)

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
      sortBy: 'createdAt',
      sortDirection: SortDirection.Desc,
      statusFilter: currentBlockStatus[state.userBlockStatus],
    },
  })

  const handlePageNumber = (pageNumber: number) => {
    setCurrentPage(pageNumber)

    if (currentSize !== INITIAL_PAGE_SIZE) {
      setCurrentSize(INITIAL_PAGE_SIZE)
    }
  }

  const handlePageSize = (pageSize: string) => {
    setCurrentSize(+pageSize)
  }

  const users = data?.getUsers.users
  const pagination = data?.getUsers.pagination

  return {
    currentPage,
    currentSize,
    handlePageNumber,
    handlePageSize,
    isLoading,
    pagination,
    state,
    t,
    users,
  }
}
