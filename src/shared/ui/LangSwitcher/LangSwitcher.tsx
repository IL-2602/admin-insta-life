import { SelectComponent } from '@/shared/ui/Select'
import { useRouter } from 'next/router'

import s from './LangSwitcher.module.scss'

export const LangSwitcher = () => {
  const { asPath, locale, pathname, push, query } = useRouter()

  const changeLangHandler = (title: string) => {
    const locale = title === 'English' ? 'en' : 'ru'

    push({ pathname, query }, asPath, { locale })
  }

  const languages = [
    {
      title: 'English',
    },
    {
      title: 'Russia',
    },
  ]

  return (
    <div className={s.selectWrapper}>
      <SelectComponent
        currentValue={locale === 'en' ? languages[0] : languages[1]}
        fullWidth
        onValueChange={changeLangHandler}
        selectItems={languages}
      ></SelectComponent>
    </div>
  )
}
