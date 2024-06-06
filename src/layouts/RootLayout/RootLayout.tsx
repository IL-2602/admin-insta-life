import { PropsWithChildren, ReactElement } from 'react'

import { Container } from '@/shared/ui/Container'
import { NextPage } from 'next'

export const RootLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <header>Header</header>
      <aside>SideBar</aside>
      <main>{children}</main>
    </Container>
  )
}

export const getRootLayout = (page: ReactElement) => <RootLayout>{page}</RootLayout>
