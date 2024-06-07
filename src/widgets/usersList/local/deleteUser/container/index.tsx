import { FC } from 'react'

import { useContainer } from '@/widgets/usersList/local/deleteUser/container/useContainer'

import { DeleteUser } from '../ui/DeleteUser'

export const Container: FC<DeleteUserProps> = () => <DeleteUser {...useContainer()} />

export type DeleteUserProps = ReturnType<typeof useContainer>
