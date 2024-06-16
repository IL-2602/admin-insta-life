import { useState } from 'react'

import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { BAN_USER, GET_USERS, UNBAN_USER } from '@/services/queries/users'
import {
  BanUserMutation,
  BanUserMutationVariables,
  GetUsersQuery,
  GetUsersQueryVariables,
  UnbanUserMutation,
  UnbanUserMutationVariables,
} from '@/services/queries/users.generated'
import { SortDirection, UserBlockStatus } from '@/services/types'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { HeadCellSort } from '@/shared/ui/Table/Table'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
} from '@/widgets/usersList/publ/usersList/constants/constants'
import { useMutation, useQuery } from '@apollo/client'
import { context } from 'esbuild'

export const useContainer = () => {
  const base64password = getFromLocalStorage('base64credentials', '')

  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE_NUMBER)
  const [currentSize, setCurrentSize] = useState<number>(INITIAL_PAGE_SIZE)
  const [sort, setSort] = useState<HeadCellSort>({ direction: 'Asc', key: 'createdAt' })

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

  const handleSortTable = (sort: HeadCellSort | null) =>
    sort ? setSort(sort) : setSort({ direction: 'Desc', key: 'createdAt' })

  const banU = (userId: number, reason = 'BAD') => {
    banUser({
      context: { base64password },
      refetchQueries: [
        {
          query: GET_USERS,
        },
      ],
      variables: { banReason: reason, userId },
    })
    console.log('BAN USER : ', userId, reason)
  }
  const unbanU = async (userId: number) => {
    unbanUser({
      context: { base64password },
      refetchQueries: [
        {
          query: GET_USERS,
        },
      ],
      variables: { userId: userId },
    })

    console.log('UNBAN USER : ', userId)
  }
  const deleteU = (id: number) => {
    console.log('DELETE USER : ', id)
  }

  return {
    banU,
    currentPage,
    currentSize,
    deleteU,
    handlePageNumber,
    handlePageSize,
    handleSortTable,
    isLoading,
    loadingBan,
    loadingUnban,
    pagination,
    sort,
    state,
    t,
    unbanU,
    users,
  }
}
