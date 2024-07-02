import { ChangeEvent, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { GET_POSTS } from '@/services/queries/posts'
import { GetPostsQuery, GetPostsQueryVariables } from '@/services/queries/posts.generated'
import { POST_SUBSCRIPTION } from '@/services/queries/subscriptions'
import { PostAddedSubscription } from '@/services/queries/subscriptions.generated'
import { BAN_USER, GET_USER } from '@/services/queries/users'
import { BanUserMutation, BanUserMutationVariables } from '@/services/queries/users.generated'
import { SortDirection } from '@/services/types'
import { usersActions } from '@/services/usersService/store/slice/users.slice'
import { useTranslation } from '@/shared/hooks/useTranslation'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import { ModalType } from '@/widgets/usersList/publ/usersList/container/useContainer'
import { useMutation, useQuery } from '@apollo/client'

export const useContainer = () => {
  const base64password = getFromLocalStorage('base64credentials', '')

  const { inView, ref } = useInView({
    threshold: 1,
  })

  const { t } = useTranslation()
  const banUnbanRemoveUser = useAppSelector(state => state.usersReducer.banUnbanRemoveUser)
  const [isMoreLoading, setIsMoreLoading] = useState(false)
  const [openPosts, setOpenPosts] = useState<{ [key: string]: boolean }>({})
  const [search, setSearch] = useState('')
  const dispatch = useAppDispatch()
  const isBanUserModal = useAppSelector(state => state.usersReducer.isBanUserModal)

  const openModal = (id: number, name: string) => {
    dispatch(usersActions.isBanUserModal(true))
    dispatch(usersActions.setBanUnbanRemoveUser({ id, name }))
  }
  const clearModalState = () => {
    dispatch(usersActions.closeModal())
    dispatch(usersActions.setBanUnbanRemoveUser({ id: 0, name: '' }))
  }

  const [banUser, { loading: loadingBan }] = useMutation<BanUserMutation, BanUserMutationVariables>(
    BAN_USER
  )

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

  const { data, fetchMore, loading, subscribeToMore } = useQuery<
    GetPostsQuery,
    GetPostsQueryVariables
  >(GET_POSTS, {
    context: {
      base64password,
    },
    variables: {
      endCursorPostId: 1026,
      pageSize: 12,
      searchTerm: search.trim(),
      sortBy: 'createdAt',
      sortDirection: SortDirection.Desc,
    },
  })

  const posts = data?.getPosts.items

  useEffect(() => {
    if (!posts) {
      return
    }

    ;(async () => {
      if (inView) {
        setIsMoreLoading(true)

        try {
          await fetchMore({
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const prevItems = previousResult.getPosts.items || []
              const newItems = fetchMoreResult.getPosts.items || []

              return {
                getPosts: {
                  __typename: previousResult.getPosts.__typename,
                  items: [...prevItems, ...newItems],
                },
              }
            },
            variables: {
              endCursorPostId: posts[posts.length - 1].id,
              pageSize: 8,
              searchTerm: search.trim(),
              sortBy: 'createdAt',
              sortDirection: SortDirection.Desc,
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

  useEffect(() => {
    subscribeToMore<PostAddedSubscription>({
      document: POST_SUBSCRIPTION,
      updateQuery: (previousQueryResult, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return previousQueryResult
        }

        const newPost = subscriptionData.data.postAdded

        return Object.assign({}, previousQueryResult, {
          allPosts: [...previousQueryResult.getPosts.items, newPost],
        })
      },
    })
  }, [subscribeToMore])

  const handleSearchInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value)
  }
  const closeModal = () => {
    dispatch(usersActions.closeModal())
    dispatch(usersActions.setBanUnbanRemoveUser({ id: 0, name: '' }))
  }

  const isLoading = loading || isMoreLoading

  return {
    banU,
    banUnbanRemoveUser,
    closeModal,
    handleSearchInput,
    isBanUserModal,
    isLoading,
    openModal,
    openPosts,
    posts,
    ref,
    setOpenPosts,
    t,
  }
}
