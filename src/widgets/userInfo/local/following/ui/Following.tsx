import { memo } from 'react'

import { FollowingProps } from '@/widgets/userInfo/local/following/container'

import s from './Following.module.scss'

export const Following = memo(({}: FollowingProps) => {
  return <div className={s.container}>Following</div>
})
