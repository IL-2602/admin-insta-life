import { FC } from 'react'

import { useContainer } from '@/widgets/userInfo/local/following/container/useContainer'

import { Following } from '../ui/Following'

export const Container: FC<FollowingProps> = () => <Following {...useContainer()} />

export type FollowingProps = ReturnType<typeof useContainer>
