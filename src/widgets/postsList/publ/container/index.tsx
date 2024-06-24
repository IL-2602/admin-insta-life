import { FC } from 'react'

import { useContainer } from '@/widgets/postsList/publ/container/useContainer'

import { PostsList } from '../ui/PostsList'

export const Container: FC = () => <PostsList {...useContainer()} />

export type PostsListProps = ReturnType<typeof useContainer>
