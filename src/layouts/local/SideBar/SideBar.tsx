import { NoCoverIcon } from '@/shared/assets/icons/NoCover'
import { PaymentsIcon } from '@/shared/assets/icons/Payments'
import { PersonIcon } from '@/shared/assets/icons/Person'
import { StatisticsIcon } from '@/shared/assets/icons/Statistics'
import { ROUTES } from '@/shared/constans/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { LogOutIcon } from '@/shared/ui/LogOutIcon'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './SideBar.module.scss'

type Props = {
  className?: string
}
export const SideBar = ({ className }: Props) => {
  const classNames = {
    link: (route: string) => clsx(s.link, pathname.startsWith(route) && s.active),
    sidebar: clsx(s.aside, className),
  }

  const { pathname, push } = useRouter()
  const { t } = useTranslation()

  const handleLogOut = () => {
    localStorage.clear()
    void push(ROUTES.AUTH)
  }

  return (
    <ul className={classNames.sidebar}>
      <li>
        <Link className={classNames.link(ROUTES.USERS)} href={ROUTES.USERS}>
          <PersonIcon />
          <Typography variant={'bold14'}>{t.sidebar.usersList}</Typography>
        </Link>
      </li>
      <li>
        <Link className={classNames.link(ROUTES.STATISTICS)} href={ROUTES.STATISTICS}>
          <StatisticsIcon />
          <Typography variant={'bold14'}>{t.sidebar.statistics}</Typography>
        </Link>
      </li>
      <li>
        <Link className={classNames.link(ROUTES.PAYMENTS)} href={ROUTES.PAYMENTS}>
          <PaymentsIcon />
          <Typography variant={'bold14'}>{t.sidebar.paymentsList}</Typography>
        </Link>
      </li>
      <li>
        <Link className={classNames.link(ROUTES.POSTS)} href={ROUTES.POSTS}>
          <NoCoverIcon />
          <Typography variant={'bold14'}>{t.sidebar.postsList}</Typography>
        </Link>
      </li>
      <Button className={s.btnLogOut} onClick={handleLogOut} variant={'noStyle'}>
        <LogOutIcon className={s.logOutIcon} />
        <Typography color={'light'} variant={'bold14'}>
          {t.sidebar.logout}
        </Typography>
      </Button>
    </ul>
  )
}
