import { memo } from 'react'

import { GET_USER } from '@/services/queries/users'
import { GetUserQuery, GetUserQueryVariables } from '@/services/queries/users.generated'
import { SignInProps } from '@/widgets/auth/signIn/container'
import { useQuery } from '@apollo/client'

export const SignIn = memo(({}: SignInProps) => {
  const { data } = useQuery<GetUserQuery, GetUserQueryVariables>(GET_USER, {
    variables: { userId: 3 },
  })

  if (!data) {
    return null
  }

  return (
    <div>
      <span>email: {data.getUser.email}</span>
      <hr></hr>
      <span>userId: {data.getUser.id}</span>
    </div>
  )
})
