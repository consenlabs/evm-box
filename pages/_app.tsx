import { useEffect, useState } from 'react'
import { CssBaseline, GeistProvider, useTheme } from '@geist-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { LocaleProvider, useLocale } from '../common/hooks/useLocale'
import { ThemeProvider } from '../common/hooks/useThemeContext'
import useThemeDetector from '../common/hooks/useThemeDetector'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const t = useLocale()
  const theme = useTheme()
  const isDarkTheme = useThemeDetector()
  const [themeType, setThemeType] = useState(isDarkTheme ? 'light' : 'dark')
  const switchTheme = (type: string) => {
    setThemeType(type)
  }

  useEffect(() => {
    switchTheme(isDarkTheme ? 'dark' : 'light')
  }, [isDarkTheme])

  return (
    <LocaleProvider>
      <ThemeProvider switchTheme={switchTheme} themeType={themeType}>
        <GeistProvider themeType={themeType} themes={[theme]}>
          <CssBaseline />
          <Head>
            <title>{t('AppName')}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <meta
          name="description"
          content={t('AppDesc')}
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
      </ThemeProvider>
    </LocaleProvider>
  )
}

export default App