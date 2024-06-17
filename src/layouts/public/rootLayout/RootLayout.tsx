import {PropsWithChildren, ReactElement, useEffect, useState} from 'react'

import { AuthLayout } from '@/layouts/public/authLayout/AuthLayout'
import { DefaultLayout } from '@/layouts/public/defualtLayout/DefaultLayout'
import getFromLocalStorage from "@/shared/utils/localStorage/getFromLocalStorage";
import { NextPage } from 'next'

const RootLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  const isAuthenticated = getFromLocalStorage('isAuthenticated', null)

  useEffect(() => {

  if(isAuthenticated) {
    setIsAuth(isAuthenticated)
  }

  }, [isAuthenticated]);

  return isAuth ? <AuthLayout>{children}</AuthLayout> : <DefaultLayout>{children}</DefaultLayout>
}

export const getRootLayout = (page: ReactElement) => <RootLayout>{page}</RootLayout>

export default RootLayout
