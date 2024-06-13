import { memo } from 'react'

import { UserInfoHeader } from '@/widgets/userInfo/local/userInfoHeader'
import { UserInfoProps } from '@/widgets/userInfo/publ/userInfo/container'

import s from './UserInfo.module.scss'

export const UserInfo = memo(({}: UserInfoProps) => {
  return (
    <div className={s.container}>
      <UserInfoHeader.widget />
    </div>
  )
})
