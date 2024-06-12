import { memo } from 'react'

import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { Spinner } from '@/shared/ui/Spinner'
import { Table } from '@/shared/ui/Table'
import { SearchUser } from '@/widgets/usersList/local/searchUser'
import { SortUsers } from '@/widgets/usersList/local/sortUsers'
import { UsersListProps } from '@/widgets/usersList/publ/usersList/container'

import s from './UsersList.module.scss'

export const UsersList = memo(
  ({
    currentPage,
    currentSize,
    handlePageNumber,
    handlePageSize,
    handleSortTable,
    isLoading,
    pagination,
    sort,
    users,
  }: UsersListProps) => {
    return (
      <div className={s.container}>
        <div className={s.searchWrapper}>
          <SearchUser.widget />
          <SortUsers.widget />
        </div>

        <Table.Root>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>User ID</Table.HeadCell>
              <Table.HeadCell name={'userName'} onSort={handleSortTable} sort={sort}>
                User Name
              </Table.HeadCell>
              <Table.HeadCell>Profile link</Table.HeadCell>
              <Table.HeadCell name={'createdAt'} onSort={handleSortTable} sort={sort}>
                Date added
              </Table.HeadCell>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {isLoading ? (
              <Table.Row>
                <Table.Cell colSpan={4}>
                  <div className={s.spinner}>
                    <Spinner />
                  </div>
                </Table.Cell>
              </Table.Row>
            ) : (
              users?.map(user => {
                return (
                  <Table.Row key={user.id}>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell>{user.userName}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                  </Table.Row>
                )
              })
            )}
          </Table.Body>
        </Table.Root>
        <Pagination
          currentPage={currentPage}
          currentSize={currentSize.toString()}
          handlePageNumber={handlePageNumber}
          handlePageSize={handlePageSize}
          pagesCount={pagination?.pagesCount!}
          totalCount={pagination?.totalCount!}
        />
      </div>
    )
  }
)
