import { FC } from 'react'

import { useContainer } from '@/widgets/userInfo/local/followers/container/useContainer'

import { Followers } from '../ui/Followers'

export const Container: FC = () => <Followers {...useContainer()} />

export type FollowersProps = ReturnType<typeof useContainer>
