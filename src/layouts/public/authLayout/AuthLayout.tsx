import { PropsWithChildren } from 'react'

import { Container } from '@/shared/ui/Container'
import { NextPage } from 'next'

import s from './AuthLayout.module.scss'

import { Header } from '../../local/Header'
import { SideBar } from '../../local/SideBar'

export const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Container className={s.grid}>
      <Header className={s.header} />
      <SideBar className={s.aside} />
      <main className={s.main}>{children}</main>
    </Container>
  )
}
