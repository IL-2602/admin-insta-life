import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from '../types'
const defaultOptions = {} as const

export type GetUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input']
}>

export type GetUserQuery = {
  __typename?: 'Query'
  getUser: {
    __typename?: 'User'
    createdAt: any
    email: string
    id: number
    profile: {
      __typename?: 'Profile'
      avatars?: Array<{
        __typename?: 'Avatar'
        fileSize?: null | number
        height?: null | number
        url?: null | string
        width?: null | number
      }> | null
      firstName?: null | string
      lastName?: null | string
    }
    userName: string
  }
}

export type BanUserMutationVariables = Types.Exact<{
  banReason: Types.Scalars['String']['input']
  userId: Types.Scalars['Int']['input']
}>

export type BanUserMutation = { __typename?: 'Mutation'; banUser: boolean }

export type UnbanUserMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input']
}>

export type UnbanUserMutation = { __typename?: 'Mutation'; unbanUser: boolean }

export type RemoveUserMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input']
}>

export type RemoveUserMutation = { __typename?: 'Mutation'; removeUser: boolean }

export type GetUsersQueryVariables = Types.Exact<{
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortDirection?: Types.InputMaybe<Types.SortDirection>
  statusFilter?: Types.InputMaybe<Types.UserBlockStatus>
}>

export type GetUsersQuery = {
  __typename?: 'Query'
  getUsers: {
    __typename?: 'UsersPaginationModel'
    pagination: {
      __typename?: 'PaginationModel'
      page: number
      pageSize: number
      pagesCount: number
      totalCount: number
    }
    users: Array<{
      __typename?: 'User'
      createdAt: any
      email: string
      id: number
      userBan?: { __typename?: 'UserBan'; createdAt: any; reason: string } | null
      userName: string
    }>
  }
}

export const GetUserDocument = gql`
  query getUser($userId: Int!) {
    getUser(userId: $userId) {
      id
      userName
      email
      createdAt
      profile {
        firstName
        lastName
        avatars {
          url
          width
          height
          fileSize
        }
      }
    }
  }
`

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: ({ skip: boolean } | { skip?: boolean; variables: GetUserQueryVariables }) &
    Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options)
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options)
}
export function useGetUserSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options)
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>
export const BanUserDocument = gql`
  mutation BanUser($banReason: String!, $userId: Int!) {
    banUser(banReason: $banReason, userId: $userId)
  }
`
export type BanUserMutationFn = Apollo.MutationFunction<BanUserMutation, BanUserMutationVariables>

/**
 * __useBanUserMutation__
 *
 * To run a mutation, you first call `useBanUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBanUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [banUserMutation, { data, loading, error }] = useBanUserMutation({
 *   variables: {
 *      banReason: // value for 'banReason'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useBanUserMutation(
  baseOptions?: Apollo.MutationHookOptions<BanUserMutation, BanUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useMutation<BanUserMutation, BanUserMutationVariables>(BanUserDocument, options)
}
export type BanUserMutationHookResult = ReturnType<typeof useBanUserMutation>
export type BanUserMutationResult = Apollo.MutationResult<BanUserMutation>
export type BanUserMutationOptions = Apollo.BaseMutationOptions<
  BanUserMutation,
  BanUserMutationVariables
>
export const UnbanUserDocument = gql`
  mutation UnbanUser($userId: Int!) {
    unbanUser(userId: $userId)
  }
`
export type UnbanUserMutationFn = Apollo.MutationFunction<
  UnbanUserMutation,
  UnbanUserMutationVariables
>

/**
 * __useUnbanUserMutation__
 *
 * To run a mutation, you first call `useUnbanUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnbanUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unbanUserMutation, { data, loading, error }] = useUnbanUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnbanUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UnbanUserMutation, UnbanUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useMutation<UnbanUserMutation, UnbanUserMutationVariables>(
    UnbanUserDocument,
    options
  )
}
export type UnbanUserMutationHookResult = ReturnType<typeof useUnbanUserMutation>
export type UnbanUserMutationResult = Apollo.MutationResult<UnbanUserMutation>
export type UnbanUserMutationOptions = Apollo.BaseMutationOptions<
  UnbanUserMutation,
  UnbanUserMutationVariables
>
export const RemoveUserDocument = gql`
  mutation RemoveUser($userId: Int!) {
    removeUser(userId: $userId)
  }
`
export type RemoveUserMutationFn = Apollo.MutationFunction<
  RemoveUserMutation,
  RemoveUserMutationVariables
>

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveUserMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(
    RemoveUserDocument,
    options
  )
}
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<
  RemoveUserMutation,
  RemoveUserMutationVariables
>
export const GetUsersDocument = gql`
  query getUsers(
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
    $statusFilter: UserBlockStatus
    $searchTerm: String
  ) {
    getUsers(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      statusFilter: $statusFilter
      searchTerm: $searchTerm
    ) {
      users {
        id
        userName
        userBan {
          reason
          createdAt
        }
        createdAt
        email
      }
      pagination {
        pagesCount
        page
        pageSize
        totalCount
      }
    }
  }
`

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *      statusFilter: // value for 'statusFilter'
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options)
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options)
}
export function useGetUsersSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options)
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>
