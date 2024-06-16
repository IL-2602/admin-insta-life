import { HorizontalDots } from '@/shared/assets/icons/HorizontalDots/HorizontalDots'
import { AdminOptions } from '@/shared/ui/AdminOptions/AdminOptions'
import { CustomPopover } from '@/shared/ui/Popover/CustomPopover'

import s from './UserInteractionAdminApi.module.scss'

export const UserInteractionAdminApi = ({ banUser, deleteUser, unbanUser, user }: Props) => {
  return (
    <>
      <div className={s.postOptions}>
        <CustomPopover
          contentChildren={
            <AdminOptions
              banUser={banUser}
              deleteUser={deleteUser}
              unbanUser={unbanUser}
              user={user}
            />
          }
          icon={
            <div style={{ position: 'relative' }}>
              <HorizontalDots />
            </div>
          }
        />
      </div>
    </>
  )
}

type Props = {
  banUser: (id: number) => void
  deleteUser: (id: number) => void
  unbanUser: (id: number) => void
  user: any
}
