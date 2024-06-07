import { FC } from 'react'

import { useContainer } from '@/widgets/userInfo/local/followers/container/useContainer'

import { Followers } from '../ui/Followers'

export const Container: FC<FollowersProps> = () => <Followers {...useContainer()} />

export type FollowersProps = ReturnType<typeof useContainer>
