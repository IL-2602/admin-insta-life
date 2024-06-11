import { memo } from 'react'

import { BunUserProps } from '@/widgets/usersList/local/bunUser/container'

import s from './BunUser.module.scss'

export const BunUser = memo(({}: BunUserProps) => {
  return <div className={s.container}>уот ис зыс баб юзер?</div>
})
