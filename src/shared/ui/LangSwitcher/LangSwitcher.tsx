import { useRouter } from 'next/router'

import s from './LangSwitcher.module.scss'

import { SelectLanguage } from '../SelectLanguage'

export const LangSwitcher = () => {
  const { asPath, locale, pathname, push, query } = useRouter()

  const changeLangHandler = (title: string) => {
    const locale = title === 'English' ? 'en' : 'ru'

    void push({ pathname, query }, asPath, { locale })
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
      <SelectLanguage
        currentValue={locale === 'en' ? languages[0] : languages[1]}
        fullWidth
        onValueChange={changeLangHandler}
        selectItems={languages}
      ></SelectLanguage>
    </div>
  )
}
