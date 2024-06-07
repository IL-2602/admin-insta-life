import { FC } from 'react'

import { useContainer } from '@/widgets/usersList/local/bubUser/container/useContainer'

import { BubUser } from '../ui/BubUser'

export const Container: FC<BubUserProps> = () => <BubUser {...useContainer()} />

export type BubUserProps = ReturnType<typeof useContainer>
