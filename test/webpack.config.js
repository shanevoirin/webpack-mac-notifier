import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MacNotifierPlugin from '../src/index';

export default {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: new URL('./dist', import.meta.url).pathname,
    clean: true
  },
  devServer: {
    static: {
      directory: new URL('./dist', import.meta.url).pathname
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
