import { FC } from 'react'

import { useContainer } from '@/widgets/usersList/local/searchUser/container/useContainer'

import { SearchUser } from '../ui/SearchUser'

export const Container: FC = () => <SearchUser {...useContainer()} />

export type SearchUserProps = ReturnType<typeof useContainer>

// import { FC } from 'react'
//
// import { useContainer } from '@/widgets/usersList/publ/usersList/container/useContainer'
//
// import { UsersList } from '../ui/UsersList'
//
// export const Container: FC = () => <UsersList {...useContainer()} />
//
// export type UsersListProps = ReturnType<typeof useContainer>
