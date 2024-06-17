import { FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { LOGIN_ADMIN } from '@/services/queries/admin'
import { GET_USERS } from '@/services/queries/users'
import { usersSlice } from '@/services/usersService/store/slice/users.slice'
import { ROUTES } from '@/shared/constans/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import saveToLocalStorage from '@/shared/utils/localStorage/saveToLocalStorage'
import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const useContainer = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const signInSchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  type signInFormSchema = z.infer<typeof signInSchema>

  const {
    control,
    formState: {},
    watch,
  } = useForm<signInFormSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(signInSchema),
  })

  const email = watch('email')
  const password = watch('password')

  const [login, { loading }] = useMutation(LOGIN_ADMIN)

  const isDisabled = !email || !password || loading

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    dispatch(usersSlice.actions.searchUsers(''))

    const { data } = await login({
      refetchQueries: [
        {
          context: { base64password: btoa(`${email}:${password}`) },
          query: GET_USERS,
        },
      ],
      variables: {
        email,
        password,
      },
    })

    if (data.loginAdmin.logged) {
      saveToLocalStorage('base64credentials', btoa(`${email}:${password}`))
      saveToLocalStorage('isAuthenticated', true)

      void router.push(ROUTES.USERS)
    } else {
      toast.error(t.auth.error, {
        pauseOnHover: false,
        style: {
          background: '#660A1D',
          border: '1px solid #CC1439',
          color: 'white',
          fontSize: '14px',
        },
      })
    }
  }

  return { control, isDisabled, loading, onSubmit, t }
}
