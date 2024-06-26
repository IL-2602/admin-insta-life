import { FC } from 'react'

import { useContainer } from '@/widgets/paymentsList/publ/paymentsList/container/useContainer'

import { PaymentsList } from '../ui/PaymentsList'

export const Container: FC = () => <PaymentsList {...useContainer()} />

export type PaymentsListProps = ReturnType<typeof useContainer>
