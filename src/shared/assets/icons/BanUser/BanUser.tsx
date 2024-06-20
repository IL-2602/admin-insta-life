import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={24} width={24} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16.001A8 8 0 0 1 12 20z'}
      fill={'#fff'}
    />
    <path d={'m7.043 19.362 10-15'} stroke={'#fff'} strokeWidth={2.3} />
  </svg>
)

export const BanUserIcon = memo(SvgComponent)
