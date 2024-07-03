import { useState } from 'react'

import { GET_FOLLOWERS } from '@/services/queries/followers'
import {
  GetFollowersQuery,
  GetFollowersQueryVariables,
} from '@/services/queries/followers.generated'
import { SortDirection } from '@/services/types'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { HeadCellSort } from '@/shared/ui/Table/Table'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import {
  INITIAL_CURRENT_PAGE,
  INITIAL_PAGE_SIZE,
  INITIAL_SORT,
} from '@/widgets/userInfo/local/followers/constants/constant'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { t } = useTranslation()
  const base64password = getFromLocalStorage('base64credentials', '')
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_CURRENT_PAGE)
  const [currentSize, setCurrentSize] = useState<number>(INITIAL_PAGE_SIZE)
  const [sort, setSort] = useState<HeadCellSort>(INITIAL_SORT)

  const {
    query: { id = '' },
  } = useRouter()

  const uId = +id

  const { data, loading } = useQuery<GetFollowersQuery, GetFollowersQueryVariables>(GET_FOLLOWERS, {
    context: { base64password },
    skip: isNaN(uId) || uId === 0,
    variables: {
      pageNumber: currentPage,
      pageSize: currentSize,
      sortBy: sort.key,
      sortDirection: SortDirection[sort.direction],
      userId: uId,
    },
  })

  const followers = data?.getFollowers.items
  const paginationPagesCount = data?.getFollowers.pagesCount
  const paginationTotalCount = data?.getFollowers.totalCount

  const handleSortTable = (sort: HeadCellSort | null) =>
    sort ? setSort(sort) : setSort(INITIAL_SORT)

  return {
    currentPage,
    currentSize,
    followers,
    handleSortTable,
    loading,
    paginationPagesCount,
    paginationTotalCount,
    setCurrentPage,
    setCurrentSize,
    sort,
    t,
    uId,
  }
}
