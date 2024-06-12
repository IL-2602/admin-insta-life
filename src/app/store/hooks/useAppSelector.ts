import { useSelector } from 'react-redux'

import { RootState } from '@/app/store/types/rootState'

export const useAppSelector = useSelector.withTypes<RootState>()
