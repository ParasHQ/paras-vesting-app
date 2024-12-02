module.exports = {
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      util: require.resolve('util/'),
    },
  },
}
