import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal/v2'
import { Typography } from '@/shared/ui/Typography'

import s from './AdminModal.module.scss'

type Props = {
  banUnbanRemoveUser: { id: number; name: string }
  banUser: (id: number, reason?: string) => void
  closeModal: () => void
  deleteUser: (id: number) => void
  isBanUserModal: boolean
  isDeleteUserModal: boolean
  isUnbanUserModal: boolean
  unbanUser: (id: number) => void
}

export const AdminApiModal = ({
  banUnbanRemoveUser,
  banUser,
  closeModal,
  deleteUser,
  isBanUserModal,
  isDeleteUserModal,
  isUnbanUserModal,
  unbanUser,
}: Props) => {
  return (
    <>
      {isBanUserModal && (
        <Modal onOpen={closeModal} open title={'Ban User'}>
          <div className={s.modalContent}>
            <Typography
              variant={'medium16'}
            >{`Are you sure to ban this user, ${banUnbanRemoveUser.name} ?`}</Typography>
            <div className={s.modalButtons}>
              <Button onClick={() => banUser(banUnbanRemoveUser.id)} variant={'primary'}>
                Yes
              </Button>
              <Button onClick={closeModal} variant={'outlined'}>
                No
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {isUnbanUserModal && (
        <Modal onOpen={closeModal} open title={'Unban User'}>
          <div className={s.modalContent}>
            <Typography
              variant={'medium16'}
            >{`Are you sure to unban this user, ${banUnbanRemoveUser.name} ?`}</Typography>
            <div className={s.modalButtons}>
              <Button onClick={() => unbanUser(banUnbanRemoveUser.id)} variant={'primary'}>
                Yes
              </Button>
              <Button onClick={closeModal} variant={'outlined'}>
                No
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {isDeleteUserModal && (
        <Modal onOpen={closeModal} open title={'Delete User'}>
          <div className={s.modalContent}>
            <Typography
              variant={'medium16'}
            >{`Are you sure to delete user ${banUnbanRemoveUser.name} ?`}</Typography>
            <div className={s.modalButtons}>
              <Button onClick={() => deleteUser(banUnbanRemoveUser.id)} variant={'primary'}>
                Yes
              </Button>
              <Button onClick={closeModal} variant={'outlined'}>
                No
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
