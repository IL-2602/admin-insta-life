import { gql } from '@apollo/client'

export const GET_POSTS_BY_USER = gql`
  query GetPostsByUser($userId: Int!, $endCursorId: Int) {
    getPostsByUser(userId: $userId, endCursorId: $endCursorId) {
      items {
        url
        id
      }
    }
  }
`

export const GET_POSTS = gql`
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
