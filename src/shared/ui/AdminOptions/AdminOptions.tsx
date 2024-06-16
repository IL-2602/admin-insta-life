import React, { ReactNode } from 'react'

import { BanUserIcon } from '@/shared/assets/icons/BanUser'
import { DeleteUserIcon } from '@/shared/assets/icons/DeleteUser'
import { HorizontalDots } from '@/shared/assets/icons/HorizontalDots/HorizontalDots'
import { useTranslation } from '@/shared/hooks/useTranslation'

import s from './AdminOptions.module.scss'

type Props = {
  banUser: (id: number) => void
  deleteUser: (id: number) => void
  unbanUser: (id: number) => void
  user: any
}

type AdminOptionsType = {
  icon: ReactNode
  onClick?: () => void
  title: string
}

export const AdminOptions = ({ banUser, deleteUser, unbanUser, user }: Props) => {
  const { t } = useTranslation()
  const adminOptions: AdminOptionsType[] = [
    {
      icon: user.userBan ? <BanUserIcon /> : <BanUserIcon />,
      onClick: user.userBan ? () => unbanUser(user.id) : () => banUser(user.id),
      title: user.userBan ? t.usersList.adminApi.unbanUser : t.usersList.adminApi.banUser,
    },
    {
      icon: <DeleteUserIcon />,
      onClick: () => deleteUser(user.id),
      title: t.usersList.adminApi.deleteUser,
    },
    {
      icon: <HorizontalDots />,
      onClick: () => {},
      title: t.usersList.adminApi.moreInfo,
    },
  ]

  return (
    <div className={s.container}>
      {adminOptions.map(option => (
        <div className={s.option} key={option.title} onClick={option.onClick}>
          <div className={s.icon}>{option.icon}</div>
          <div className={s.title}>{option.title}</div>
        </div>
      ))}
    </div>
  )
}
