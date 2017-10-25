var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var webpackConfigDev = require('./webpack.config.dev')

var compiler = webpack(webpackConfigDev)
var server = new WebpackDevServer(compiler, {
  stats: {
    colors: true
  },
  hot: true,
  inline: true,
  publicPath: '/',
  historyApiFallback: true
})

server.listen(8080, '127.0.0.1', function () {
  console.log('Project is running at http://localhost:8080')
})
