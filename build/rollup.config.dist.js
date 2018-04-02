import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import json from 'rollup-plugin-json'
import builtins from 'rollup-plugin-node-builtins'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import pkg from '../package.json'

export default [
  {
    input: 'src/app.js',
    external: ['vue', 'vuex', 'camomile-client'],
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'camomileUi',
      globals: {
        'camomile-client': 'Camomile',
        vuex: 'Vuex',
        vue: 'Vue'
      }
    },
    plugins: [
      resolve({
        preferBuiltins: true
      }),
      commonjs(),
      builtins(),
      json(),
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
    external: ['vue', 'vuex', 'camomile-client'],
    output: {
      file: 'dist/camomile-ui.min.js',
      format: 'umd',
      name: 'camomileUi',
      globals: {
        'camomile-client': 'Camomile',
        vuex: 'Vuex',
        vue: 'Vue'
      }
    },
    plugins: [
      resolve({
        preferBuiltins: true
      }),
      commonjs(),
      builtins(),
      json(),
      vue({
        css: true
      }),
      postcss(),
      buble({
        objectAssign: 'Object.assign'
      }),
      uglify()
    ]
  },
  {
    input: 'src/app.js',
    external: ['vue', 'vuex', 'camomile-client'],
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
