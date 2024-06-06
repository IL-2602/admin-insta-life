import { PaymentsIcon } from '@/shared/assets/icons/Payments'
import { PersonIcon } from '@/shared/assets/icons/Person'
import { StatisticsIcon } from '@/shared/assets/icons/Statistics'
import { ROUTES } from '@/shared/constans/routes'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './SideBar.module.scss'

import { NoCoverIcon } from '../../assets/icons/NoCover'

type Props = {
  className?: string
}
export const SideBar = ({ className }: Props) => {
  const classNames = {
    link: (route: string) => clsx(s.link, pathname.startsWith(route) && s.active),
    sidebar: clsx(s.aside, className),
  }
  const { pathname } = useRouter()

  return (
    <ul className={classNames.sidebar}>
      <li>
        <Link className={classNames.link(ROUTES.USERS)} href={ROUTES.USERS}>
          <PersonIcon />
          <Typography variant={'bold14'}>Users list</Typography>
        </Link>
      </li>
      <li>
        <Link className={classNames.link(ROUTES.STATISTICS)} href={ROUTES.STATISTICS}>
          <StatisticsIcon />
          <Typography variant={'bold14'}>Statistics</Typography>
        </Link>
      </li>
      <li>
        <Link className={classNames.link(ROUTES.PAYMENTS)} href={ROUTES.PAYMENTS}>
          <PaymentsIcon />
          <Typography variant={'bold14'}>Payments list</Typography>
        </Link>
      </li>
      <li>
        <Link className={classNames.link(ROUTES.POSTS)} href={ROUTES.POSTS}>
          <NoCoverIcon />
          <Typography variant={'bold14'}>Posts list</Typography>
        </Link>
      </li>
    </ul>
  )
}
