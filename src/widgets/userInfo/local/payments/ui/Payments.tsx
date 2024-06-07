import { memo } from 'react'

import { PaymentsProps } from '@/widgets/userInfo/local/payments/container'

import s from './Payments.module.scss'

export const Payments = memo(({}: PaymentsProps) => {
  return <div className={s.container}>Payments</div>
})
