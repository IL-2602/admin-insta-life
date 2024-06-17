import { useState } from 'react'

import { GET_FOLLOWING } from '@/services/queries/following'
import {
  GetFollowingQuery,
  GetFollowingQueryVariables,
} from '@/services/queries/following.generated'
import { SortDirection } from '@/services/types'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { HeadCellSort } from '@/shared/ui/Table/Table'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
} from '@/widgets/usersList/publ/usersList/constants/constants'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const base64password = getFromLocalStorage('base64credentials', '')
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE_NUMBER)
  const [currentSize, setCurrentSize] = useState<number>(INITIAL_PAGE_SIZE)
  const [sort, setSort] = useState<HeadCellSort>({ direction: 'Asc', key: 'createdAt' })

  const {
    query: { id = '' },
  } = useRouter()

  const uId = +id

  const { data, loading: isLoading } = useQuery<GetFollowingQuery, GetFollowingQueryVariables>(
    GET_FOLLOWING,
    {
      context: { base64password },
      skip: isNaN(uId) || uId === 0,
      variables: {
        pageNumber: currentPage,
        pageSize: currentSize,
        sortBy: sort.key,
        sortDirection: SortDirection[sort.direction],
        userId: uId,
      },
    }
  )

  const items = data?.getFollowing.items
  const totalCount = data?.getFollowing.totalCount
  const pagesCount = data?.getFollowing.pagesCount

  const handlePageSize = (pageSize: string) => {
    setCurrentSize(+pageSize)

    if (pagesCount !== INITIAL_PAGE_NUMBER && currentSize !== totalCount) {
      setCurrentPage(INITIAL_PAGE_NUMBER)
    }
  }

  const handlePageNumber = (pageNumber: number) => {
    setCurrentPage(pageNumber)

    if (currentSize !== INITIAL_PAGE_SIZE) {
      setCurrentSize(INITIAL_PAGE_SIZE)
    }
  }

  const handleSortTable = (sort: HeadCellSort | null) =>
    sort ? setSort(sort) : setSort({ direction: 'Desc', key: 'createdAt' })

  return {
    currentPage,
    currentSize,
    handlePageNumber,
    handlePageSize,
    handleSortTable,
    isLoading,
    items,
    pagesCount,
    sort,
    t,
    totalCount,
    uId,
  }
}
