import { gql } from '@apollo/client'

export const GET_USER = gql`
  query GetUser($userId: Int!) {
    getUser(userId: $userId) {
      id
      userName
      email
      createdAt
    }
  }
`

export const GET_USERS = gql`
  query GetUsers(
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
        profile {
          lastName
          firstName
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
