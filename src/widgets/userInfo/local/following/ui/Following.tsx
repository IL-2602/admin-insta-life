import { memo } from 'react'

import { ROUTES } from '@/shared/constants/routes'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { Spinner } from '@/shared/ui/Spinner'
import { Table } from '@/shared/ui/Table'
import { Typography } from '@/shared/ui/Typography'
import { FollowingProps } from '@/widgets/userInfo/local/following/container'
import Link from 'next/link'

import s from './Following.module.scss'

export const Following = memo(
  ({
    currentPage,
    currentSize,
    handlePageNumber,
    handlePageSize,
    handleSortTable,
    isLoading,
    items,
    pagesCount,
    sort,
    t,
    totalCount,
    uId,
  }: FollowingProps) => {
    if (isLoading && !items) {
      return (
        <div className={s.spinner}>
          <Spinner />
        </div>
      )
    }

    if (!uId) {
      return null
    }

    return (
      <div className={s.container}>
        <Table.Root>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>{t.followers.uId}</Table.HeadCell>
              <Table.HeadCell name={'userName'} onSort={handleSortTable} sort={sort}>
                {t.followers.uName}
              </Table.HeadCell>
              <Table.HeadCell>{t.followers.link}</Table.HeadCell>
              <Table.HeadCell name={'createdAt'} onSort={handleSortTable} sort={sort}>
                {t.followers.followDate}
              </Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {items?.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={4}>
                  <Typography className={s.notFound} color={'form'}>
                    {t.followers.empty}
                  </Typography>
                </Table.Cell>
              </Table.Row>
            )}
            {items?.map(follow => {
              return (
                <Table.Row key={follow.id}>
                  <Table.Cell>{follow.userId}</Table.Cell>
                  <Table.Cell>{follow.userName}</Table.Cell>
                  <Table.Cell>
                    <Link className={s.link} href={ROUTES.USER(follow.userId)}>
                      user {follow.userId}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{new Date(follow.createdAt).toLocaleDateString()}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
        {items?.length !== 0 ? (
          <Pagination
            currentPage={currentPage}
            currentSize={currentSize.toString()}
            handlePageNumber={handlePageNumber}
            handlePageSize={handlePageSize}
            pagesCount={pagesCount!}
            totalCount={totalCount!}
          />
        ) : (
          ''
        )}
      </div>
    )
  }
)
