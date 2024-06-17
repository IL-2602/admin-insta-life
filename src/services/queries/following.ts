import { gql } from '@apollo/client'

export const GET_FOLLOWING = gql`
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
