import { memo } from 'react'

import { ROUTES } from '@/shared/constants/routes'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { Spinner } from '@/shared/ui/Spinner'
import { Table } from '@/shared/ui/Table'
import { Typography } from '@/shared/ui/Typography'
import { FollowersProps } from '@/widgets/userInfo/local/followers/container'
import Link from 'next/link'

import s from './Followers.module.scss'

export const Followers = memo(
  ({
    currentPage,
    currentSize,
    followers,
    handleSortTable,
    loading,
    paginationPagesCount,
    paginationTotalCount,
    setCurrentPage,
    setCurrentSize,
    sort,
    t,
    uId,
  }: FollowersProps) => {
    if (!uId) {
      return null
    }

    return (
      <>
        <Table.Root className={s.container}>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>{t.followers.uId}</Table.HeadCell>
              <Table.HeadCell name={'userName'} onSort={handleSortTable} sort={sort}>
                {t.followers.uName}
              </Table.HeadCell>
              <Table.HeadCell>{t.followers.link}</Table.HeadCell>
              <Table.HeadCell name={'atCreated'} onSort={handleSortTable} sort={sort}>
                {t.followers.followDate}
              </Table.HeadCell>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {followers?.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={4}>
                  <Typography className={s.notFound} color={'form'}>
                    {t.followers.empty}
                  </Typography>
                </Table.Cell>
              </Table.Row>
            )}

            {loading ? (
              <Table.Row>
                <Table.Cell colSpan={4}>
                  <div className={s.loading}>
                    <Spinner />
                  </div>
                </Table.Cell>
              </Table.Row>
            ) : (
              followers?.map(user => {
                return (
                  <Table.Row key={user.id}>
                    <Table.Cell>{user.userId}</Table.Cell>
                    <Table.Cell>{user.userName}</Table.Cell>
                    <Table.Cell>
                      <Link className={s.link} href={ROUTES.USER(user.userId)}>
                        user {user.userId}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                  </Table.Row>
                )
              })
            )}
          </Table.Body>
        </Table.Root>
        {followers?.length !== 0 ? (
          <Pagination
            currentPage={currentPage}
            currentSize={currentSize.toString()}
            pagesCount={paginationPagesCount!}
            setCurrentPage={setCurrentPage}
            setCurrentSize={setCurrentSize}
            totalCount={paginationTotalCount!}
          />
        ) : (
          ''
        )}
      </>
    )
  }
)
