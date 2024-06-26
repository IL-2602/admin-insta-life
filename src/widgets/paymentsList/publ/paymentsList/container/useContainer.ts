import { ChangeEvent, useState } from 'react'

import { GET_PAYMENTS } from '@/services/queries/payments'
import { GetPaymentsQuery, GetPaymentsQueryVariables } from '@/services/queries/payments.generated'
import { PaymentMethod, SortDirection, SubscriptionType } from '@/services/types'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { HeadCellSort } from '@/shared/ui/Table/Table'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
  INITIAL_SORT,
} from '@/widgets/usersList/publ/usersList/constants/constants'
import { useQuery } from '@apollo/client'

export const useContainer = () => {
  const base64password = getFromLocalStorage('base64credentials', '')
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE_NUMBER)
  const [currentSize, setCurrentSize] = useState<number>(INITIAL_PAGE_SIZE)
  const [sort, setSort] = useState<HeadCellSort>(INITIAL_SORT)
  const [search, setSearch] = useState('')

  const { data, loading } = useQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GET_PAYMENTS, {
    context: { base64password },
    variables: {
      pageNumber: currentPage,
      pageSize: currentSize,
      searchTerm: search.trim(),
      sortBy: sort.key,
      sortDirection: SortDirection[sort.direction],
    },
  })

  const subscriptionTypes: Record<SubscriptionType, string> = {
    DAY: '1 day',
    MONTHLY: '1 month',
    WEEKLY: '7 day',
  }

  const paymentTypes: Record<PaymentMethod, string> = {
    CREDIT_CARD: 'Credit Card',
    PAYPAL: 'PayPal',
    STRIPE: 'Stripe',
  }

  const payments = data?.getPayments.items
  const pagesCount = data?.getPayments.pagesCount
  const totalCount = data?.getPayments.totalCount

  const handleSortTable = (sort: HeadCellSort | null) => {
    sort?.direction ? setSort(sort) : setSort(INITIAL_SORT)
  }

  const handleSearchInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value)
  }

  return {
    currentPage,
    currentSize,
    handleSearchInput,
    handleSortTable,
    loading,
    pagesCount,
    paymentTypes,
    payments,
    search,
    setCurrentPage,
    setCurrentSize,
    sort,
    subscriptionTypes,
    t,
    totalCount,
  }
}
