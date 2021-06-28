import React from 'react'
import { AppProps } from 'next/app'
import { CssBaseline, GeistProvider } from '@geist-ui/react'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  )
}

export default App
