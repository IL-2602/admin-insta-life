import { gql } from '@apollo/client'

export const POST_SUBSCRIPTION = gql`
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
