import { CssBaseline } from '@geist-ui/react'
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = CssBaseline.flush()

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
        </>
      ),
    }
  }

  render() {
    return (
      <Html>
        <Head>
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
          <meta property="og:image" content="/images/favicon.ico" />
          <meta property="og:type" content="website" />
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
          <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
