import { memo } from 'react'

import { ROUTES } from '@/shared/constans/routes'
import { LangSwitcher } from '@/shared/ui/LangSwitcher'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'
import Link from 'next/link'

import s from './Header.module.scss'

type Props = {
  className: string
}

export const Header = memo(({ className }: Props) => {
  const headerStyle = clsx(s.header, className)

  return (
    <header className={headerStyle}>
      <Link className={s.logo} href={ROUTES.DEFAULT}>
        <Typography color={'light'} variant={'h1'}>
          InstaLife
        </Typography>
        <Typography color={'light'} variant={'small'}>
          superadmin
        </Typography>
      </Link>
      <LangSwitcher />
    </header>
  )
})
