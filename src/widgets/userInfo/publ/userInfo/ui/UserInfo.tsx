import { memo } from 'react'

import { UserInfoProps } from '@/widgets/userInfo/publ/userInfo/container'

import s from './UserInfo.module.scss'

export const UserInfo = memo(({}: UserInfoProps) => {
  return <div className={s.container}>User Info</div>
})
