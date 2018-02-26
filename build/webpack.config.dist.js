const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')
const webpackConfigBase = require('./webpack.config.base')
const MinifyPlugin = require('babel-minify-webpack-plugin')
// const WebpackMonitor = require('webpack-monitor')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const npmPackage = require('../package.json')
const date = new Date().toISOString().slice(0, 10)

const webpackConfigDist = {
  mode: 'production',
  devtool: false,
  entry: {
    app: './example/src/app.js',
    loader: './example/src/js/loader.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../example/dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          publicPath: '../',
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      npmVersion: JSON.stringify(npmPackage.version),
      webpackDate: JSON.stringify(date),
      npmName: JSON.stringify(npmPackage.name),
      npmAuthorUrl: JSON.stringify(npmPackage.author.url)
    }),
    new webpack.ExtendedAPIPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.[hash].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: 'example/src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      excludeAssets: [/app.*.js/]
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
    new MinifyPlugin(
      {
        mangle: {
          keepFnName: true, // should be false, but creates an error on process.nextTick. wtf?
          topLevel: true
        },
        removeConsole: true,
        removeDebugger: true
      },
      { comments: false }
    ),
    new webpack.optimize.ModuleConcatenationPlugin()
    // new WebpackMonitor({
    //   capture: true, // -> default 'true'
    //   target: '../build/webpackMonitor/webpack-stats.json', // default -> '../monitor/stats.json'
    //   launch: true, // -> default 'false'
    //   port: 3030 // default -> 8081
    // }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server', // `server`, `static` or `disabled` (json file)
    //   analyzerHost: '127.0.0.1', // used in `server` mode
    //   analyzerPort: 8888, // used in `server` mode
    //   reportFilename: 'report.html', // generated in `static` mode
    //   defaultSizes: 'parsed', // module size: `stats` (input), `parsed` (output) or `gzip` (compressed output)
    //   openAnalyzer: true, // open report in browser
    //   generateStatsFile: false, // generate Webpack Stats JSON file in bundles directory
    //   statsFilename: 'stats.json', // used if `generateStatsFile` is `true`
    //   statsOptions: null, // Options for `stats.toJson()`
    //   // https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
    //   logLevel: 'info' // log level: 'info', 'warn', 'error' or 'silent'
    // }),
  ]
}

module.exports = merge(webpackConfigBase, webpackConfigDist)
