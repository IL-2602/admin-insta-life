import { memo } from 'react'

import { Search } from '@/shared/ui/Search'
import { TextField } from '@/shared/ui/Textfield'
import { SearchUserProps } from '@/widgets/usersList/local/searchUser/container'

import s from './SearchUser.module.scss'

export const SearchUser = memo(({}: SearchUserProps) => {
  return (
    <div className={s.container}>
      <TextField iconStart={<Search />} placeholder={'Search'} />
    </div>
  )
})
