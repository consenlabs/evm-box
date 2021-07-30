import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { CssBaseline, GeistProvider } from '@geist-ui/react'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <GeistProvider>
      <CssBaseline />
      <Head>
        <title>EVM Box</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </Head>
      <Component {...pageProps} />
    </GeistProvider>
  )
}

export default App
