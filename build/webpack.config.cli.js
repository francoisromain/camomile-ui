var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var webpackConfigBase = require('./webpack.config.base')

module.exports = merge(webpackConfigBase, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src/app.js'
  ],
  output: {
    filename: 'app.[hash].js',
    path: path.resolve(__dirname, '../'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.css$/,
      use: [
        'style-loader', {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }]
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"development"'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    }),
    new CopyWebpackPlugin([{
      from: 'assets',
      to: 'assets'
    }])
  ]
})
