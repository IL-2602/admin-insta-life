import { useTranslation } from '@/shared/hooks/useTranslation'
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
        return ['10', '20', '30', '40', '50', `${totalCount}`]
    }
  }

  // console.log('currentPage: ', currentPage)
  // console.log('currentSize: ', currentSize)
  // console.log('pagesCount: ', pagesCount)

  // console.log('totalCount: ', totalCount)
  // console.log('currentSize: ', currentSize)
  // console.log('pagesCount: ', pagesCount)

  const { t } = useTranslation()

  const pageNumbers: number[] = []

  for (let i = 1; i <= pagesCount; i++) {
    pageNumbers.push(i)
  }

  const isDisabledLeftArrow = currentPage === 1 || totalCount === 0
  const isDisabledRightArrow = currentPage === pageNumbers.length || totalCount === 0

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
