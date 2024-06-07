import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'

import { NextPage } from 'next'

import client from '@/services/apollo-client'
import { ApolloProvider } from '@apollo/client'

import '@/styles/index.scss'

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
      getLayout(<Component {...pageProps} />)
    </ApolloProvider>
  )
}
