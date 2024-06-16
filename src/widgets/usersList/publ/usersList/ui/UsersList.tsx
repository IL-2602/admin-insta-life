import { memo } from 'react'

import { BanUserIcon } from '@/shared/assets/icons/BanUser/BanUser'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { Spinner } from '@/shared/ui/Spinner'
import { Table } from '@/shared/ui/Table'
import { Typography } from '@/shared/ui/Typography'
import { UserInteractionAdminApi } from '@/shared/ui/UserInteractionAdminApi/UserInteractionAdminApi'
import { SearchUser } from '@/widgets/usersList/local/searchUser'
import { UsersListProps } from '@/widgets/usersList/publ/usersList/container'

import s from './UsersList.module.scss'

import { FilterUsers } from '../../../local/filterUsers'

export const UsersList = memo(
  ({
    banU,
    currentPage,
    currentSize,
    deleteU,
    handlePageNumber,
    handlePageSize,
    handleSortTable,
    isLoading,
    loadingBan,
    loadingUnban,
    pagination,
    sort,
    state,
    t,
    unbanU,
    users,
  }: UsersListProps) => {
    return (
      <div className={s.container}>
        <div className={s.searchWrapper}>
          <SearchUser.widget />
          <FilterUsers.widget />
        </div>

        <Table.Root>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>User ID</Table.HeadCell>
              <Table.HeadCell name={'userName'} onSort={handleSortTable} sort={sort}>
                User Name
              </Table.HeadCell>
              <Table.HeadCell>{t.usersList.profileLink}</Table.HeadCell>
              <Table.HeadCell name={'createdAt'} onSort={handleSortTable} sort={sort}>
                {t.usersList.dateAdded}
              </Table.HeadCell>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {users?.length === 0 && state.searchByUsername && (
              <Table.Row>
                <Table.Cell colSpan={4}>
                  <Typography className={s.searchNotFound} color={'form'}>
                    {t.usersList.searchNotFound}
                  </Typography>
                </Table.Cell>
              </Table.Row>
            )}

            {isLoading || loadingBan || loadingUnban ? (
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
                    <Table.Cell className={s.tableCellField}>
                      {user.userBan ? (
                        <div className={s.tableCellFieldIdIcon}>
                          <BanUserIcon />
                        </div>
                      ) : (
                        ''
                      )}
                      <div className={s.tableCellFieldId}>{user.id}</div>
                    </Table.Cell>
                    <Table.Cell>{user.userName}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <div style={{ cursor: 'pointer' }}>
                        <UserInteractionAdminApi
                          banUser={banU}
                          deleteUser={deleteU}
                          unbanUser={unbanU}
                          user={user}
                        />
                      </div>
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
          handlePageNumber={handlePageNumber}
          handlePageSize={handlePageSize}
          pagesCount={pagination?.pagesCount!}
          totalCount={pagination?.totalCount!}
        />
      </div>
    )
  }
)
