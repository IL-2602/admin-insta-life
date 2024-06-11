import { Button } from '@/shared/ui/Button'
import { LeftArrow } from '@/shared/ui/LeftArrow'
import { RightArrow } from '@/shared/ui/RightArrow'
import { SelectComponent } from '@/shared/ui/SelectComponent'
import { Typography } from '@/shared/ui/Typography'
import { INITIAL_PAGE_NUMBER } from '@/widgets/usersList/publ/usersList/constants/constants'
import { clsx } from 'clsx'

import s from './Pagination.module.scss'

type Props = {
  currentPage: number
  currentSize: string
  handlePageNumber: (pageNumber: number) => void
  handlePageSize: (pageSize: string) => void
  pagesCount: number
  totalCount: number
}

export const Pagination = ({
  currentPage,
  currentSize,
  handlePageNumber,
  handlePageSize,
  pagesCount,
  totalCount,
}: Props) => {
  const pageSizes = ['10', '20', '30', '50', `${totalCount}`]

  const pageNumbers: number[] = []

  for (let i = 1; i <= pagesCount; i++) {
    pageNumbers.push(i)
  }

  const isDisabledLeftArrow = currentPage === 1
  const isDisabledRightArrow = currentPage === pageNumbers.length

  return (
    <div className={s.container}>
      <Button
        className={s.btnArrow}
        disabled={isDisabledLeftArrow}
        onClick={() => handlePageNumber(currentPage - INITIAL_PAGE_NUMBER)}
        variant={'noStyle'}
      >
        <LeftArrow />
      </Button>
      {pageNumbers.map(pageNumber => (
        <Button
          className={clsx(s.btnNumber, currentPage === pageNumber ? s.active : '')}
          key={pageNumber}
          onClick={() => handlePageNumber(pageNumber)}
          variant={'noStyle'}
        >
          <Typography color={'light'} variant={'regular14'}>
            {pageNumber}
          </Typography>
        </Button>
      ))}
      <Button
        className={s.btnArrow}
        disabled={isDisabledRightArrow}
        onClick={() => handlePageNumber(currentPage + INITIAL_PAGE_NUMBER)}
        variant={'noStyle'}
      >
        <RightArrow />
      </Button>
      <div className={s.select}>
        <Typography color={'light'} variant={'regular14'}>
          Show
        </Typography>
        <SelectComponent
          className={s.selectComponent}
          currentValue={currentSize}
          onValueChange={handlePageSize}
          selectItems={pageSizes}
        ></SelectComponent>
        <Typography color={'light'} variant={'regular14'}>
          on page
        </Typography>
      </div>
    </div>
  )
}
