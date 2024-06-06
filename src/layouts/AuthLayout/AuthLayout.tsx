import { PropsWithChildren, ReactElement } from 'react'

import { Container } from '@/shared/ui/Container'
import { NextPage } from 'next'

import s from './AuthLayout.module.scss'

export const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Container className={s.grid}>
      <header className={s.header}>Header</header>
      <aside className={s.aside}>SideBar</aside>
      <main className={s.main}>{children}</main>
    </Container>
  )
}
