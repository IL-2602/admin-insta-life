import { memo } from 'react'

import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { Spinner } from '@/shared/ui/Spinner'
import { Table } from '@/shared/ui/Table'
import { Typography } from '@/shared/ui/Typography'
import { PaymentsProps } from '@/widgets/userInfo/local/payments/container'

import s from './Payments.module.scss'

export const Payments = memo(
  ({
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
  }: PaymentsProps) => {
    return (
      <div className={s.container}>
        <Table.Root>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>{t.payments.dateOfPayment}</Table.HeadCell>
              <Table.HeadCell>{t.payments.dateOfSubscription}</Table.HeadCell>
              <Table.HeadCell>{t.payments.amount}</Table.HeadCell>
              <Table.HeadCell>{t.payments.subscriptionType}</Table.HeadCell>
              <Table.HeadCell>{t.payments.paymentType}</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {payments?.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={5}>
                  <Typography className={s.notFound} color={'form'}>
                    {t.payments.empty}
                  </Typography>
                </Table.Cell>
              </Table.Row>
            )}

            {isLoading ? (
              <Table.Row>
                <Table.Cell colSpan={5}>
                  <div className={s.spinner}>
                    <Spinner />
                  </div>
                </Table.Cell>
              </Table.Row>
            ) : (
              payments?.map(payment => {
                return (
                  <Table.Row key={payment.id}>
                    <Table.Cell>{new Date(payment.dateOfPayment).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>{new Date(payment.endDate).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>{'$' + payment.price}</Table.Cell>
                    <Table.Cell>{paymentsTypeMap[payment.type]}</Table.Cell>
                    <Table.Cell>
                      {`${payment.paymentType?.charAt(0).toUpperCase()}${payment.paymentType?.slice(1).toLowerCase()}`}
                    </Table.Cell>
                  </Table.Row>
                )
              })
            )}
          </Table.Body>
        </Table.Root>
        <Pagination
          currentPage={currentPage}
          currentSize={currentSize.toString()}
          pagesCount={pagesCount!}
          setCurrentPage={setCurrentPage}
          setCurrentSize={setCurrentSize}
          totalCount={totalCount!}
        />
      </div>
    )
  }
)
