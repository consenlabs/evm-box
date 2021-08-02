const withPlugins = require('next-compose-plugins')
const { withSentryConfig } = require('@sentry/nextjs')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins(
  [
    withSentryConfig({
      sentry: {
        disableServerWebpackPlugin: true,
        disableClientWebpackPlugin: true,
      },
    }),
    withBundleAnalyzer,
  ],
  {
    distDir: 'build',
  },
)
