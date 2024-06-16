import { useState } from 'react'

import { GET_PAYMENTS_BY_USER } from '@/services/queries/payments'
import {
  GetPaymentsByUserQuery,
  GetPaymentsByUserQueryVariables,
} from '@/services/queries/payments.generated'
import { SortDirection, SubscriptionType } from '@/services/types'
import { useTranslation } from '@/shared/hooks/useTranslation'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
} from '@/widgets/usersList/publ/usersList/constants/constants'
import { useQuery } from '@apollo/client'

export const useContainer = () => {
  const { t } = useTranslation()

  const base64password = getFromLocalStorage('base64credentials', '')

  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE_NUMBER)
  const [currentSize, setCurrentSize] = useState<number>(INITIAL_PAGE_SIZE)

  const { data, loading: isLoading } = useQuery<
    GetPaymentsByUserQuery,
    GetPaymentsByUserQueryVariables
  >(GET_PAYMENTS_BY_USER, {
    context: { base64password },
    variables: {
      pageNumber: currentPage,
      pageSize: currentSize,
      sortBy: 'createdAt',
      sortDirection: SortDirection.Desc,
      userId: 3,
    },
  })

  const paymentsTypeMap: Record<SubscriptionType, string> = {
    DAY: '1 day',
    MONTHLY: '1 month',
    WEEKLY: '7 day',
  }

  const payments = data?.getPaymentsByUser.items
  const totalCount = data?.getPaymentsByUser.totalCount
  const pagesCount = data?.getPaymentsByUser.pagesCount

  const handlePageSize = (pageSize: string) => {
    setCurrentSize(+pageSize)

    if (pagesCount !== INITIAL_PAGE_NUMBER && currentSize !== totalCount) {
      setCurrentPage(INITIAL_PAGE_NUMBER)
    }
  }

  const handlePageNumber = (pageNumber: number) => {
    setCurrentPage(pageNumber)

    if (currentSize !== INITIAL_PAGE_SIZE) {
      setCurrentSize(INITIAL_PAGE_SIZE)
    }
  }

  return {
    currentPage,
    currentSize,
    handlePageNumber,
    handlePageSize,
    isLoading,
    pagesCount,
    payments,
    paymentsTypeMap,
    t,
    totalCount,
  }
}
