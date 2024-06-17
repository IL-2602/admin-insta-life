import { useEffect, useState } from 'react'

import { NextPageWithLayout } from '@/pages/_app'
import { ROUTES } from '@/shared/constants/routes'
import { Spinner } from '@/shared/ui/Spinner'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import s from '@/shared/ui/Spinner/Spinner.module.scss'

export const AuthRouteChecker = (Page: NextPageWithLayout) => {
  const Component = ({ pageProps }: AppProps) => {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()

    const getLayout = Page.getLayout ?? (page => page)

    const isAuthenticated = getFromLocalStorage('isAuthenticated', false)

    useEffect(() => {
      setIsAuth(isAuthenticated)
      setIsLoading(false)

      if (router.pathname === ROUTES.AUTH && isAuth) {
        void router.back()
      }
    }, [router, isAuth, isAuthenticated])

    if (isLoading || (router.pathname === ROUTES.AUTH && isAuth)) {
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
