import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_APOLLO_BASE_API_URL,
})

const wsLink = new WebSocketLink({
  options: {
    reconnect: true,
  },
  uri: process.env.NEXT_PUBLIC_APOLLO_WS_BASE_API_URL!,
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)

    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

const authLink = setContext((_, { base64password, headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Basic ${base64password}`,
    },
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(splitLink),
})

export default client
