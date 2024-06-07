import { FC } from 'react'

import { useContainer } from '@/widgets/userInfo/local/userInfoHeader/container/useContainer'

import { UserInfoHeader } from '../ui/UserInfoHeader'

export const Container: FC<UserInfoHeaderProps> = () => <UserInfoHeader {...useContainer()} />

export type UserInfoHeaderProps = ReturnType<typeof useContainer>
