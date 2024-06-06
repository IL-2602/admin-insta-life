import { memo } from 'react'

import { ROUTES } from '@/shared/constans/routes'
import { Container } from '@/shared/ui/Container'
import { LangSwitcher } from '@/shared/ui/LangSwitcher'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'
import Link from 'next/link'

import s from './Header.module.scss'

type Props = {
  className: string
  isAuth?: boolean
}

export const Header = memo(({ className, isAuth }: Props) => {
  const headerStyle = clsx(s.header, className)

  return (
    <header className={headerStyle}>
      <Container className={s.container}>
        <Link className={s.logo} href={ROUTES.DEFAULT}>
          <Typography color={'light'} variant={'h1'}>
            InstaLife
          </Typography>
          <Typography color={'light'} variant={'small'}>
            superadmin
          </Typography>
        </Link>
        <div className={s.wrapper}>
          {isAuth ? (
            <div className={s.meContainer}>
              <LangSwitcher />
            </div>
          ) : (
            <div className={s.notMeContainer}>
              <LangSwitcher />
            </div>
          )}
        </div>
      </Container>
    </header>
  )
})
