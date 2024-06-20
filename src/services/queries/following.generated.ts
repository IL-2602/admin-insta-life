import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from '../types'
const defaultOptions = {} as const

export type GetFollowingQueryVariables = Types.Exact<{
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortDirection?: Types.InputMaybe<Types.SortDirection>
  userId: Types.Scalars['Int']['input']
}>

export type GetFollowingQuery = {
  __typename?: 'Query'
  getFollowing: {
    __typename?: 'FollowPaginationModel'
    items: Array<{
      __typename?: 'Follow'
      createdAt: any
      id: number
      userId: number
      userName?: null | string
    }>
    page: number
    pageSize: number
    pagesCount: number
    totalCount: number
  }
}

export const GetFollowingDocument = gql`
  query GetFollowing(
    $userId: Int!
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
  ) {
    getFollowing(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      userId: $userId
    ) {
      items {
        id
        userId
        userName
        createdAt
      }
      page
      pagesCount
      pageSize
      totalCount
    }
  }
`

/**
 * __useGetFollowingQuery__
 *
 * To run a query within a React component, call `useGetFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowingQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetFollowingQuery(
  baseOptions: ({ skip: boolean } | { skip?: boolean; variables: GetFollowingQueryVariables }) &
    Apollo.QueryHookOptions<GetFollowingQuery, GetFollowingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetFollowingQuery, GetFollowingQueryVariables>(
    GetFollowingDocument,
    options
  )
}
export function useGetFollowingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetFollowingQuery, GetFollowingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetFollowingQuery, GetFollowingQueryVariables>(
    GetFollowingDocument,
    options
  )
}
export function useGetFollowingSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetFollowingQuery, GetFollowingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetFollowingQuery, GetFollowingQueryVariables>(
    GetFollowingDocument,
    options
  )
}
export type GetFollowingQueryHookResult = ReturnType<typeof useGetFollowingQuery>
export type GetFollowingLazyQueryHookResult = ReturnType<typeof useGetFollowingLazyQuery>
export type GetFollowingSuspenseQueryHookResult = ReturnType<typeof useGetFollowingSuspenseQuery>
export type GetFollowingQueryResult = Apollo.QueryResult<
  GetFollowingQuery,
  GetFollowingQueryVariables
>
