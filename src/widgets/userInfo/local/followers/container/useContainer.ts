import { GET_FOLLOWERS } from '@/services/queries/followers'
import {
  GetFollowersQuery,
  GetFollowersQueryVariables,
} from '@/services/queries/followers.generated'
import { SortDirection } from '@/services/types'
import { useTranslation } from '@/shared/hooks/useTranslation'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import { useQuery } from '@apollo/client'

export const useContainer = () => {
  const base64password = getFromLocalStorage('base64credentials', '')
  const { data, loading } = useQuery<GetFollowersQuery, GetFollowersQueryVariables>(GET_FOLLOWERS, {
    context: { base64password },
    variables: {
      pageNumber: 1,
      pageSize: 10,
      sortBy: 'userName',
      sortDirection: SortDirection.Asc,
      userId: 3,
    },
  })
  const { t } = useTranslation()
  const followers = data?.getFollowers.items

  return { followers, loading, t }
}
