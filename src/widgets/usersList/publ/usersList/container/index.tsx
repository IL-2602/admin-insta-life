import { FC } from 'react'

import { useContainer } from '@/widgets/usersList/publ/usersList/container/useContainer'

import { UsersList } from '../ui/UsersList'

export const Container: FC = () => <UsersList {...useContainer()} />

export type UsersListProps = ReturnType<typeof useContainer>
