const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '~': path.resolve(__dirname, '../src/')
    }
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
