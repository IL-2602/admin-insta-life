import { memo } from 'react'

import { Followers } from '@/widgets/userInfo/local/followers'
import { Following } from '@/widgets/userInfo/local/following'
import { Payments } from '@/widgets/userInfo/local/payments'
import { Uploaded } from '@/widgets/userInfo/local/uploaded'
import { UserInfoHeader } from '@/widgets/userInfo/local/userInfoHeader'
import { UserInfoProps } from '@/widgets/userInfo/publ/userInfo/container'
import * as Tabs from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './UserInfo.module.scss'

export const UserInfo = memo(({ handleTabChange, selectedTab }: UserInfoProps) => {
  return (
    <>
      <UserInfoHeader.widget />
      <Tabs.Root className={s.tabsRoot} defaultValue={selectedTab}>
        <Tabs.List aria-label={'User Info'} className={s.tabsList}>
          <Tabs.Trigger
            className={clsx(s.tabsTrigger, selectedTab === 'tab1' ? s.active : '')}
            onClick={() => handleTabChange('tab1')}
            value={'tab1'}
          >
            Uploaded Files
          </Tabs.Trigger>
          <Tabs.Trigger
            className={clsx(s.tabsTrigger, selectedTab === 'tab2' ? s.active : '')}
            onClick={() => handleTabChange('tab2')}
            value={'tab2'}
          >
            Payments
          </Tabs.Trigger>
          <Tabs.Trigger
            className={clsx(s.tabsTrigger, selectedTab === 'tab3' ? s.active : '')}
            onClick={() => handleTabChange('tab3')}
            value={'tab3'}
          >
            Followers
          </Tabs.Trigger>
          <Tabs.Trigger
            className={clsx(s.tabsTrigger, selectedTab === 'tab4' ? s.active : '')}
            onClick={() => handleTabChange('tab4')}
            value={'tab4'}
          >
            Following
          </Tabs.Trigger>
        </Tabs.List>
        {selectedTab === 'tab1' && <Uploaded.widget />}
        {selectedTab === 'tab2' && <Payments.widget />}
        {selectedTab === 'tab3' && <Followers.widget />}
        {selectedTab === 'tab4' && <Following.widget />}
      </Tabs.Root>
    </>
  )
})
