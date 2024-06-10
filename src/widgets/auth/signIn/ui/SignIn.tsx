import { memo } from 'react'

import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Spinner } from '@/shared/ui/Spinner'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextField } from '@/shared/ui/controlledInsta/ControlledTextField/ControlledTextField'
import { SignInProps } from '@/widgets/auth/signIn/container'

import s from './SignIn.module.scss'

export const SignIn = memo(({ control, isDisabled, loading, onSubmit, t }: SignInProps) => {
  return (
    <Card className={s.container}>
      <Typography className={s.title} variant={'h1'}>
        {t.auth.title}
      </Typography>
      <form onSubmit={onSubmit}>
        <ControlledTextField
          className={s.email}
          control={control}
          label={t.auth.labelEmail}
          name={'email'}
          placeholder={'Epam@epam.com'}
        />
        <ControlledTextField
          className={s.pass}
          control={control}
          label={t.auth.labelPassword}
          name={'password'}
          placeholder={'**********'}
          type={'password'}
        />
        <div className={s.error}>
          <Button className={s.button} disabled={isDisabled} fullWidth>
            <Typography as={'h3'}>{loading ? <Spinner /> : t.auth.submit}</Typography>
          </Button>
        </div>
      </form>
    </Card>
  )
})
