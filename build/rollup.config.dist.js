import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import json from 'rollup-plugin-json'
import builtins from 'rollup-plugin-node-builtins'
import buble from 'rollup-plugin-buble'
import pkg from '../package.json'

export default [
  {
    input: 'src/app.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'camomile-ui.umd'
    },
    plugins: [
      builtins(),
      json(),
      commonjs(),
      resolve({
        preferBuiltins: true
      }),
      vue({
        css: true
      }),
      postcss(),
      buble({
        objectAssign: 'Object.assign'
      })
    ]
  },
  {
    input: 'src/app.js',
    external: ['vue', 'vuex', 'camomile-client', 'axios'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      vue({
        css: true
      }),
      postcss(),
      buble({
        objectAssign: 'Object.assign'
      })
    ]
  }
]
