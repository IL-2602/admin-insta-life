import type { AppProps } from 'next/app'

import client from '@/services/apollo-client'
import { ApolloProvider } from '@apollo/client'

import '@/styles/index.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
