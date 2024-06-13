import { gql } from '@apollo/client'

export const GET_USER = gql`
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

export const GET_USERS = gql`
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
