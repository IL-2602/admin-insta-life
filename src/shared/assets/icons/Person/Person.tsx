import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={24} width={24} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm6 10a1 1 0 0 0 1-1 7 7 0 1 0-14 0 1 1 0 0 0 1 1h12z'}
      fill={'currentColor'}
    />
  </svg>
)

export const PersonIcon = memo(SvgComponent)
