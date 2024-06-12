import { memo } from 'react'

import { SelectComponent } from '@/shared/ui/SelectComponent'
import { FilterUsersProps } from '@/widgets/usersList/local/filterUsers/container'
import { clsx } from 'clsx'

import s from './FilterUsers.module.scss'

export const FilterUsers = memo(
  ({ handleBlockStatus, statusOptions, userBlockStatus }: FilterUsersProps) => {
    return (
      <div className={s.container}>
        <SelectComponent
          className={clsx(s.select, userBlockStatus === 'Not selected' ? s.defaultSelect : '')}
          currentValue={userBlockStatus}
          fullWidth
          onValueChange={handleBlockStatus}
          selectContentClassName={s.content}
          selectItemClassName={s.item}
          selectItems={statusOptions}
        />
      </div>
    )
  }
)
