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
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { t } = useTranslation()
  const { query } = useRouter()

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
      userId: +query.id!,
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

  return {
    currentPage,
    currentSize,
    isLoading,
    pagesCount,
    payments,
    paymentsTypeMap,
    setCurrentPage,
    setCurrentSize,
    t,
    totalCount,
  }
}
