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
        <meta
          name="description"
          content="EVM Box is a list of EVM networks. Helping users connect to EVM powered networks."
        />
        <meta
          name="keywords"
          content="Bitcoin,BTC,Ethereum,ETH,Binance,BSC,Heco,Polygon,Matic,EVM,Chainlist"
        />
        <meta property="og:title" content="EVM Box" />
        <meta
          property="og:description"
          content="EVM Box is a list of EVM networks. Helping users connect to EVM powered networks."
        />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
      </Head>
      <Component {...pageProps} />
    </GeistProvider>
  )
}

export default App
