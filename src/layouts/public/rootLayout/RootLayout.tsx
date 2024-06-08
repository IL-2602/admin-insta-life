import { PropsWithChildren, ReactElement } from 'react'

import { AuthLayout } from '@/layouts/public/authLayout/AuthLayout'
import { DefaultLayout } from '@/layouts/public/defualtLayout/DefaultLayout'
import { NextPage } from 'next'

const RootLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const token = '123'

  return token ? <AuthLayout>{children}</AuthLayout> : <DefaultLayout>{children}</DefaultLayout>
}

export const getRootLayout = (page: ReactElement) => <RootLayout>{page}</RootLayout>

export default RootLayout
