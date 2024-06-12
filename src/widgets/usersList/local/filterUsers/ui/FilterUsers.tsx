import { memo } from 'react'

import { SelectComponent } from '@/shared/ui/SelectComponent'
import { FilterUsersProps } from '@/widgets/usersList/local/filterUsers/container'

import s from './FilterUsers.module.scss'

export const FilterUsers = memo(({ t }: FilterUsersProps) => {
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
