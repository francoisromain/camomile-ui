import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import postcssPlugins from './rollup.postcss.config.js'
import json from 'rollup-plugin-json'
import builtins from 'rollup-plugin-node-builtins'
import buble from 'rollup-plugin-buble'
const pkg = require('../package.json')

export default [
  {
    input: 'src/app.vue',
    output: {
      file: pkg.browser,
      format: 'umd'
    },
    name: 'camomile-ui',
    plugins: [
      builtins(),
      json(),
      commonjs(),
      resolve({
        preferBuiltins: true
      }),
      vue({
        compileTemplate: true,
        css: '../dist/styles.css'
      }),
      postcss({
        plugins: postcssPlugins,
        extract: '../dist/styles.css'
      }),
      buble({
        objectAssign: 'Object.assign'
      })
    ]
  },
  {
    input: 'src/app.vue',
    external: ['vue', 'vuex', 'camomile-client', 'axios'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      vue({
        compileTemplate: true,
        css: 'dist/styles.css'
      }),
      postcss({
        plugins: postcssPlugins,
        extract: 'dist/styles.css'
      }),
      buble({
        objectAssign: 'Object.assign'
      })
    ]
  }
]
