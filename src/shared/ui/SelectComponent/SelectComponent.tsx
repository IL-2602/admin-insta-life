import { useState } from 'react'

import { SelectToggle } from '@/shared/assets/icons/SelectToggle'
import { Typography } from '@/shared/ui/Typography'
import * as Select from '@radix-ui/react-select'

import s from './SelectComponent.module.scss'

type SelectPropsType = {
  className?: string
  currentValue?: string
  fullWidth?: boolean
  onValueChange?: (value: string) => void
  optionTextVariant?:
    | 'body1'
    | 'body2'
    | 'caption'
    | 'error'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'label'
    | 'large'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
  selectItems?: Array<string>
  values?: Array<string>
}

const defaultSelectItems = ['select1', 'select2', 'select3']

export const SelectComponent = ({
  className,
  currentValue,
  fullWidth,
  onValueChange,
  selectItems = defaultSelectItems,
}: SelectPropsType) => {
  const [value, setValue] = useState(selectItems[0])
  const [isOpen, setIsOpen] = useState(false)

  const localCurrentValue = currentValue ? currentValue : value
  const localOnValueChange = onValueChange ? onValueChange : setValue

  return (
    <Select.Root
      onOpenChange={() => setIsOpen(prevState => !prevState)}
      onValueChange={localOnValueChange}
      value={localCurrentValue}
    >
      <Select.Trigger className={`${s.selectTrigger} ${className} ${fullWidth ? s.fullWidth : ''}`}>
        <Select.Value defaultValue={localCurrentValue}>
          <Typography variant={'regular14'}>{localCurrentValue}</Typography>
        </Select.Value>
        <Select.Icon>
          <SelectToggle className={isOpen ? s.arrowDown : ''} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content className={s.selectContent} position={'popper'}>
        {selectItems?.map((el, i) => {
          return (
            <Select.Item className={s.selectItem} key={i} value={el}>
              <Select.ItemText>
                <Typography variant={'regular14'}>{el}</Typography>
              </Select.ItemText>
            </Select.Item>
          )
        })}
      </Select.Content>
    </Select.Root>
  )
}
