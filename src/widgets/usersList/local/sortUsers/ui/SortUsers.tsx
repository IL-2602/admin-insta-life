import { memo } from 'react'

import { SortUsersProps } from '@/widgets/usersList/local/sortUsers/container'

import s from './SortUsers.module.scss'

export const SortUsers = memo(({}: SortUsersProps) => {
  return <div className={s.container}>Sort Users</div>
})
