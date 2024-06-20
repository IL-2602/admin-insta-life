import { GET_USER } from '@/services/queries/users'
import { GetUserQuery, GetUserQueryVariables } from '@/services/queries/users.generated'
import { useTranslation } from '@/shared/hooks/useTranslation'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const base64password = getFromLocalStorage('base64credentials', '')

  const { t } = useTranslation()

  const { query } = useRouter()

  const { data, loading } = useQuery<GetUserQuery, GetUserQueryVariables>(GET_USER, {
    context: { base64password },
    variables: {
      userId: +query.id!,
    },
  })

  const user = data?.getUser

  return { loading, query, t, user }
}
