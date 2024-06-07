import { FC } from 'react'

import { useContainer } from '@/widgets/usersList/local/sortUsers/container/useContainer'

import { SortUsers } from '../ui/SortUsers'

export const Container: FC<SortUsersProps> = () => <SortUsers {...useContainer()} />

export type SortUsersProps = ReturnType<typeof useContainer>
