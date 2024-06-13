import { memo } from 'react'

import { ROUTES } from '@/shared/constans/routes'
import { GoBack } from '@/shared/ui/GoBack'
import { Typography } from '@/shared/ui/Typography'
import { UserInfoHeaderProps } from '@/widgets/userInfo/local/userInfoHeader/container'
import Image from 'next/image'

import s from './UserInfoHeader.module.scss'

import noPhoto from '../../../../../../public/noPhoto.svg'

export const UserInfoHeader = memo(({ loading, t, user }: UserInfoHeaderProps) => {
  if (loading) {
    return null
  }

  return (
    <div className={s.container}>
      <GoBack className={s.goBack} title={t.userInfo.backToUsersList} to={ROUTES.USERS}></GoBack>
      <div className={s.infoWrapper}>
        <div
          className={`${s.imageWrapper} ${user?.profile.avatars && user?.profile.avatars[0] === undefined ? s.border : ''}`}
        >
          {user?.profile.avatars && user.profile.avatars[0] ? (
            <Image alt={'avatar'} height={60} src={user.profile.avatars[0].url!} width={60} />
          ) : (
            <Image alt={'no avatar'} height={30} src={noPhoto} width={30} />
          )}
        </div>
        <div className={s.titlesWrapper}>
          <Typography as={'h1'} variant={'h1'}>
            {user?.profile.firstName || 'no first name'} {user?.profile.lastName || ' no last name'}
          </Typography>
          <Typography as={'span'} className={s.subtitle} variant={'regular14'}>
            {user?.userName}
          </Typography>
        </div>
      </div>
      <div className={s.profileWrapper}>
        <div>
          <Typography color={'form'} variant={'regular14'}>
            UserID
          </Typography>
          <Typography variant={'regular16'}>{user?.id}</Typography>
        </div>
        <div>
          <Typography color={'form'} variant={'regular14'}>
            {t.userInfo.creationDate}
          </Typography>
          <Typography variant={'regular16'}>
            {new Date(user?.createdAt).toLocaleDateString()}
          </Typography>
        </div>
      </div>
    </div>
  )
})
