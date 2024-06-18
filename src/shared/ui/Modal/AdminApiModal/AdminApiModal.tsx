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
  t: any
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
  t,
  unbanUser,
}: Props) => {
  return (
    <>
      {isBanUserModal && (
        <Modal onOpen={closeModal} open title={`${t.usersList.adminApi.banUserTitle}`}>
          <div className={s.modalContent}>
            <Typography
              variant={'medium16'}
            >{`${t.usersList.adminApi.banUserText} ${banUnbanRemoveUser.name} ?`}</Typography>
            <div className={s.modalButtons}>
              <Button onClick={closeModal} variant={'primary'}>
                {t.buttons.no}
              </Button>
              <Button onClick={() => banUser(banUnbanRemoveUser.id)} variant={'outlined'}>
                {t.buttons.yes}
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {isUnbanUserModal && (
        <Modal onOpen={closeModal} open title={`${t.usersList.adminApi.unbanUserTitle}`}>
          <div className={s.modalContent}>
            <Typography
              variant={'medium16'}
            >{`${t.usersList.adminApi.unbanUserText} ${banUnbanRemoveUser.name} ?`}</Typography>
            <div className={s.modalButtons}>
              <Button onClick={() => unbanUser(banUnbanRemoveUser.id)} variant={'primary'}>
                {t.buttons.yes}
              </Button>
              <Button onClick={closeModal} variant={'outlined'}>
                {t.buttons.no}
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {isDeleteUserModal && (
        <Modal onOpen={closeModal} open title={`${t.usersList.adminApi.deleteUserTitle}`}>
          <div className={s.modalContent}>
            <Typography
              variant={'medium16'}
            >{`${t.usersList.adminApi.deleteUserText} ${banUnbanRemoveUser.name} ?`}</Typography>
            <div className={s.modalButtons}>
              <Button onClick={closeModal} variant={'primary'}>
                {t.buttons.no}
              </Button>
              <Button onClick={() => deleteUser(banUnbanRemoveUser.id)} variant={'outlined'}>
                {t.buttons.yes}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
