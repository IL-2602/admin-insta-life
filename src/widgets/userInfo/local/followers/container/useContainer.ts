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
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
} from '@/widgets/usersList/publ/usersList/constants/constants'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const base64password = getFromLocalStorage('base64credentials', '')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [currentSize, setCurrentSize] = useState<number>(10)
  const [sort, setSort] = useState<HeadCellSort>({ direction: 'Asc', key: 'createdAt' })

  const { query } = useRouter()

  const uId = +(query?.id || '')

  const { data, loading } = useQuery<GetFollowersQuery, GetFollowersQueryVariables>(GET_FOLLOWERS, {
    context: { base64password },
    variables: {
      pageNumber: currentPage,
      pageSize: currentSize,
      sortBy: sort.key,
      sortDirection: SortDirection[sort.direction],
      userId: uId,
    },
  })
  const { t } = useTranslation()
  const followers = data?.getFollowers.items
  const handleSortTable = (sort: HeadCellSort | null) =>
    sort ? setSort(sort) : setSort({ direction: 'Desc', key: 'createdAt' })

  return { followers, handleSortTable, loading, sort, t }
}
