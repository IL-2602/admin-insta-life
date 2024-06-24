import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from '../types'
const defaultOptions = {} as const

export type GetPostsByUserQueryVariables = Types.Exact<{
  endCursorId?: Types.InputMaybe<Types.Scalars['Int']['input']>
  userId: Types.Scalars['Int']['input']
}>

export type GetPostsByUserQuery = {
  __typename?: 'Query'
  getPostsByUser: {
    __typename?: 'PostsByUserModel'
    items?: Array<{ __typename?: 'ImagePost'; id?: null | number; url?: null | string }> | null
  }
}

export type GetPostsQueryVariables = Types.Exact<{
  endCursorPostId?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortDirection?: Types.InputMaybe<Types.SortDirection>
}>

export type GetPostsQuery = {
  __typename?: 'Query'
  getPosts: {
    __typename?: 'PostsPaginationModel'
    items: Array<{
      __typename?: 'Post'
      createdAt: any
      description: string
      id: number
      images?: Array<{ __typename?: 'ImagePost'; url?: null | string }> | null
      ownerId: number
      postOwner: {
        __typename?: 'PostOwnerModel'
        avatars?: Array<{ __typename?: 'Avatar'; url?: null | string }> | null
        firstName?: null | string
        lastName?: null | string
        userName: string
      }
    }>
    totalCount: number
  }
}

export const GetPostsByUserDocument = gql`
  query GetPostsByUser($userId: Int!, $endCursorId: Int) {
    getPostsByUser(userId: $userId, endCursorId: $endCursorId) {
      items {
        url
        id
      }
    }
  }
`

/**
 * __useGetPostsByUserQuery__
 *
 * To run a query within a React component, call `useGetPostsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      endCursorId: // value for 'endCursorId'
 *   },
 * });
 */
export function useGetPostsByUserQuery(
  baseOptions: ({ skip: boolean } | { skip?: boolean; variables: GetPostsByUserQueryVariables }) &
    Apollo.QueryHookOptions<GetPostsByUserQuery, GetPostsByUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetPostsByUserQuery, GetPostsByUserQueryVariables>(
    GetPostsByUserDocument,
    options
  )
}
export function useGetPostsByUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPostsByUserQuery, GetPostsByUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetPostsByUserQuery, GetPostsByUserQueryVariables>(
    GetPostsByUserDocument,
    options
  )
}
export function useGetPostsByUserSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostsByUserQuery, GetPostsByUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetPostsByUserQuery, GetPostsByUserQueryVariables>(
    GetPostsByUserDocument,
    options
  )
}
export type GetPostsByUserQueryHookResult = ReturnType<typeof useGetPostsByUserQuery>
export type GetPostsByUserLazyQueryHookResult = ReturnType<typeof useGetPostsByUserLazyQuery>
export type GetPostsByUserSuspenseQueryHookResult = ReturnType<
  typeof useGetPostsByUserSuspenseQuery
>
export type GetPostsByUserQueryResult = Apollo.QueryResult<
  GetPostsByUserQuery,
  GetPostsByUserQueryVariables
>
export const GetPostsDocument = gql`
  query GetPosts(
    $endCursorPostId: Int
    $searchTerm: String
    $pageSize: Int
    $sortBy: String
    $sortDirection: SortDirection
  ) {
    getPosts(
      endCursorPostId: $endCursorPostId
      searchTerm: $searchTerm
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      totalCount
      items {
        images {
          url
        }
        id
        ownerId
        description
        createdAt
        postOwner {
          firstName
          lastName
          userName
          avatars {
            url
          }
        }
      }
    }
  }
`

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      endCursorPostId: // value for 'endCursorPostId'
 *      searchTerm: // value for 'searchTerm'
 *      pageSize: // value for 'pageSize'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetPostsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options)
}
export function useGetPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options)
}
export function useGetPostsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options)
}
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>
export type GetPostsSuspenseQueryHookResult = ReturnType<typeof useGetPostsSuspenseQuery>
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>
