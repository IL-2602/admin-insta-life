import { PropsWithChildren, ReactElement } from 'react'

import { Header } from '@/shared/components/Header'
import { Container } from '@/shared/ui/Container'
import { NextPage } from 'next'

import s from './DefaultLayout.module.scss'

export const DefaultLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Container className={s.grid}>
      <Header className={s.header} isAuth={false} />
      <main className={s.main}>{children}</main>
    </Container>
  )
}
