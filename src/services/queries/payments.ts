import { gql } from '@apollo/client'

export const GET_PAYMENTS_BY_USER = gql`
  query GetPaymentsByUser(
    $userId: Int!
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
  ) {
    getPaymentsByUser(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      userId: $userId
    ) {
      pagesCount
      totalCount
      items {
        id
        dateOfPayment
        endDate
        type
        price
        paymentType
      }
    }
  }
`
