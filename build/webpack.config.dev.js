var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var webpackConfigBase = require('./webpack.config.base')
// var webpackMonitor = require('webpack-monitor')

module.exports = merge(webpackConfigBase, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/app.js'
  ],
  output: {
    filename: 'app.[hash].js',
    path: path.resolve(__dirname, '../'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          buble: {
            objectAssign: 'Object.assign',
            transforms: {
              stripWith: true
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets',
        to: 'assets'
      }
    ])
    // new webpackMonitor({
    //   capture: true, // -> default 'true'
    //   target: '../monitor/myStatsStore.json', // default -> '../monitor/stats.json'
    //   launch: true, // -> default 'false'
    //   port: 3030 // default -> 8081
    // })
  ]
})
