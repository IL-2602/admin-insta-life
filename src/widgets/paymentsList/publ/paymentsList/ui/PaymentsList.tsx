import { memo } from 'react'

import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { Search } from '@/shared/ui/Search'
import { Spinner } from '@/shared/ui/Spinner'
import { Table } from '@/shared/ui/Table'
import { TextField } from '@/shared/ui/Textfield'
import { Typography } from '@/shared/ui/Typography'
import { PaymentsListProps } from '@/widgets/paymentsList/publ/paymentsList/container'
import Image from 'next/image'

import s from './PaymentsList.module.scss'

import noAvatar from '../../../../../../public/noPhoto.svg'

export const PaymentsList = memo(
  ({
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
  }: PaymentsListProps) => {
    return (
      <div className={s.container}>
        <TextField
          className={s.search}
          iconStart={<Search />}
          onChange={handleSearchInput}
          placeholder={'Search'}
        />

        <Table.Root>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell name={'userName'} onSort={handleSortTable} sort={sort}>
                {t.followers.uName}
              </Table.HeadCell>
              <Table.HeadCell name={'createdAt'} onSort={handleSortTable} sort={sort}>
                {t.usersList.dateAdded}
              </Table.HeadCell>
              <Table.HeadCell name={'amount'} onSort={handleSortTable} sort={sort}>
                {t.payments.amount}
              </Table.HeadCell>
              <Table.HeadCell>{t.payments.subscriptionType}</Table.HeadCell>
              <Table.HeadCell name={'paymentMethod'} onSort={handleSortTable} sort={sort}>
                {t.payments.paymentType}
              </Table.HeadCell>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {payments?.length === 0 && search && (
              <Table.Row>
                <Table.Cell colSpan={5}>
                  <Typography className={s.searchNotFound} color={'form'}>
                    {t.usersList.searchNotFound}
                  </Typography>
                </Table.Cell>
              </Table.Row>
            )}

            {loading ? (
              <Table.Row>
                <Table.Cell colSpan={5}>
                  <div className={s.spinner}>
                    <Spinner />
                  </div>
                </Table.Cell>
              </Table.Row>
            ) : (
              payments?.map(payment => {
                // console.log(payment.avatars ? payment.avatars[0].url! : noAvatar)

                return (
                  <Table.Row key={payment.id}>
                    <Table.Cell>
                      <div className={s.photosWrapper}>
                        {payment.avatars && payment.avatars.length > 0 ? (
                          <Image
                            alt={'avatar'}
                            className={s.photo}
                            height={36}
                            src={payment.avatars[0].url!}
                            width={36}
                          />
                        ) : (
                          <div className={s.noPhoto}>
                            <Image alt={'noAvatar'} height={24} src={noAvatar} width={24} />
                          </div>
                        )}

                        <Typography as={'span'}>{payment.userName}</Typography>
                      </div>
                    </Table.Cell>
                    <Table.Cell>{new Date(payment.createdAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>{payment.amount}$</Table.Cell>
                    <Table.Cell>{subscriptionTypes[payment.type]}</Table.Cell>
                    <Table.Cell>{paymentTypes[payment.paymentMethod]}</Table.Cell>
                  </Table.Row>
                )
              })
            )}
          </Table.Body>
        </Table.Root>
        {payments?.length !== 0 && (
          <Pagination
            currentPage={currentPage}
            currentSize={currentSize.toString()}
            pagesCount={pagesCount!}
            setCurrentPage={setCurrentPage}
            setCurrentSize={setCurrentSize}
            totalCount={totalCount!}
          />
        )}
      </div>
    )
  }
)
