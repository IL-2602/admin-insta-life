import { getRootLayout } from '@/layouts/public/rootLayout'
import { AuthRouteChecker } from '@/shared/hocs/AuthRouteChecker'
import { SignIn } from '@/widgets/auth/signIn'
import Head from 'next/head'

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>О_О</title>
        <meta content={'Generated by create next app'} name={'description'} />
        <meta content={'width=device-width, initial-scale=1'} name={'viewport'} />
        <link href={'/favicon.ico'} rel={'icon'} />
      </Head>
      <SignIn.widget />
    </>
  )
}

SignInPage.getLayout = getRootLayout

export default AuthRouteChecker(SignInPage)
