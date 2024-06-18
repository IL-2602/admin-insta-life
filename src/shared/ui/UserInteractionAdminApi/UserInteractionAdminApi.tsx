import { HorizontalDots } from '@/shared/assets/icons/HorizontalDots/HorizontalDots'
import { AdminOptions } from '@/shared/ui/AdminOptions/AdminOptions'
import { CustomPopover } from '@/shared/ui/Popover/CustomPopover'
import { ModalType } from '@/widgets/usersList/publ/usersList/container/useContainer'

import s from './UserInteractionAdminApi.module.scss'

export const UserInteractionAdminApi = ({ openModal, user }: Props) => {
  return (
    <>
      <div className={s.postOptions}>
        <CustomPopover
          contentChildren={<AdminOptions openModal={openModal} user={user} />}
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
  openModal: (type: ModalType, userId: number, userName: string) => void
  user: any
}
