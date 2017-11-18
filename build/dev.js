const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfigDev = require('./webpack.config.dev')

const compiler = webpack(webpackConfigDev)
const server = new WebpackDevServer(compiler, {
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
