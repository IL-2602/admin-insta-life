import { memo } from 'react'

import { BanUserIcon } from '@/shared/assets/icons/BanUser/BanUser'
import { ROUTES } from '@/shared/constants/routes'
import { AdminApiModal } from '@/shared/ui/Modal/AdminApiModal/AdminApiModal'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { Spinner } from '@/shared/ui/Spinner'
import { Table } from '@/shared/ui/Table'
import { Typography } from '@/shared/ui/Typography'
import { UserInteractionAdminApi } from '@/shared/ui/UserInteractionAdminApi/UserInteractionAdminApi'
import { SearchUser } from '@/widgets/usersList/local/searchUser'
import { UsersListProps } from '@/widgets/usersList/publ/usersList/container'
import Link from 'next/link'

import s from './UsersList.module.scss'

import { FilterUsers } from '../../../local/filterUsers'

export const UsersList = memo(
  ({
    banU,
    banUnbanRemoveUser,
    closeModal,
    currentPage,
    currentSize,
    deleteU,
    handlePageNumber,
    handlePageSize,
    handleSortTable,
    isBanUserModal,
    isDeleteUserModal,
    isLoading,
    isUnbanUserModal,
    loadingBan,
    loadingUnban,
    openModal,
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
                Username
              </Table.HeadCell>
              <Table.HeadCell>{t.usersList.profileLink}</Table.HeadCell>
              <Table.HeadCell colSpan={2} name={'createdAt'} onSort={handleSortTable} sort={sort}>
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
                    <Table.Cell>
                      <div className={s.tableCellField}>
                        {user.userBan ? <BanUserIcon /> : ''}
                        <div className={s.tableCellFieldId}>{user.id}</div>
                      </div>
                    </Table.Cell>
                    <Table.Cell>{user.userName}</Table.Cell>
                    <Link className={s.link} href={ROUTES.USER(user.id)}>
                      <Table.Cell>{user.email}</Table.Cell>
                    </Link>
                    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <div style={{ cursor: 'pointer' }}>
                        <UserInteractionAdminApi
                          // banUser={banU}
                          // deleteUser={deleteU}
                          openModal={openModal}
                          // unbanUser={unbanU}
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
        <AdminApiModal
          banUnbanRemoveUser={banUnbanRemoveUser}
          banUser={banU}
          closeModal={closeModal}
          deleteUser={deleteU}
          isBanUserModal={isBanUserModal}
          isDeleteUserModal={isDeleteUserModal}
          isUnbanUserModal={isUnbanUserModal}
          t={t}
          unbanUser={unbanU}
        />
      </div>
    )
  }
)
