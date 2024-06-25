import { ComponentProps, ComponentPropsWithoutRef, FC } from 'react'

import { ChevronSortDown } from '@/shared/assets/icons/ChevronSortDown'
import { ChevronsSort } from '@/shared/assets/icons/ChevronsSort'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { ChevronDownIcon, ChevronUpIcon } from '@storybook/icons'
import { clsx } from 'clsx'

import s from './Table.module.scss'
export type RootProps = ComponentPropsWithoutRef<'table'>
export type HeadProps = ComponentPropsWithoutRef<'thead'>
export type BodyProps = ComponentPropsWithoutRef<'tbody'>
export type RowProps = ComponentPropsWithoutRef<'tr'>
export type HeadCellProps = {
  name?: string
  onSort?: (sort: HeadCellSort | null) => void
  sort?: HeadCellSort
} & ComponentPropsWithoutRef<'th'>
export type HeadCellSort = {
  direction: 'Asc' | 'Desc'
  key: string
}
export type CellProps = ComponentPropsWithoutRef<'td'>

export const Root: FC<RootProps> = ({ className, ...rest }) => {
  const classNames = {
    table: clsx(className, s.table),
  }

  return <table className={classNames.table} {...rest} />
}

export const Head: FC<HeadProps> = ({ className, ...rest }) => {
  const classNames = {
    tableHead: clsx(className, s.tableHead),
  }

  return <thead className={classNames.tableHead} {...rest} />
}

export const Body: FC<BodyProps> = props => {
  return <tbody {...props} />
}

export const Row: FC<RowProps> = props => {
  return <tr {...props} />
}

export const HeadCell: FC<HeadCellProps> = ({
  children,
  className,
  name,
  onSort,
  sort,
  ...rest
}) => {
  const classNames = {
    headCell: clsx(className, s.headCell),
  }

  const onClickSortHandler = (key: string, direction: 'Asc' | 'Desc' | null) => {
    if (!onSort) {
      return
    }
    if (key !== sort?.key) {
      return onSort({
        direction: 'Asc',
        key,
      })
    }

    switch (direction) {
      case 'Asc': {
        return onSort({
          direction: 'Desc',
          key,
        })
      }
      case 'Desc': {
        return onSort(null)
      }
      default:
        return onSort({
          direction: 'Asc',
          key,
        })
    }
  }

  const sortIcon = () => {
    if (sort?.key === name) {
      switch (sort?.direction) {
        case 'Asc': {
          return <ChevronSortDown />
        }
        case 'Desc': {
          return <ChevronSortDown className={s.chevronUp} />
        }

        default:
          return <ChevronsSort />
      }
    }

    return <ChevronsSort />
  }

  if (sort && name) {
    return (
      <th className={classNames.headCell} {...rest}>
        <Button
          className={s.sortableButton}
          onClick={() => onClickSortHandler(name, sort?.direction)}
          variant={'noStyle'}
        >
          <Typography variant={'bold14'}>{children}</Typography>
          {sortIcon()}
        </Button>
      </th>
    )
  }

  return (
    <th className={classNames.headCell} {...rest}>
      {children}
    </th>
  )
}

export const Cell: FC<CellProps> = ({ className, ...rest }) => {
  const classNames = {
    cell: clsx(className, s.tableCell),
  }

  return <td className={classNames.cell} {...rest} />
}

export const Empty: FC<{ mb?: string; mt?: string } & ComponentProps<'div'>> = ({
  className,
  mb,
  mt = '89px',
}) => {
  const classNames = {
    empty: clsx(className, s.empty),
  }

  return (
    <Typography
      className={classNames.empty}
      style={{ marginBottom: mb, marginTop: mt }}
      variant={'h2'}
    >
      There is no data here yet! :(
    </Typography>
  )
}

export const Table = {
  Body,
  Cell,
  Empty,
  Head,
  HeadCell,
  Root,
  Row,
}
