var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')
var webpackConfigBase = require('./webpack.config.base')
var MinifyPlugin = require('babel-minify-webpack-plugin')

module.exports = merge(webpackConfigBase, {
  devtool: false,
  entry: {
    app: ['babel-polyfill', './src/app.js'],
    loader: './src/loader.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist')
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
      version: JSON.stringify(require('../package.json').version)
    }),
    new webpack.ExtendedAPIPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MinifyPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'assets',
        to: 'assets',
        ignore: '.DS_Store'
      }
    ]),
    new ExtractTextPlugin({
      filename: 'styles.[hash].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      excludeAssets: [/app.*.js/]
    }),
    new HtmlWebpackExcludeAssetsPlugin()
  ]
})
