import { FC } from 'react'

import { useContainer } from '@/widgets/userInfo/local/uploaded/container/useContainer'

import { Uploaded } from '../ui/Uploaded'

export const Container: FC = () => <Uploaded {...useContainer()} />

export type UploadedProps = ReturnType<typeof useContainer>
