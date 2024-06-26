import { getRootLayout } from '@/layouts/public/rootLayout'
import { AuthDefender } from '@/shared/hocs/AuthDefender'
import { UsersList } from '@/widgets/usersList/publ/usersList'
import Head from 'next/head'

const UsersPage = () => {
  return (
    <>
      <Head>
        <title>Users List</title>
        <meta content={'Generated by create next app'} name={'description'} />
        <meta content={'width=device-width, initial-scale=1'} name={'viewport'} />
        <link href={'/favicon.ico'} rel={'icon'} />
      </Head>
      <div>
        <UsersList.widget />
      </div>
    </>
  )
}

UsersPage.getLayout = getRootLayout

export default AuthDefender(UsersPage)
