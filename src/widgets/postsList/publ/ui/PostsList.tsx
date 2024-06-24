import { memo } from 'react'

import { PostDescription } from '@/shared/components/PostDescription/PostDescription'
import { PostPhotos } from '@/shared/components/PostPhotos/PostPhotos'
import { TimeDifference } from '@/shared/components/TimeDifference/TimeDefference'
import { Search } from '@/shared/ui/Search'
import { Spinner } from '@/shared/ui/Spinner'
import { TextField } from '@/shared/ui/Textfield'
import { Typography } from '@/shared/ui/Typography'
import { PostsListProps } from '@/widgets/postsList/publ/container'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './PostsList.module.scss'

import noAvatar from '../../../../../public/noPhoto.svg'

export const PostsList = memo(
  ({ handleSearchInput, loading, openPosts, posts, setOpenPosts }: PostsListProps) => {
    return (
      <div className={s.container}>
        <TextField
          className={s.search}
          iconStart={<Search />}
          onChange={handleSearchInput}
          placeholder={'Search'}
        />

        <section className={clsx(!loading ? s.photosWrapper : s.spinner)}>
          {loading && <Spinner />}
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
      </div>
    )
  }
)
