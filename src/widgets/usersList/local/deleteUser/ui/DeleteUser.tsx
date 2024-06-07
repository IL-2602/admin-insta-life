import { memo } from 'react'

import { DeleteUserProps } from '@/widgets/usersList/local/deleteUser/container'

import s from './DeleteUser.module.scss'

export const DeleteUser = memo(({}: DeleteUserProps) => {
  return <div className={s.container}>Delete User</div>
})
