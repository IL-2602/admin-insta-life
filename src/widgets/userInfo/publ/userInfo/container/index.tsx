import { FC } from 'react'

import { useContainer } from '@/widgets/userInfo/publ/userInfo/container/useContainer'

import { UserInfo } from '../ui/UserInfo'

export const Container: FC<UserInfoProps> = () => <UserInfo {...useContainer()} />

export type UserInfoProps = ReturnType<typeof useContainer>
