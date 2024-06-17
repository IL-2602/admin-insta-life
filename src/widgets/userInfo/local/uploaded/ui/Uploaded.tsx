import { forwardRef } from 'react'

import { SpinnerThreePoints } from '@/shared/ui/SpinnerThreePoints'
import { UploadedProps } from '@/widgets/userInfo/local/uploaded/container'
import Image from 'next/image'

import s from './Uploaded.module.scss'

export const Uploaded = forwardRef<HTMLDivElement, UploadedProps>(
  ({ isLoading, userPosts }, ref) => {
    return (
      <>
        <div className={s.container}>
          {userPosts?.map(({ url }, id) => {
            return (
              <div className={s.imageContainer} key={id}>
                <Image alt={'photo'} height={228} priority src={url!} width={234} />
              </div>
            )
          })}
        </div>
        <div ref={ref}></div>
        {isLoading && (
          <div className={s.fetchSpinner}>
            <SpinnerThreePoints />
          </div>
        )}
      </>
    )
  }
)
