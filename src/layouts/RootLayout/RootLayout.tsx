import { PropsWithChildren, ReactElement } from 'react'

import { AuthLayout } from '@/layouts/AuthLayout/AuthLayout'
import { DefaultLayout } from '@/layouts/DefualtLayout/DefaultLayout'
import { NextPage } from 'next'

const RootLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const token = ''

  return token ? <AuthLayout>{children}</AuthLayout> : <DefaultLayout>{children}</DefaultLayout>
}

export const getRootLayout = (page: ReactElement) => <RootLayout>{page}</RootLayout>

export default RootLayout
