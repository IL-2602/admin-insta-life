import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from '../types'
const defaultOptions = {} as const

export type PostAddedSubscriptionVariables = Types.Exact<{ [key: string]: never }>

export type PostAddedSubscription = {
  __typename?: 'Subscription'
  postAdded: {
    __typename?: 'Post'
    createdAt: any
    description: string
    id: number
    images?: Array<{ __typename?: 'ImagePost'; id?: null | number; url?: null | string }> | null
    ownerId: number
    postOwner: {
      __typename?: 'PostOwnerModel'
      avatars?: Array<{ __typename?: 'Avatar'; url?: null | string }> | null
      firstName?: null | string
      lastName?: null | string
      userName: string
    }
  }
}

export const PostAddedDocument = gql`
  subscription PostAdded {
    postAdded {
      images {
        url
        id
      }
      id
      ownerId
      description
      createdAt
      postOwner {
        userName
        firstName
        lastName
        avatars {
          url
        }
      }
    }
  }
`

/**
 * __usePostAddedSubscription__
 *
 * To run a query within a React component, call `usePostAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePostAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePostAddedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    PostAddedSubscription,
    PostAddedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useSubscription<PostAddedSubscription, PostAddedSubscriptionVariables>(
    PostAddedDocument,
    options
  )
}
export type PostAddedSubscriptionHookResult = ReturnType<typeof usePostAddedSubscription>
export type PostAddedSubscriptionResult = Apollo.SubscriptionResult<PostAddedSubscription>
