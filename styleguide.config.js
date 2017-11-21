var webpackConfigBase = require('./build/webpack.config.base')

module.exports = {
  webpackConfig: Object.assign(webpackConfigBase, {
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
    }
  })
}
