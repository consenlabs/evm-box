const { withSentryConfig } = require('@sentry/nextjs')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})


module.exports = () => {
  const plugins = [withSentryConfig, withBundleAnalyzer]
  return plugins.reduce((acc, plugin) => {
    if (plugin.name === 'withSentryConfig') {
      return plugin(acc, {
        sentry: {
          disableServerWebpackPlugin: true,
          disableClientWebpackPlugin: true,
        },
      })
    }
    return plugin(acc)
  }, {distDir: 'build'})
}