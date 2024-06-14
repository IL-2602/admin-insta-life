import { useEffect, useState } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import saveToLocalStorage from '@/shared/utils/localStorage/saveToLocalStorage'

export const useContainer = () => {
  const { t } = useTranslation()
  const [tabFromLS, setTabFromLS] = useState('tab1')
  const [selectedTab, setSelectedTab] = useState(tabFromLS)

  const handleTabChange = (value: string) => {
    setSelectedTab(value)
    saveToLocalStorage('selectedTab', value)
  }

  useEffect(() => {
    const storedTab = getFromLocalStorage('selectedTab', 'tab1')

    setTabFromLS(storedTab)

    if (tabFromLS) {
      setSelectedTab(tabFromLS)
    }
  }, [tabFromLS])

  return { handleTabChange, selectedTab, t }
}
