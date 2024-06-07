import { FC } from 'react'

import { useContainer } from '@/widgets/usersList/local/searchUser/container/useContainer'

import { SearchUser } from '../ui/SearchUser'

export const Container: FC<SearchUserProps> = () => <SearchUser {...useContainer()} />

export type SearchUserProps = ReturnType<typeof useContainer>
