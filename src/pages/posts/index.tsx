import { getRootLayout } from '@/layouts/public/rootLayout'
import { AuthDefender } from '@/shared/hocs/AuthDefender'
import Head from 'next/head'

const PostsPage = () => {
  return (
    <>
      <Head>
        <title>Posts List</title>
        <meta content={'Generated by create next app'} name={'description'} />
        <meta content={'width=device-width, initial-scale=1'} name={'viewport'} />
        <link href={'/favicon.ico'} rel={'icon'} />
      </Head>
      <div>POSTS LIST</div>
    </>
  )
}

PostsPage.getLayout = getRootLayout

export default AuthDefender(PostsPage)
