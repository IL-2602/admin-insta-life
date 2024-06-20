import React, { ReactNode } from 'react'

import { BanUserIcon } from '@/shared/assets/icons/BanUser'
import { DeleteUserIcon } from '@/shared/assets/icons/DeleteUser'
import { HorizontalDots } from '@/shared/assets/icons/HorizontalDots/HorizontalDots'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { ModalType } from '@/widgets/usersList/publ/usersList/container/useContainer'

import s from './AdminOptions.module.scss'

type Props = {
  openModal: (type: ModalType, userId: number, userName: string) => void
  user: any
}

type AdminOptionsType = {
  icon: ReactNode
  onClick?: () => void
  title: string
}

export const AdminOptions = ({ openModal, user }: Props) => {
  const { t } = useTranslation()
  const adminOptions: AdminOptionsType[] = [
    {
      icon: user.userBan ? <BanUserIcon /> : <BanUserIcon />,
      onClick: user.userBan
        ? () => openModal('UNBAN', user.id, user.userName)
        : () => openModal('BAN', user.id, user.userName),
      title: user.userBan ? t.usersList.adminApi.unbanUser : t.usersList.adminApi.banUser,
    },
    {
      icon: <DeleteUserIcon />,
      onClick: () => openModal('REMOVE', user.id, user.userName),
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
