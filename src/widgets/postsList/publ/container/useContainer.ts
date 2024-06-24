import { ChangeEvent, useState } from 'react'

import { GET_POSTS } from '@/services/queries/posts'
import { GetPostsQuery, GetPostsQueryVariables } from '@/services/queries/posts.generated'
import { SortDirection } from '@/services/types'
import { useTranslation } from '@/shared/hooks/useTranslation'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import { useQuery } from '@apollo/client'

export const useContainer = () => {
  const base64password = getFromLocalStorage('base64credentials', '')

  const { t } = useTranslation()

  const [openPosts, setOpenPosts] = useState<{ [key: string]: boolean }>({})
  const [search, setSearch] = useState('')

  const { data, loading } = useQuery<GetPostsQuery, GetPostsQueryVariables>(GET_POSTS, {
    context: {
      base64password,
    },
    variables: {
      endCursorPostId: 779,
      pageSize: 10,
      searchTerm: search,
      sortBy: 'createdAt',
      sortDirection: SortDirection.Desc,
    },
  })

  const handleSearchInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value)
  }

  const posts = data?.getPosts.items

  return { handleSearchInput, loading, openPosts, posts, setOpenPosts, t }
}
