import { PropsWithChildren } from 'react'

import { Header } from '@/shared/components/Header'
import { SideBar } from '@/shared/components/SideBar'
import { Container } from '@/shared/ui/Container'
import { NextPage } from 'next'

import s from './AuthLayout.module.scss'

export const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Container className={s.grid}>
      <Header className={s.header} />
      <SideBar className={s.aside} />
      <main className={s.main}>{children}</main>
    </Container>
  )
}
