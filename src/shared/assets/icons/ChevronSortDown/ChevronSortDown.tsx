import * as React from 'react'
import { SVGProps, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'currentColor'} height={6} width={8} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path d={'M4 6 .536 1.5h6.928L4 6z'} fill={'#fff'} />
  </svg>
)

export const ChevronSortDown = memo(SvgComponent)
