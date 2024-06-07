import { getRootLayout } from '@/layouts/public/rootLayout'
import Head from 'next/head'

const PaymentsPage = () => {
  return (
    <>
      <Head>
        <title>Payments List</title>
        <meta content={'Generated by create next app'} name={'description'} />
        <meta content={'width=device-width, initial-scale=1'} name={'viewport'} />
        <link href={'/favicon.ico'} rel={'icon'} />
      </Head>
      <div>PAYMENTS LIST</div>
    </>
  )
}

PaymentsPage.getLayout = getRootLayout

export default PaymentsPage
