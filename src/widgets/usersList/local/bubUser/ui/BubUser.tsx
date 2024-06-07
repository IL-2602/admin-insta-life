import { memo } from 'react'

import { BubUserProps } from '@/widgets/usersList/local/bubUser/container'

import s from './BubUser.module.scss'

export const BubUser = memo(({}: BubUserProps) => {
  return <div className={s.container}>уот ис зыс баб юзер?</div>
})
