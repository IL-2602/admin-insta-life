import { FC } from 'react'

import { useContainer } from '@/widgets/usersList/local/bunUser/container/useContainer'

import { BunUser } from '../ui/BunUser'

export const Container: FC<BunUserProps> = () => <BunUser {...useContainer()} />

export type BunUserProps = ReturnType<typeof useContainer>
