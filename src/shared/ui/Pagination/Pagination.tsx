import { Fragment } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { LeftArrow } from '@/shared/ui/LeftArrow'
import { RightArrow } from '@/shared/ui/RightArrow'
import { SelectComponent } from '@/shared/ui/SelectComponent'
import { Typography } from '@/shared/ui/Typography'
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
} from '@/widgets/usersList/publ/usersList/constants/constants'
import { clsx } from 'clsx'

import s from './Pagination.module.scss'

type Props = {
  currentPage: number
  currentSize: string
  pagesCount: number
  setCurrentPage: (currentPage: number) => void
  setCurrentSize: (pageSize: number) => void
  totalCount: number
}

export const Pagination = ({
  currentPage,
  currentSize,
  pagesCount,
  setCurrentPage,
  setCurrentSize,
  totalCount,
}: Props) => {
  const selectPageSizes = () => {
    switch (true) {
      case totalCount <= 10:
        return ['10']
      case totalCount <= 20:
        return ['10', `${totalCount}`]
      case totalCount > 20 && totalCount <= 30:
        return ['10', '20', `${totalCount}`]
      case totalCount > 30 && totalCount <= 40:
        return ['10', '20', '30', `${totalCount}`]
      case totalCount > 40 && totalCount <= 50:
        return ['10', '20', '30', '40', `${totalCount}`]
      default:
        return ['10', '20', '30', '40', '50', '100']
    }
  }

  const { t } = useTranslation()

  const handlePageNumber = (page: number) => {
    if (+currentSize !== INITIAL_PAGE_SIZE) {
      setCurrentSize(INITIAL_PAGE_SIZE)
    }

    if (page === -1) {
      setCurrentPage(pagesCount)
    } else {
      setCurrentPage(page)
    }
  }

  const handlePageSize = (pageSize: string) => {
    setCurrentSize(+pageSize)

    if (pagesCount !== INITIAL_PAGE_NUMBER && +currentSize !== totalCount) {
      setCurrentPage(INITIAL_PAGE_NUMBER)
    }
  }

  const pageNumbers: number[] = []

  if (pagesCount > 7) {
    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(i)
      }
      pageNumbers.push(-1)
      pageNumbers.push(pagesCount)
    } else if (currentPage >= pagesCount - 2) {
      pageNumbers.push(1)
      pageNumbers.push(-1)
      for (let i = pagesCount - 4; i <= pagesCount; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)
      pageNumbers.push(-1)
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i)
      }
      pageNumbers.push(-1)
      pageNumbers.push(pagesCount)
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pageNumbers.push(i)
    }
  }

  const isDisabledLeftArrow = currentPage === 1 || totalCount === 0
  const isDisabledRightArrow = currentPage === pagesCount || totalCount === 0

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
      {pageNumbers.map((pageNumber, id) => (
        <Fragment key={id}>
          {pageNumber === -1 ? (
            <Typography as={'span'} className={s.threeDots}>
              ...
            </Typography>
          ) : (
            <Button
              className={clsx(s.btnNumber, currentPage === pageNumber ? s.active : '')}
              key={pageNumber}
              onClick={() => handlePageNumber(pageNumber === -1 ? pagesCount : pageNumber)}
              variant={'noStyle'}
            >
              <Typography color={'light'} variant={'regular14'}>
                {pageNumber}
              </Typography>
            </Button>
          )}
        </Fragment>
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
          {t.usersList.show}
        </Typography>
        <SelectComponent
          className={s.selectComponent}
          currentValue={currentSize}
          onValueChange={handlePageSize}
          selectItems={selectPageSizes()}
        ></SelectComponent>
        <Typography color={'light'} variant={'regular14'}>
          {t.usersList.onPage}
        </Typography>
      </div>
    </div>
  )
}
