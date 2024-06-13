import { GET_USER } from '@/services/queries/users'
import { GetUserQuery, GetUserQueryVariables } from '@/services/queries/users.generated'
import { useTranslation } from '@/shared/hooks/useTranslation'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import { useQuery } from '@apollo/client'

export const useContainer = () => {
  const base64password = getFromLocalStorage('base64credentials', '')

  const { t } = useTranslation()

  const { data, loading } = useQuery<GetUserQuery, GetUserQueryVariables>(GET_USER, {
    context: { base64password },
    variables: {
      userId: 3,
    },
  })

  const user = data?.getUser

  return { loading, t, user }
}
