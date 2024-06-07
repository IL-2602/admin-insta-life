import { memo } from 'react'

import { UploadedProps } from '@/widgets/userInfo/local/uploaded/container'

import s from './Uploaded.module.scss'

export const Uploaded = memo(({}: UploadedProps) => {
  return <div className={s.container}>Uploaded</div>
})
