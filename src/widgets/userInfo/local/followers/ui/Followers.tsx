import { memo } from 'react'

import { Spinner } from '@/shared/ui/Spinner'
import { Table } from '@/shared/ui/Table'
import { Typography } from '@/shared/ui/Typography'
import { FollowersProps } from '@/widgets/userInfo/local/followers/container'
import Link from 'next/link'

import s from './Followers.module.scss'

export const Followers = memo(({ followers, loading, t }: FollowersProps) => {
  if (loading) {
    return <div>Loading</div>
  }

  return (
    <Table.Root className={s.container}>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>{t.followers.uId}</Table.HeadCell>
          <Table.HeadCell>{t.followers.uName}</Table.HeadCell>
          <Table.HeadCell>{t.followers.link}</Table.HeadCell>
          <Table.HeadCell>{t.followers.followDate}</Table.HeadCell>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {followers?.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={4}>
              <Typography className={s.searchNotFound} color={'form'}>
                {t.usersList.searchNotFound}
              </Typography>
            </Table.Cell>
          </Table.Row>
        )}

        {loading ? (
          <Table.Row>
            <Table.Cell colSpan={4}>
              <div className={s.spinner}>
                <Spinner />
              </div>
            </Table.Cell>
          </Table.Row>
        ) : (
          followers?.map(user => {
            return (
              <Table.Row key={user.id}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.userName}</Table.Cell>
                <Table.Cell>
                  <Link className={s.link} href={'#'}>{`>>>O,O<<<`}</Link>
                </Table.Cell>
                <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
              </Table.Row>
            )
          })
        )}
      </Table.Body>
    </Table.Root>
  )
})
