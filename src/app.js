import 'babel-polyfill'
import './css/styles.css'
import Vue from 'vue'
import './js/store.js'

import Index from './templates/index.vue'

const App = Vue.extend(Index)
new App().$mount('#app')
