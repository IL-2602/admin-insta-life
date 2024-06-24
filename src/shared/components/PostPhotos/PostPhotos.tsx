import { useState } from 'react'

import { NextPostPhotoArrow } from '@/shared/assets/icons/NextPostPhotoArrow/NextPostPhotoArrow'
import { PrevPostPhotoArrow } from '@/shared/assets/icons/PrevPostPhotoArrow/PrevPostPhotoArrow'
import { Button } from '@/shared/ui/Button'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './PostPhotos.module.scss'

type Props = {
  className?: string
  height: number
  id: number
  ownerId: number
  photos: Array<string> | undefined
  width: number
}

export const PostPhotos = ({ height, id, ownerId, photos, width, ...rest }: Props) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const goToNextPhoto = () => {
    setCurrentPhotoIndex(prevIndex => prevIndex + 1)
  }

  const goToPrevPhoto = () => {
    setCurrentPhotoIndex(prevIndex => prevIndex - 1)
  }

  if (!photos) {
    return null
  }

  const isFirstPhoto = currentPhotoIndex === 0
  const isLastPhoto = photos.length - 1 === currentPhotoIndex

  return (
    <div className={s.photosWrapper}>
      <Image
        alt={'photo'}
        height={height}
        src={photos[currentPhotoIndex]}
        width={width}
        {...rest}
      />
      {photos.length > 1 && (
        <>
          <Button
            className={clsx(s.btn, s.prevBtn)}
            disabled={isFirstPhoto}
            onClick={goToPrevPhoto}
            variant={'noStyle'}
          >
            <PrevPostPhotoArrow className={s.prevArrow} />
          </Button>
          <Button
            className={clsx(s.btn, s.nextBtn)}
            disabled={isLastPhoto}
            onClick={goToNextPhoto}
            variant={'noStyle'}
          >
            <NextPostPhotoArrow className={s.nextArrow} />
          </Button>
          <div className={s.photoScale}>
            {photos.map((photo, index) => (
              <span
                className={clsx(s.circle, currentPhotoIndex === index ? s.circlePrimary : '')}
                key={index}
              ></span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
