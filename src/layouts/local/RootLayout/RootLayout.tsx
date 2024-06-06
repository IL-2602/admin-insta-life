import { PropsWithChildren, ReactElement } from 'react'

import { AuthLayout } from '@/layouts/local/AuthLayout/AuthLayout'
import { DefaultLayout } from '@/layouts/local/DefualtLayout/DefaultLayout'
import { NextPage } from 'next'

const RootLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const token = '123'

  return token ? <AuthLayout>{children}</AuthLayout> : <DefaultLayout>{children}</DefaultLayout>
}

export const getRootLayout = (page: ReactElement) => <RootLayout>{page}</RootLayout>

export default RootLayout
