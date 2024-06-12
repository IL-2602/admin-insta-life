import * as React from 'react'
import { SVGProps, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'currentColor'} height={12} width={8} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path d={'m4 0 3.464 4.5H.536L4 0zm0 12L.536 7.5h6.928L4 12z'} fill={'#4C4C4C'} />
  </svg>
)

export const ChevronsSort = memo(SvgComponent)
