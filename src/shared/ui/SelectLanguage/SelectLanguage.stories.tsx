import type { Meta, StoryObj } from '@storybook/react'

import Image from 'next/image'

import GBFlag from '../../../../public/gb-flag.svg'
import RUFlag from '../../../../public/ru-flag.svg'
import { SelectLanguage } from './SelectLanguage'

const meta = {
  component: SelectLanguage,
  tags: ['autodocs'],
  title: 'Components/SelectLanguage',
} satisfies Meta<typeof SelectLanguage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    selectItems: [
      {
        icon: <Image alt={'uk flag'} src={GBFlag} />,
        title: 'English',
      },
      {
        icon: <Image alt={'ru flag'} src={RUFlag} />,
        title: 'Russia',
      },
    ],
  },
}
