import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { GET_POSTS_BY_USER } from '@/services/queries/posts'
import {
  GetPostsByUserQuery,
  GetPostsByUserQueryVariables,
} from '@/services/queries/posts.generated'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import { useQuery } from '@apollo/client'

export const useContainer = () => {
  const base64password = getFromLocalStorage('base64credentials', '')

  type PostImages = {
    __typename?: 'ImagePost'
    id?: null | number
    url?: null | string
  }

  const [isMoreLoading, setIsMoreLoading] = useState(false)

  const { inView, ref } = useInView({
    threshold: 1,
  })

  const {
    data,
    fetchMore,
    loading: isInitialLoading,
  } = useQuery<GetPostsByUserQuery, GetPostsByUserQueryVariables>(GET_POSTS_BY_USER, {
    context: {
      base64password,
    },
    variables: {
      endCursorId: undefined,
      userId: 3,
    },
  })

  const userPosts = data?.getPostsByUser.items

  useEffect(() => {
    if (!userPosts) {
      return
    }

    ;(async () => {
      if (inView) {
        setIsMoreLoading(true)

        try {
          await fetchMore({
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const prevItems = previousResult.getPostsByUser.items as PostImages[]
              const newItems = fetchMoreResult.getPostsByUser.items as PostImages[]

              return {
                getPostsByUser: {
                  __typename: previousResult.getPostsByUser.__typename,
                  items: [...prevItems, ...newItems],
                },
              }
            },
            variables: {
              endCursorId: userPosts[userPosts.length - 1].id,
              userId: 3,
            },
          })
        } catch (e) {
          console.error(e)
        } finally {
          setIsMoreLoading(false)
        }
      }
    })()
  }, [inView, fetchMore, userPosts])

  const isLoading = isInitialLoading || isMoreLoading

  return { isLoading, ref, userPosts }
}
