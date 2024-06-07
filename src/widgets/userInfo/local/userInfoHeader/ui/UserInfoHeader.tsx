import { memo } from 'react'

import { UserInfoHeaderProps } from '@/widgets/userInfo/local/userInfoHeader/container'

import s from './UserInfoHeader.module.scss'

export const UserInfoHeader = memo(({}: UserInfoHeaderProps) => {
  return <div className={s.container}>User Info Header</div>
})
