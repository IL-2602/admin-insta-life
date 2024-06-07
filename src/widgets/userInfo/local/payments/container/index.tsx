import { FC } from 'react'

import { useContainer } from '@/widgets/userInfo/local/payments/container/useContainer'

import { Payments } from '../ui/Payments'

export const Container: FC<PaymentsProps> = () => <Payments {...useContainer()} />

export type PaymentsProps = ReturnType<typeof useContainer>
