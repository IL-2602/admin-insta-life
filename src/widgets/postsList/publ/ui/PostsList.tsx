import { forwardRef, useState } from 'react'

import { PostDescription } from '@/shared/components/PostDescription/PostDescription'
import { PostPhotos } from '@/shared/components/PostPhotos/PostPhotos'
import { TimeDifference } from '@/shared/components/TimeDifference/TimeDefference'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal/v2'
import { Search } from '@/shared/ui/Search'
import { SelectComponent } from '@/shared/ui/SelectComponent'
import { SpinnerThreePoints } from '@/shared/ui/SpinnerThreePoints'
import { TextArea } from '@/shared/ui/TextArea'
import { TextField } from '@/shared/ui/Textfield'
import { Typography } from '@/shared/ui/Typography'
import { PostsListProps } from '@/widgets/postsList/publ/container'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './PostsList.module.scss'

import noAvatar from '../../../../../public/noPhoto.svg'
import { BanUserIcon } from '../../../../shared/assets/icons/BanUser'

export const PostsList = forwardRef<HTMLDivElement, PostsListProps>(
  (
    {
      banU,
      banUnbanRemoveUser,
      closeModal,
      handleSearchInput,
      isBanUserModal,
      isLoading,
      openModal,
      openPosts,
      posts,
      setOpenPosts,
      t,
    },
    ref
  ) => {
    const reasonsForBan = [
      `${t.usersList.adminApi.reasons.reasonForBan}`,
      `${t.usersList.adminApi.reasons.badBehavior}`,
      `${t.usersList.adminApi.reasons.advertisingPlacement}`,
      `${t.usersList.adminApi.reasons.anotherReason}`,
    ]

    const [reason, setReason] = useState(reasonsForBan[0])
    const [customReason, setCustomReason] = useState('')
    const isAnotherReason = `${t.usersList.adminApi.reasons.anotherReason}` === reason

    const banReason = () => {
      if (isAnotherReason && customReason) {
        banU(banUnbanRemoveUser.id, customReason)
        clearReason()

        return
      }
      banU(banUnbanRemoveUser.id, reason)
      clearReason()
    }
    const changeReason = (reason: string) => {
      setReason(reason)
    }

    const close = () => {
      closeModal()
      clearReason()
    }
    const clearReason = () => {
      setReason(reasonsForBan[0])
      setCustomReason('')
    }

    return (
      <div className={s.container}>
        <TextField
          className={s.search}
          iconStart={<Search />}
          onChange={handleSearchInput}
          placeholder={'Search'}
        />

        <section className={s.photosWrapper}>
          {posts?.length === 0 && (
            <Typography as={'span'} className={s.noPosts} color={'form'} variant={'regular16'}>
              {t.postsList.noPosts}
            </Typography>
          )}
          {posts?.map(item => {
            return (
              <div className={s.photoWrapper} key={item.id}>
                <PostPhotos
                  className={clsx(
                    s.photo,
                    item.description.length > 105 && openPosts[item.id]
                      ? s.halfPhotoHeight
                      : s.photoHeight
                  )}
                  height={240}
                  id={item.id}
                  ownerId={item.ownerId}
                  photos={item.images?.map(img => img.url!)}
                  width={234}
                />
                <div className={s.avatarWrapper}>
                  <div className={s.avatar}>
                    {item.postOwner.avatars?.length === 0 ? (
                      <Image alt={'noAvatar'} height={22} src={noAvatar} width={22} />
                    ) : (
                      <Image
                        alt={'avatarPhoto'}
                        height={36}
                        src={item.postOwner.avatars ? item.postOwner.avatars[0].url! : ''}
                        width={36}
                      />
                    )}
                  </div>
                  <Typography variant={'h3'}>{item.postOwner.userName}</Typography>
                  <div className={s.banUserIcon}>
                    <BanUserIcon onClick={() => openModal(item.ownerId, item.postOwner.userName)} />
                  </div>
                </div>
                <Typography className={s.time} variant={'small'}>
                  <TimeDifference postTime={item.createdAt} />
                </Typography>
                <PostDescription
                  description={item.description}
                  id={item.id}
                  openPosts={openPosts}
                  setOpenPosts={setOpenPosts}
                />
              </div>
            )
          })}
        </section>
        <div ref={ref}></div>
        {isLoading && (
          <div className={s.fetchSpinner}>
            <SpinnerThreePoints />
          </div>
        )}

        {isBanUserModal && (
          <Modal onOpen={close} open title={`${t.usersList.adminApi.banUserTitle}`}>
            <div className={s.modalContent}>
              <Typography
                variant={'medium16'}
              >{`${t.usersList.adminApi.banUserText} ${banUnbanRemoveUser.name} ?`}</Typography>
              <div className={s.modalSelect}>
                <SelectComponent
                  currentValue={reason}
                  fullWidth
                  onValueChange={changeReason}
                  selectItems={reasonsForBan}
                ></SelectComponent>
                {isAnotherReason && (
                  <TextArea
                    onChange={e => setCustomReason(e.currentTarget.value)}
                    style={{ marginTop: '10px', resize: 'none' }}
                    value={customReason}
                  />
                )}
              </div>
              <div className={s.modalButtons}>
                <Button onClick={close} variant={'primary'}>
                  {t.buttons.no}
                </Button>
                <Button
                  disabled={reason === `${t.usersList.adminApi.reasons.reasonForBan}`}
                  onClick={banReason}
                  variant={'outlined'}
                >
                  {t.buttons.yes}
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    )
  }
)
