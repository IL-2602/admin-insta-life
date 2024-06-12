import { FC } from 'react'

import { useContainer } from '@/widgets/usersList/local/filterUsers/container/useContainer'

import { FilterUsers } from '../ui/FilterUsers'

export const Container: FC = () => <FilterUsers {...useContainer()} />

export type FilterUsersProps = ReturnType<typeof useContainer>
