var rm = require('rimraf')
var path = require('path')
var webpack = require('webpack')
var ProgressPlugin = require('webpack/lib/ProgressPlugin')
var webpackConfigDist = require('./webpack.config.dist')
var compiler = webpack(webpackConfigDist)

rm(path.join(__dirname, '../dist'), err => {
  if (err) throw err
  compiler.apply(new ProgressPlugin(function (percentage, msg, current, active, modulepath) {
    if (process.stdout.isTTY && percentage < 1) {
      process.stdout.cursorTo(0)
      modulepath = modulepath ? ' …' + modulepath.substr(modulepath.length - 30) : ''
      current = current ? ' ' + current : ''
      active = active ? ' ' + active : ''
      process.stdout.write((percentage * 100).toFixed(0) + '% ' + msg + current + active + modulepath + ' ')
      process.stdout.clearLine(1)
    } else if (percentage === 1) {
      process.stdout.write('\n')
      console.log('webpack: done.')
    }
  }))

  compiler.run(function (err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
  })
})

