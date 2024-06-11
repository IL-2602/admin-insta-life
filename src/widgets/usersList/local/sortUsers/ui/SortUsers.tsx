import { memo } from 'react'

import { SelectComponent } from '@/shared/ui/SelectComponent'
import { SortUsersProps } from '@/widgets/usersList/local/sortUsers/container'

import s from './SortUsers.module.scss'

export const SortUsers = memo(({}: SortUsersProps) => {
  const selectBlockedUsers = ['Blocked', 'Not Blocked']

  return (
    <div className={s.container}>
      <SelectComponent
        className={s.select}
        currentValue={'Not Selected'}
        fullWidth
        selectItems={selectBlockedUsers}
      />
    </div>
  )
})
