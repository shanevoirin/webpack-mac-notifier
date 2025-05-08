const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MacNotifierPlugin = require('../dist/index.js').default;

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true
  },
  plugins: [
    new MacNotifierPlugin({
      title: 'Test Build',
      successMessage: '✅ Success!',
      errorMessage: '❌ Fail!',
      warningMessage: '⚠️ Warnings!',
      sound: 'Submarine',
      debounceTime: 1000, // 1 seconds
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled', // Run manually with `pnpm analyze`
      generateStatsFile: true
    })
  ]
};
