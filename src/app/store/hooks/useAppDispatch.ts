import { useDispatch } from 'react-redux'

import { AppDispatch } from '@/app/store/types/appDispatch'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
