import { PropsWithChildren } from 'react'

import { Container } from '@/shared/ui/Container'
import { NextPage } from 'next'

import s from './DefaultLayout.module.scss'

import { Header } from '../../local/Header'

export const DefaultLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Container className={s.grid}>
      <Header className={s.header} />
      <main className={s.main}>{children}</main>
    </Container>
  )
}
