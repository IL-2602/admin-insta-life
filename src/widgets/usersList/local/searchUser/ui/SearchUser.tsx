import { memo } from 'react'

import { SearchUserProps } from '@/widgets/usersList/local/searchUser/container'

import s from './SearchUser.module.scss'

export const SearchUser = memo(({}: SearchUserProps) => {
  return <div className={s.container}>Search User</div>
})
