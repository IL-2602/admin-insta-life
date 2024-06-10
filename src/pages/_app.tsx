import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import client from '@/services/apollo-client'
import { Cross } from '@/shared/assets/icons/Cross'
import { Button } from '@/shared/ui/Button'
import { ApolloProvider } from '@apollo/client'
import { NextPage } from 'next'

import '@/styles/index.scss'
import 'react-toastify/dist/ReactToastify.css'

export type NextPageWithLayout<P = {}> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <ApolloProvider client={client}>
      <ToastContainer
        autoClose={3000}
        closeButton={({ closeToast }) => (
          <Button
            className={'closeBtnToast'}
            onClick={closeToast}
            type={'button'}
            variant={'noStyle'}
          >
            <Cross />
          </Button>
        )}
        position={'bottom-left'}
      />
      {getLayout(<Component {...pageProps} />)}
    </ApolloProvider>
  )
}
