import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { GET_POSTS_BY_USER } from '@/services/queries/posts'
import {
  GetPostsByUserQuery,
  GetPostsByUserQueryVariables,
} from '@/services/queries/posts.generated'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const base64password = getFromLocalStorage('base64credentials', '')

  const { query } = useRouter()

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
    skip: !query.id,
    variables: {
      endCursorId: undefined,
      userId: +query.id!,
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
              userId: +query.id!,
            },
          })
        } catch (e) {
          console.error(e)
        } finally {
          setIsMoreLoading(false)
        }
      }
    })()
  }, [inView])

  const isLoading = isInitialLoading || isMoreLoading

  return { isLoading, ref, userPosts }
}
