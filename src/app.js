import './css/styles.css'
import 'babel-polyfill'
import Vue from 'vue'

import Index from './components/index.vue'

// const App = Vue.extend(Index)
// new App().$mount('#app')

new Vue({
  template: '<Index/>',
  components: { Index }
}).$mount('#app')
