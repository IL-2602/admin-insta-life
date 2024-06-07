import { FC } from 'react'

import { useContainer } from '@/widgets/auth/signIn/container/useContainer'

import { SignIn } from '../ui/SignIn'

export const Container: FC = () => <SignIn {...useContainer()} />

export type SignInProps = ReturnType<typeof useContainer>
