import { memo } from 'react'

import { FollowersProps } from '@/widgets/userInfo/local/followers/container'

import s from './Followers.module.scss'

export const Followers = memo(({}: FollowersProps) => {
  return <div className={s.container}>Followers</div>
})
