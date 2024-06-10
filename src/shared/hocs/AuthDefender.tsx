import { useEffect, useState } from 'react'

import { NextPageWithLayout } from '@/pages/_app'
import { ROUTES } from '@/shared/constans/routes'
import { Spinner } from '@/shared/ui/Spinner'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import s from '@/shared/ui/Spinner/Spinner.module.scss'

export const AuthDefender = (Page: NextPageWithLayout) => {
  const Component = ({ pageProps }: AppProps) => {
    const [isAuth, setIsAuth] = useState<boolean>(true)

    const router = useRouter()

    const getLayout = Page.getLayout ?? (page => page)

    const isAuthenticated = getFromLocalStorage('isAuthenticated', false)

    useEffect(() => {
      setIsAuth(isAuthenticated)

      if (!isAuth) {
        void router.push(ROUTES.AUTH)
      }
    }, [router, isAuth, isAuthenticated])

    if (router.pathname !== ROUTES.AUTH && !isAuth) {
      return (
        <div className={s.defaultSpinner}>
          <Spinner />
        </div>
      )
    }

    return getLayout(<Page {...pageProps} />)
  }

  return Component
}
